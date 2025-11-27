import { X, Trophy, History, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface TestResult {
  wpm: number;
  accuracy: number;
  mode: string;
  date: string;
}

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [bestWpm, setBestWpm] = useState(0);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [totalTests, setTotalTests] = useState(0);

  useEffect(() => {
    const savedHistory = localStorage.getItem("banana-history");
    if (savedHistory) {
      const parsedHistory: TestResult[] = JSON.parse(savedHistory);
      setHistory(parsedHistory.reverse()); // Show newest first

      if (parsedHistory.length > 0) {
        const maxWpm = Math.max(...parsedHistory.map((r) => r.wpm));
        const totalAcc = parsedHistory.reduce((acc, curr) => acc + curr.accuracy, 0);
        
        setBestWpm(maxWpm);
        setAvgAccuracy(Math.round(totalAcc / parsedHistory.length));
        setTotalTests(parsedHistory.length);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-banana-bg p-8 rounded-2xl shadow-2xl max-w-2xl w-full border-4 border-banana-dark transform scale-100 animate-in fade-in zoom-in duration-200 relative max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-banana-dark/50 hover:text-banana-dark transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-banana-dark mb-6 text-center flex items-center justify-center gap-3">
          <Trophy className="text-banana-active" size={32} />
          Your Profile
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-banana-dark/5 p-4 rounded-xl text-center">
            <div className="text-banana-text text-sm font-bold uppercase tracking-wider mb-1">Best WPM</div>
            <div className="text-4xl font-mono font-bold text-banana-dark">{Math.round(bestWpm)}</div>
          </div>
          <div className="bg-banana-dark/5 p-4 rounded-xl text-center">
            <div className="text-banana-text text-sm font-bold uppercase tracking-wider mb-1">Avg Accuracy</div>
            <div className="text-4xl font-mono font-bold text-banana-dark">{avgAccuracy}%</div>
          </div>
          <div className="bg-banana-dark/5 p-4 rounded-xl text-center">
            <div className="text-banana-text text-sm font-bold uppercase tracking-wider mb-1">Tests Taken</div>
            <div className="text-4xl font-mono font-bold text-banana-dark">{totalTests}</div>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <h3 className="text-xl font-bold text-banana-dark mb-4 flex items-center gap-2">
            <History size={20} />
            Recent History
          </h3>
          
          <div className="overflow-y-auto pr-2 space-y-2 flex-1 custom-scrollbar">
            {history.length === 0 ? (
              <div className="text-center text-banana-text/50 py-8 italic">
                No tests taken yet. Start typing!
              </div>
            ) : (
              history.map((result, index) => (
                <div key={index} className="flex items-center justify-between bg-banana-dark/5 p-3 rounded-lg hover:bg-banana-dark/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-banana-active/20 p-2 rounded-md">
                      <Activity size={16} className="text-banana-dark" />
                    </div>
                    <div>
                      <div className="font-bold text-banana-dark">{Math.round(result.wpm)} WPM</div>
                      <div className="text-xs text-banana-text">{new Date(result.date).toLocaleDateString()} • {result.mode}</div>
                    </div>
                  </div>
                  <div className={clsx(
                    "font-mono font-bold",
                    result.accuracy >= 95 ? "text-green-600" : result.accuracy >= 90 ? "text-yellow-600" : "text-red-600"
                  )}>
                    {Math.round(result.accuracy)}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
