import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useFlowStore } from "../store/flowStore";

/**
 * Custom node renderers
 */
const nodeTypes = {
  service: ({ data }: { data: { label: string } }) => (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        background: "#dbeafe",
        border: "1px solid #93c5fd",
        fontSize: "14px",
      }}
    >
      🔧 {data.label}
    </div>
  ),
  db: ({ data }: { data: { label: string } }) => (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        background: "#dcfce7",
        border: "1px solid #86efac",
        fontSize: "14px",
      }}
    >
      🗄️ {data.label}
    </div>
  ),
};

export function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges } = useFlowStore();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* ================= TOOLBAR ================= */}
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 9999,
          display: "flex",
          gap: "8px",
          background: "white",
          padding: "10px",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={() =>
            setNodes([
              ...nodes,
              {
                id: crypto.randomUUID(),
                type: "service",
                position: { x: 100, y: 100 },
                data: { label: "Service" },
              } as Node,
            ])
          }
          style={{
            padding: "6px 12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Service
        </button>

        <button
          onClick={() =>
            setNodes([
              ...nodes,
              {
                id: crypto.randomUUID(),
                type: "db",
                position: { x: 250, y: 100 },
                data: { label: "Database" },
              } as Node,
            ])
          }
          style={{
            padding: "6px 12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add DB
        </button>

        <button
          onClick={() =>
            setNodes([
              ...nodes,
              {
                id: crypto.randomUUID(),
                position: { x: 180, y: 200 },
                data: { label: "Generic Node" },
              },
            ])
          }
          style={{
            padding: "6px 12px",
            background: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Node
        </button>

        <button
          onClick={() => {
            setNodes([]);
            setEdges([]);
          }}
          style={{
            padding: "6px 12px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {/* ================= CANVAS ================= */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => setNodes(applyNodeChanges(changes, nodes))}
        onEdgesChange={(changes) => setEdges(applyEdgeChanges(changes, edges))}
        onConnect={(connection) => {
          const updated = addEdge(connection, edges);
          setEdges(Array.isArray(updated) ? updated : [...edges, updated]);
        }}
        fitView
      />
    </div>
  );
}
