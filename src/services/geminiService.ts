import { GoogleGenAI, Type } from "@google/genai";

const AI_KEY = process.env.GEMINI_API_KEY;

export const generateSupplyChainInsights = async (simulation: {
  demandIncrease: number;
  delayHours: number;
  fuelPriceRise: number;
}) => {
  if (!AI_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: AI_KEY });

  const prompt = `
    Context: You are the Lead AI for 'ChainPulse', a high-stakes supply chain dashboard for a Logistics company in India.
    
    Current Simulation Parameters:
    - Demand Increase: ${simulation.demandIncrease}%
    - Route Delays: ${simulation.delayHours} hours
    - Fuel Surcharge Rise: ${simulation.fuelPriceRise}%
    
    Generate 3-4 strategic, actionable intelligence insights based on these Indian market conditions.
    Focus on cities like Mumbai, Delhi, Bangalore, Hyderabad, Chennai.
    Use professional logistics terminology (e.g., Lead Time, SKU, Transit Corridor, Last Mile).
    
    JSON Output Schema:
    {
      "insights": [
        {
          "id": "string",
          "category": "Inventory | Risk | Cost | Logistics",
          "title": "Short title",
          "desc": "Detailed analysis of the situation based on the simulation numbers.",
          "suggestion": "Precise recommendation for the user to execute.",
          "impact": "Estimated financial or efficiency saving (e.g. ₹50L or 20% speedup)"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING },
                  title: { type: Type.STRING },
                  desc: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                  impact: { type: Type.STRING },
                },
                required: ["id", "category", "title", "desc", "suggestion", "impact"]
              }
            }
          },
          required: ["insights"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.insights;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    // Fallback to mock data if API fails to keep the demo running smoothly
    return [
      {
        id: "f1",
        category: "Fallback",
        title: "AI Analysis Offline",
        desc: "Unable to reach Gemini Intelligence Layer. Using local predictive cache.",
        suggestion: "Check internet connectivity or API key configuration if this persists.",
        impact: "Operational Continuity"
      }
    ];
  }
};
