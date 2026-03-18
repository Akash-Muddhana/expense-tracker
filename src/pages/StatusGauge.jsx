export function StatusGauge({ value = 0, min = 0, max = 100 }) {
  const clamped = Math.min(Math.max(value, min), max);
  const percent = (clamped - min) / (max - min);
  const angle = -90 + percent * 180;

  return (
    <div className="w-72 flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-soft">
      <h3 className="text-xl font-semibold text-gray-800 m-0">
        Your Balance Status
      </h3>
      <svg
        viewBox="0 0 200 120"
        className="w-full filter drop-shadow-md"
      >
        <path d="M 20 100 A 80 80 0 0 1 80 20" className="fill-none stroke-red-500 stroke-[16px] stroke-linecap-round" />
        <path d="M 80 20 A 80 80 0 0 1 120 20" className="fill-none stroke-amber-400 stroke-[16px] stroke-linecap-round" />
        <path d="M 120 20 A 80 80 0 0 1 180 100" className="fill-none stroke-green-500 stroke-[16px] stroke-linecap-round" />

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
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Current Balance</p>
        <p className="text-2xl font-bold text-primary-600">₹{value}</p>
      </div>
    </div>
  );
}
