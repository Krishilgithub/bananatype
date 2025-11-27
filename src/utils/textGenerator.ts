const COMMON_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

const QUOTES = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Do what you can, with what you have, where you are.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you've ever wanted is on the other side of fear.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Dream big and dare to fail.",
  "Quality is not an act, it is a habit.",
  "Life is 10% what happens to you and 90% how you react to it."
];

const CODE_SNIPPETS = [
  "const [state, setState] = useState(initialState);",
  "function calculateArea(radius) { return Math.PI * radius * radius; }",
  "import { useEffect } from 'react';",
  "console.log('Hello, World!');",
  "if (isValid) { processData(data); } else { throw new Error('Invalid data'); }",
  "array.map(item => item.id).filter(id => id !== null);",
  "export default function App() { return <div>App</div>; }",
  "const sum = (a, b) => a + b;",
  "document.getElementById('root').render(<App />);",
  "return new Promise((resolve, reject) => { setTimeout(resolve, 1000); });"
];

export type Mode = "Time" | "Words" | "Quote" | "Code";

export function generateText(mode: Mode, count: number = 30): string {
  switch (mode) {
    case "Words":
    case "Time": // Time mode also uses random words
      return Array.from({ length: count }, () => COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]).join(" ");
    case "Quote":
      return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    case "Code":
      // For code, we might want to join a few snippets if count is high, but usually one block is good.
      // Let's return a random snippet or two.
      return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    default:
      return "Error generating text.";
  }
}
