import clsx from "clsx";

const ROWS = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "\\"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift"],
  ["Ctrl", "Alt", "Space", "Ctrl", "Alt"],
];

interface VirtualKeyboardProps {
  activeKeys?: string[];
}

export default function VirtualKeyboard({ activeKeys = [] }: VirtualKeyboardProps) {
  return (
    <div className="flex flex-col gap-2 items-center mt-12 select-none">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key, keyIndex) => {
            const isSpace = key === "Space";
            const isActive = activeKeys.includes(key.toUpperCase());
            
            // Determine width based on key type
            let widthClass = "w-12";
            if (key === "Backspace") widthClass = "w-24";
            if (key === "Tab" || key === "\\") widthClass = "w-16";
            if (key === "Caps Lock" || key === "Enter") widthClass = "w-20";
            if (key === "Shift") widthClass = "w-28";
            if (key === "Ctrl" || key === "Alt") widthClass = "w-16";
            if (isSpace) widthClass = "w-96";

            return (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={clsx(
                  "h-12 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-75",
                  widthClass,
                  isActive
                    ? "bg-banana-active text-banana-dark translate-y-1 shadow-none"
                    : "bg-banana-dark text-banana-text shadow-[0_4px_0_rgba(0,0,0,0.2)]"
                )}
              >
                {isSpace ? "" : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
