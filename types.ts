export enum Level {
  A = 'A', // Trainee: Present Continuous, Prepositions, Quantifiers (PDF 3)
  B = 'B', // Junior: Past Tenses, Modals (PDF 1)
  C = 'C', // Senior: Future Forms, To/For (PDF 2)
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Scenario {
  context: string;
  question: string;
  options: Option[];
  feedback: string; // Explanation of grammar/technical rule
  topic: string;
}

export interface GameState {
  currentLevel: Level | null;
  score: number;
  questionCount: number;
  isPlaying: boolean;
  gameOver: boolean;
  loading: boolean;
  currentScenario: Scenario | null;
  feedbackVisible: boolean;
  lastAnswerCorrect: boolean | null;
}

export const TOPICS = [
  'IT & Software Development (Alex, Laura)',
  'Industrial Safety & Hygiene (PPE, Regulations)',
  'Logistics & Supply Chain (Warehousing, Transport)',
  'Mechatronics & Automation (Robots, Sensors)',
  'Business Administration (Meetings, Budgets)'
];