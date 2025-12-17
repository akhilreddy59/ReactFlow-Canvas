import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FlowCanvas } from "../components/FlowCanvas";
import { useFlowStore } from "../store/flowStore";

async function fetchInitialFlow() {
  return {
    nodes: [
      {
        id: "1",
        position: { x: 150, y: 150 },
        data: { label: "Initial Node" },
      },
    ],
    edges: [],
  };
}

export default function App() {
  const { setNodes, setEdges } = useFlowStore();

  const { data } = useQuery({
    queryKey: ["initial-flow"],
    queryFn: fetchInitialFlow,
  });

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  return <FlowCanvas />;
}
