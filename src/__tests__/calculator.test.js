// Test the carbon footprint calculation formulas

const calcFootprint = (inputs) => {
  const carKm = inputs.carKm * 365 * 0.21;
  const flightsKg = inputs.flights * 255;
  const bikeKg = inputs.bike * 365 * 0.003;

  const dietMap = { vegan: 1500, vegetarian: 1700, flexitarian: 2200, omnivore: 2800, meatHeavy: 3300 };
  const foodKg = dietMap[inputs.diet] || 2200;

  const electricityKg = inputs.electricity * 12 * 0.82;
  const gasKg = inputs.gas * 12 * 2.04;

  const transport = Math.round(carKm + flightsKg - bikeKg);
  const food = Math.round(foodKg);
  const energy = Math.round(electricityKg + gasKg);
  const total = transport + food + energy;

  return { transport, food, energy, total };
};

describe('Carbon Footprint Calculator', () => {
  test('calculates correct footprint for vegan diet with no driving', () => {
    const result = calcFootprint({
      carKm: 0, flights: 0, bike: 7,
      diet: 'vegan',
      electricity: 100, gas: 1,
    });
    expect(result.food).toBe(1500);
    expect(result.transport).toBeLessThan(0);
  });

  test('calculates correct footprint for meat-heavy diet with high driving', () => {
    const result = calcFootprint({
      carKm: 50, flights: 5, bike: 0,
      diet: 'meatHeavy',
      electricity: 300, gas: 4,
    });
    expect(result.food).toBe(3300);
    expect(result.transport).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(5000);
  });

  test('returns total as sum of all categories', () => {
    const result = calcFootprint({
      carKm: 20, flights: 2, bike: 0,
      diet: 'omnivore',
      electricity: 150, gas: 2,
    });
    expect(result.total).toBe(result.transport + result.food + result.energy);
  });

  test('handles zero values correctly', () => {
    const result = calcFootprint({
      carKm: 0, flights: 0, bike: 0,
      diet: 'vegan',
      electricity: 0, gas: 0,
    });
    expect(result.energy).toBe(0);
    expect(result.food).toBe(1500);
  });

  test('electricity emission factor is correctly applied (India grid)', () => {
    const result = calcFootprint({
      carKm: 0, flights: 0, bike: 0,
      diet: 'vegan',
      electricity: 100, gas: 0,
    });
    // 100 kWh * 12 months * 0.82 kg CO2/kWh = 984
    expect(result.energy).toBe(984);
  });
});
