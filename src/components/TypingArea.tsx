import clsx from "clsx";

interface TypingAreaProps {
  text: string;
  userInput: string;
  timeLeft: number;
  onRestart: () => void;
}

export default function TypingArea({ text, userInput, timeLeft, onRestart }: TypingAreaProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-12 mb-8">
      {/* Timer */}
      <div className="text-4xl font-medium text-banana-active mb-8 font-mono">
        {timeLeft}s
      </div>

      {/* Text Area */}
      <div className="text-2xl md:text-3xl font-mono leading-relaxed tracking-wide text-justify break-words w-full relative select-none">
        {text.split("").map((char, index) => {
          const isTyped = index < userInput.length;
          const isCorrect = isTyped && userInput[index] === char;
          const isCurrent = index === userInput.length;

          return (
            <span
              key={index}
              className={clsx(
                // Base style
                "transition-colors duration-75",
                // Typed correct
                isTyped && isCorrect && "text-banana-dark",
                // Typed error
                isTyped && !isCorrect && "text-banana-error",
                // Untyped
                !isTyped && "text-banana-text opacity-60",
                // Current cursor (blinking or solid highlight)
                isCurrent && "bg-banana-active/50 rounded-sm animate-pulse text-banana-dark"
              )}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
