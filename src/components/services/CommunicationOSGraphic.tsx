import { motion } from "framer-motion";

const nodes = [
  { label: "Story\nCapture", x: 50, y: 15, color: "#6366f1" },
  { label: "Content\nProduction", x: 85, y: 40, color: "#8b5cf6" },
  { label: "Stakeholder\nDistribution", x: 70, y: 75, color: "#a78bfa" },
  { label: "Impact\nReporting", x: 30, y: 75, color: "#818cf8" },
  { label: "Internal\nAlignment", x: 15, y: 40, color: "#6366f1" },
];

const CommunicationOSGraphic = () => {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connection lines */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <motion.line
              key={`line-${i}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(139, 92, 246, 0.25)"
              strokeWidth="0.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          );
        })}

        {/* Cross connections */}
        <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[2].x} y2={nodes[2].y} stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.3" />
        <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[3].x} y2={nodes[3].y} stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.3" />
        <line x1={nodes[1].x} y1={nodes[1].y} x2={nodes[4].x} y2={nodes[4].y} stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.3" />
        <line x1={nodes[1].x} y1={nodes[1].y} x2={nodes[3].x} y2={nodes[3].y} stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.3" />
        <line x1={nodes[2].x} y1={nodes[2].y} x2={nodes[4].x} y2={nodes[4].y} stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.3" />

        {/* Center hub */}
        <circle cx="50" cy="47" r="10" fill="rgba(99, 102, 241, 0.08)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.4" />
        <text x="50" y="45" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="3.2" fontWeight="600">
          Impact
        </text>
        <text x="50" y="49.5" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="3.2" fontWeight="600">
          Comm OS
        </text>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill={`${node.color}20`}
              stroke={`${node.color}60`}
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            />
            {node.label.split("\n").map((line, j) => (
              <text
                key={j}
                x={node.x}
                y={node.y + (j - 0.5) * 3.5 + 0.5}
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="2.6"
                fontWeight="500"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Pulse animation rings */}
        <motion.circle
          cx="50"
          cy="47"
          r="14"
          fill="none"
          stroke="rgba(139, 92, 246, 0.15)"
          strokeWidth="0.3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2], opacity: [0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

export default CommunicationOSGraphic;
