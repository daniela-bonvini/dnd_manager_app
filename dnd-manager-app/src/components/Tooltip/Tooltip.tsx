import "./Tooltip.css";

function Tooltip({ text, children, show = true }: { text: string; children: React.ReactNode; show?: boolean }) {
  return (
    <div className={`tooltip ${show ? "tooltip-visible" : ""}`}>
      {children}
      {show && <span className="tooltiptext">{text}</span>}
    </div>
  );
}

export default Tooltip;
