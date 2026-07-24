function CandlestickShape(props: any) {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  // Need to scale high/low to y coordinates. This is tricky because Recharts passes y/height based on the value (close-open maybe).
}