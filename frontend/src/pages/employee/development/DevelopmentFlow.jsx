import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import { useMemo } from "react";
import RoleNode from "./RoleNode";
import { useEffect } from "react";
import { Alert, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import {
  handleEdgesData,
  handleNodesData,
} from "../../../helper/handleOrganigramData";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenSnack,
  setSuccess,
} from "../../../redux/slices/Employee/development/developmentSlice";

const nodeWidth = 400;
const nodeHeight = 50;

const DevelopmentFlow = ({ data, isProfile }) => {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [handledNodes, setHandledNodes] = useState([]);
  const [handledEdges, setHandledEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { success, openSnack, message } = useSelector(
    (state) => state.development
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.jobs.length > 0 && data.edges.length > 0) {
      const nodesData = handleNodesData(data.jobs, data.edges);
      const edgesData = handleEdgesData(data.edges);
      setHandledNodes(nodesData);
      setHandledEdges(edgesData);
    }
  }, [data]);

  const getLayoutedElements = useCallback(
    (nodes, edges, direction = lgMatches ? "LR" : "TB") => {
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
    },
    []
  );

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      handledNodes,
      handledEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [handledNodes, handledEdges, getLayoutedElements, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.Bezier, animated: true },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => (
        <RoleNode {...props} isProfile={isProfile} onSuccess={successHandler} />
      ),
    }),
    []
  );

  useEffect(() => {
    if (lgMatches) {
      onLayout("LR");
    } else if (xsMatches) {
      onLayout("TB");
    }
  }, [xsMatches, lgMatches]);

  const successHandler = (status) => {
    dispatch(setSuccess(status));
    handleClickSnack();
  };

  const handleClickSnack = () => {
    dispatch(setOpenSnack(true));
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setOpenSnack(false));
  };

  const serverMessage = message.replace(/^validation error : /i, "");

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {serverMessage}
        </Alert>
      </Snackbar>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
        <Panel position="top-right">
          {/* <button
          onClick={() => {
            onLayout("TB");
            dir("TB");
          }}
        >
          vertical layout
        </button>
        <button
          onClick={() => {
            onLayout("LR");
            dir("LR");
          }}
        >
          horizontal layout
        </button> */}
        </Panel>
      </ReactFlow>
    </>
  );
};

export default DevelopmentFlow;
