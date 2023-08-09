import { ConnectionLineType } from "reactflow";

export const handleNodesData = (nodes, edges) => {
  return nodes.map((node) => {
    const hasChildren = edges.some((edge) => {
      if (nodes.length === 1) {
        return false;
      } else {
        return edge.source === node.id;
      }
    });
    const isSingleIcon =
      nodes.length === 1
        ? node.parent_role === null && !hasChildren
        : node.parent_role === null && hasChildren;

    return {
      id: node.id.toString(),
      type: "custom",
      position: { x: 0, y: 0 },
      data: {
        ...node,
        hasChildren,
        isSingleIcon,
      },
      draggable: false,
    };
  });
};

export const handleEdgesData = (edges) => {
  return edges.map((edge) => {
    return {
      ...edge,
      source: edge.source.toString(),
      target: edge.target.toString(),
      sourceHandle: "a",
      type: ConnectionLineType.SmoothStep,
      animated: true,
    };
  });
};
