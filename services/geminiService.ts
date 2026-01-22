import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Level, Scenario, TOPICS } from '../types';

// Initialize Gemini
// Note: We assume process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-3-flash-preview';

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    context: {
      type: Type.STRING,
      description: "The professional scenario description (2-3 sentences), strictly based on the provided topic context.",
    },
    question: {
      type: Type.STRING,
      description: "The specific question the user must answer based on the scenario.",
    },
    topic: {
      type: Type.STRING,
      description: "The technical topic of this scenario.",
    },
    options: {
      type: Type.ARRAY,
      description: "A list of 3 possible answers.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING },
          isCorrect: { type: Type.BOOLEAN },
        },
        required: ["id", "text", "isCorrect"],
      },
    },
    feedback: {
      type: Type.STRING,
      description: "Educational feedback explaining the correct answer using the specific grammar rule found in the provided material (e.g. 'We use Past Continuous for actions in progress in the past').",
    },
  },
  required: ["context", "question", "options", "feedback", "topic"],
};

// Content extracted from PDFs to ground the AI
const CONTEXT_MATERIAL = {
  LEVEL_A: `
    SOURCE MATERIAL (PDF 3 - EJE 3):
    1. Text: "A Day in Alex – IT Project Coordinator". Alex is checking dashboards, reviewing emails, sending instructions.
    2. Grammar: 
       - Present Continuous for actions happening NOW (am/is/are + ing). 
       - Prepositions of Time (AT + exact time, ON + day, IN + month/year).
       - Prepositions of Place (ON the table, IN the room, AT the station).
       - Quantifiers: Countable (Many, A few) vs Uncountable (Much, A little, A lot of).
    3. Technical Vocabulary: Dashboard, Server, Bug, Workflow, Developer, PPE (Boots, Helmet, Goggles), Hazard (Biological, Chemical), Forklift.
  `,
  LEVEL_B: `
    SOURCE MATERIAL (PDF 1 - EJE 4):
    1. Text: "Laura's Day". She arrived, checked laptop, didn't have coffee (Past Simple).
    2. Text: "An Agile Morning". Team was having a meeting, developers were writing code (Past Continuous).
    3. Grammar:
       - Past Simple: Completed actions (Regular -ed / Irregular verbs).
       - Past Continuous: Actions in progress in the past (was/were + ing).
       - Modals: MUST (strong obligation/prohibition), SHOULD (advice), CAN/COULD (ability/possibility), HAVE TO (external obligation).
    4. Technical Vocabulary: Compliance, Audit, Drill, Incident, Maintenance, Firewall, Sensor.
  `,
  LEVEL_C: `
    SOURCE MATERIAL (PDF 2 - Future & Prepositions):
    1. Text: "The Future of Work and AI". AI is going to change jobs. Companies will use AI. New jobs will appear.
    2. Grammar:
       - Will: Spontaneous decisions, predictions without evidence, promises.
       - Going to: Plans, intentions, predictions WITH evidence.
       - Present Continuous for Future: Fixed arrangements (time/place).
       - Prepositions: TO (Destination, Recipient, Purpose with verb) vs FOR (Benefit, Duration, Purpose with noun/-ing).
    3. Technical Vocabulary: Algorithm, Automation, Cloud Computing, Data Mining, Supply Chain, Logistics.
  `
};

export const generateScenario = async (level: Level): Promise<Scenario> => {
  const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  
  let levelContext = "";
  
  switch (level) {
    case Level.A:
      levelContext = CONTEXT_MATERIAL.LEVEL_A;
      break;
    case Level.B:
      levelContext = CONTEXT_MATERIAL.LEVEL_B;
      break;
    case Level.C:
      levelContext = CONTEXT_MATERIAL.LEVEL_C;
      break;
  }

  const prompt = `
    You are an ESP (English for Specific Purposes) Game Master for technical professionals (IT, Safety, Logistics).
    Generate a multiple-choice scenario based STRICTLY on the following material.
    
    Selected Level: ${level}
    Technical Field: ${randomTopic}
    
    ${levelContext}
    
    Requirements:
    1. Context: Create a short professional scenario (2 sentences) relevant to the Technical Field and the Text Context provided above.
    2. Question: Ask a grammar or vocabulary question based on the rules in the Source Material.
    3. Options: Provide 3 options. One correct, two distractors.
    4. Feedback: Explain the answer using the specific grammar rule mentioned in the Source Material (e.g., "Use 'at' for precise times").
    5. Output: JSON format. English ONLY.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response text from Gemini");
    }
    
    const scenarioData = JSON.parse(text) as Scenario;
    return scenarioData;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback scenario
    return {
      context: "Connection to the AI Scenario Generator interrupted.",
      question: "Which action is correct to try again?",
      topic: "System Error",
      options: [
        { id: "1", text: "We are retrying the connection.", isCorrect: true },
        { id: "2", text: "We retries the connection.", isCorrect: false },
        { id: "3", text: "We to retry the connection.", isCorrect: false }
      ],
      feedback: "Use Present Continuous (are retrying) for actions happening right now."
    };
  }
};