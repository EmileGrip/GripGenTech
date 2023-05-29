import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import Node from "./Node";
import { treeData as data } from "../../../data/chartTreeData";
import { useCallback, useState } from "react";

const initialNodes = [
  {
    id: "node-1",
    type: "customNode",
    position: { x: 260, y: 0 },
    data: data.nodesData[0],
  },
  {
    id: "node-2",
    type: "customNode",
    targetPosition: "top",
    position: { x: 0, y: 300 },
    data: data.nodesData[1],
  },
  {
    id: "node-3",
    type: "customNode",
    targetPosition: "top",
    position: { x: 260, y: 300 },
    data: data.nodesData[2],
  },
  {
    id: "node-4",
    type: "customNode",
    targetPosition: "top",
    position: { x: 520, y: 300 },
    data: data.nodesData[3],
  },
];

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "a",
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
  {
    id: "edge-2",
    source: "node-1",
    target: "node-3",
    sourceHandle: "b",
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
  {
    id: "edge-3",
    source: "node-1",
    target: "node-4",
    sourceHandle: "c",
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
];
const nodeTypes = { customNode: Node };
const ChartTreeFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
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
