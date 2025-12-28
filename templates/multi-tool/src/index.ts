import { defineApp } from "kly";
import { currentWeatherTool } from "./tools/current-weather";
import { forecastTool } from "./tools/forecast";

export default defineApp({
  name: "my-kly-app",
  version: "0.1.0",
  description: "A multi-tool kly application",
  tools: [currentWeatherTool, forecastTool],
});
