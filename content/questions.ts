export type QuestionType =
  | "welcome"
  | "text"
  | "email"
  | "longtext"
  | "choice"
  | "multichoice"
  | "review";

export type Question = {
  id: string;
  type: QuestionType;
  field?: string;
  question?: string;
  helper?: string;
  required?: boolean;
  options?: string[];
  minSelections?: number;
  placeholder?: string;
  headline?: string;
  body?: string;
  buttonLabel?: string;
};

export const questions: Question[] = [
  {
    id: "welcome",
    type: "welcome",
    headline: "Let's find out what your audience will buy.",
    body: "Eleven questions, about five minutes. I read every application myself, and you'll book a call with me at the end. — Daive",
    buttonLabel: "Start",
  },
  {
    id: "name",
    type: "text",
    field: "name",
    question: "What's your name?",
    required: true,
    placeholder: "Your name",
  },
  {
    id: "email",
    type: "email",
    field: "email",
    question: "What's the best email for you?",
    helper: "This is where I'll send your confirmation.",
    required: true,
    placeholder: "name@email.com",
  },
  {
    id: "brand_name",
    type: "text",
    field: "brand_name",
    question: "What's your brand or business name?",
    required: true,
    placeholder: "Brand or business name",
  },
  {
    id: "business_type",
    type: "choice",
    field: "business_type",
    question: "Which best describes you?",
    required: true,
    options: [
      "Creator or personal brand",
      "Online business",
      "In-person or local business",
      "Both a brand and an audience",
    ],
  },
  {
    id: "social_link",
    type: "text",
    field: "social_link",
    question: "Drop a link to your main profile or website.",
    helper: "Wherever your audience is biggest.",
    required: true,
    placeholder: "https://...",
  },
  {
    id: "audience_size",
    type: "choice",
    field: "audience_size",
    question: "How big is that audience?",
    required: true,
    options: [
      "Under 5,000",
      "5,000–25,000",
      "25,000–100,000",
      "100,000–500,000",
      "500,000+",
      "Still building it",
    ],
  },
  {
    id: "build_interest",
    type: "multichoice",
    field: "build_interest",
    question: "What are you interested in building?",
    helper: "Pick anything that appeals — we'll narrow it down on the call.",
    required: true,
    minSelections: 1,
    options: [
      "Software or an app",
      "Course or info product",
      "Paid community or membership",
      "Physical product or merch",
      "More customers for an existing business",
      "Not sure — recommend something",
    ],
  },
  {
    id: "goal",
    type: "longtext",
    field: "goal",
    question: "What do you want this to do for you?",
    helper: "Your main goal over the next year, in a sentence or two.",
    required: true,
    placeholder: "Type your answer...",
  },
  {
    id: "budget",
    type: "choice",
    field: "budget",
    question: "What can you invest to get it built properly?",
    helper: "Asked so the call is useful for both of us. Nothing is charged now.",
    required: true,
    options: [
      "Under $2,000",
      "$2,000–$5,000",
      "$5,000–$10,000",
      "$10,000+",
      "I'd rather discuss it on the call",
    ],
  },
  {
    id: "timeline",
    type: "choice",
    field: "timeline",
    question: "How soon do you want this live?",
    required: true,
    options: [
      "As soon as possible",
      "1–3 months",
      "3–6 months",
      "Just exploring",
    ],
  },
  {
    id: "notes",
    type: "longtext",
    field: "notes",
    question: "Anything else I should know?",
    required: false,
    placeholder: "Optional",
  },
  {
    id: "review",
    type: "review",
  },
];

export const fieldQuestions = questions.filter((q) => q.field);
