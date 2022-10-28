import baseInstance from "../index";

export function getPortfolioData() {
  return baseInstance.get("/ticker/24hr");
}
