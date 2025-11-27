import { RefreshCcw } from "lucide-react";

interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  timeTaken: number;
  onRestart: () => void;
}

export default function ResultsModal({ wpm, accuracy, timeTaken, onRestart }: ResultsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-banana-bg p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-banana-dark transform scale-100 animate-in fade-in zoom-in duration-200">
        <h2 className="text-3xl font-bold text-banana-dark mb-6 text-center">Result</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center p-4 bg-banana-dark/5 rounded-xl">
            <span className="text-banana-text/80 text-sm font-medium uppercase tracking-wider">WPM</span>
            <span className="text-5xl font-bold text-banana-active">{Math.round(wpm)}</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-banana-dark/5 rounded-xl">
            <span className="text-banana-text/80 text-sm font-medium uppercase tracking-wider">Accuracy</span>
            <span className="text-5xl font-bold text-banana-active">{Math.round(accuracy)}%</span>
          </div>
        </div>

        <div className="text-center mb-8 text-banana-dark/60 font-mono">
          Time: {timeTaken}s
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-banana-dark text-banana-text rounded-xl font-bold text-lg hover:bg-banana-active hover:text-banana-dark transition-all flex items-center justify-center gap-2 group"
        >
          <RefreshCcw className="group-hover:rotate-180 transition-transform duration-500" />
          Restart Test
        </button>
        
        <div className="text-center mt-4 text-xs text-banana-text/60">
          Press <span className="font-bold bg-banana-dark/10 px-1 rounded">Tab</span> + <span className="font-bold bg-banana-dark/10 px-1 rounded">Enter</span> to restart
        </div>
      </div>
    </div>
  );
}
