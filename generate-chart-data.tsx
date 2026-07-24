function generateChartData(points = 80) {
  const data = [];
  let price = 1.0840;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * 0.0015;
    price += change;
    const high = price + Math.random() * 0.0008;
    const low = price - Math.random() * 0.0008;
    const open = price - (Math.random() - 0.5) * 0.0005;
    const close = price + (Math.random() - 0.5) * 0.0005;
    data.push({
      time: `${9 + Math.floor(i / 12)}:${((i % 12) * 5).toString().padStart(2, '0')}`,
      price,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 2000) + 800,
    });
  }
  return data;
}

function calculateSMA(data: any[], period: number, key: string) {
  return data.map((item, index) => {
    if (index < period - 1) return { ...item, sma: null };
    const sum = data.slice(index - period + 1, index + 1).reduce((a, b) => a + b[key], 0);
    return { ...item, sma: sum / period };
  });
}

function calculateEMA(data: any[], period: number, key: string) {
  const k = 2 / (period + 1);
  return data.map((item, index) => {
    if (index === 0) return { ...item, ema: item[key] };
    const prevEma = data[index - 1].ema || item[key];
    const ema = item[key] * k + prevEma * (1 - k);
    return { ...item, ema };
  });
}