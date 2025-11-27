import clsx from "clsx";

interface TypingAreaProps {
  text: string;
  userInput: string;
  timeLeft: number;
  onRestart: () => void;
  isFocused?: boolean;
}

export default function TypingArea({ text, userInput, timeLeft, onRestart, isFocused }: TypingAreaProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-12 mb-8 relative">
      {/* Timer */}
      <div className={clsx(
        "text-4xl font-medium text-banana-active mb-8 font-mono transition-opacity duration-500",
        isFocused ? "opacity-100" : "opacity-70"
      )}>
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
                "transition-colors duration-75 relative",
                // Typed correct
                isTyped && isCorrect && "text-banana-dark",
                // Typed error
                isTyped && !isCorrect && "text-banana-error",
                // Untyped
                !isTyped && "text-banana-text opacity-60",
              )}
            >
              {/* Caret */}
              {isCurrent && (
                <span className="absolute left-0 -top-1 bottom-1 w-[2px] bg-banana-active animate-pulse rounded-full shadow-[0_0_10px_rgba(255,218,185,0.8)] z-10" />
              )}
              
              {/* Character */}
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
