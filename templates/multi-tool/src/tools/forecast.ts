import { tool } from "kly";
import { z } from "zod";

export const forecastTool = tool({
  name: "forecast",
  description: "Get weather forecast for upcoming days",
  inputSchema: z.object({
    city: z.string().describe("City name"),
    days: z.number().min(1).max(7).default(3).describe("Number of days (1-7)"),
  }),
  execute: async ({ city, days }) => {
    // Mock forecast data - replace with real API call
    const forecast = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      forecast.push({
        date: date.toISOString().split("T")[0],
        high: Math.floor(Math.random() * 15) + 20,
        low: Math.floor(Math.random() * 10) + 10,
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      });
    }
    return { city, forecast };
  },
});
