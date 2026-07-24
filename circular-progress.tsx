function CircularProgress({ value, size = 120, stroke = 10 }: { value: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} stroke="#ECECEC" strokeWidth={stroke} fill="transparent" />
      <circle cx={size/2} cy={size/2} r={radius} stroke="#5B3DF5" strokeWidth={stroke} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  );
}