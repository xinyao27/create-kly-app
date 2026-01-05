import { tool } from "kly";
import { z } from "zod";

export const weatherTool = tool({
  name: "weather",
  description: "Get current weather for a city",
  inputSchema: z.object({
    city: z.string().describe("City name"),
    unit: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("Temperature unit"),
  }),
  execute: async ({ city, unit }) => {
    // Mock weather data - replace with real API call
    const temp = Math.floor(Math.random() * 30) + 5;
    const displayTemp = unit === "fahrenheit" ? Math.floor(temp * 1.8 + 32) : temp;
    const symbol = unit === "fahrenheit" ? "°F" : "°C";

    return {
      city,
      temperature: `${displayTemp}${symbol}`,
      condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
    };
  },
});
