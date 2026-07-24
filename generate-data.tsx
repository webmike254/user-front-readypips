const generateData = () => {
  const data = [];
  let price = 1.0840;
  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.48) * 0.002;
    price += change;
    const high = price + Math.random() * 0.001;
    const low = price - Math.random() * 0.001;
    data.push({
      time: `10:${i.toString().padStart(2, '0')}`,
      price,
      high,
      low,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return data;
};