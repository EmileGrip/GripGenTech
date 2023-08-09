import React, { useEffect, useMemo, useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Node from "./Node";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import {
  handleEdgesData,
  handleNodesData,
} from "../../../helper/handleOrganigramData";
import { useMediaQuery, useTheme } from "@mui/material";
import dagre from "dagre";

const position = { x: 0, y: 0 };
const nodeWidth = 240;
const nodeHeight = 280;

const ChartTreeFlow = () => {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.organigram);
  const [handledNodes, setHandledNodes] = useState([]);
  const [handledEdges, setHandledEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchData(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (data.roles.length > 0 && data.edges.length > 0) {
      const nodesData = handleNodesData(data.roles, data.edges);
      const edgesData = handleEdgesData(data.edges);
      setHandledNodes(nodesData);
      setHandledEdges(edgesData);
    }
  }, [data]);

  const getLayoutedElements = useCallback((nodes, edges, direction = "TB") => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      return node;
    });

    return { nodes: layoutedNodes, edges };
  }, []);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      handledNodes,
      handledEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [handledNodes, handledEdges, getLayoutedElements, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => {
      setEdges((prevEdges) =>
        addEdge(
          { ...params, type: ConnectionLineType.Bezier, animated: true },
          prevEdges
        )
      );
    },
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ custom: Node }), []);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ChartTreeFlow;
