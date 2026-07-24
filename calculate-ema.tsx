function calculateEMA(data: any[], period: number, key: string) {
  const k = 2 / (period + 1);
  const result: any[] = [];
  data.forEach((item, index) => {
    if (index === 0) {
      result.push({ ...item, ema: item[key] });
    } else {
      const prevEma = result[index - 1].ema;
      const ema = item[key] * k + prevEma * (1 - k);
      result.push({ ...item, ema });
    }
  });
  return result;
}