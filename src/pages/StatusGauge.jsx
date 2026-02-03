import "./StatusGauge.css";

export function StatusGauge({ value = 0, min = 0, max = 100 }) {
  const clamped = Math.min(Math.max(value, min), max);

  const percent = (clamped - min) / (max - min);
  const angle = -90 + percent * 180;

  return (
    <div className="gauge-wrapper">
      <svg viewBox="0 0 200 120" className="gauge">
        <path d="M 20 100 A 80 80 0 0 1 80 20" className="zone red" />
        <path d="M 80 20 A 80 80 0 0 1 120 20" className="zone orange" />
        <path d="M 120 20 A 80 80 0 0 1 180 100" className="zone green" />

        <g transform={`rotate(${angle} 100 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="black"
            strokeWidth="3"
          />
          <circle cx="100" cy="100" r="5" fill="black" />
        </g>
      </svg>
    </div>
  );
}
