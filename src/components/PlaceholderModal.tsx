import { X } from "lucide-react";

interface PlaceholderModalProps {
  title: string;
  onClose: () => void;
}

export default function PlaceholderModal({ title, onClose }: PlaceholderModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-banana-bg p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-banana-dark transform scale-100 animate-in fade-in zoom-in duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-banana-dark/50 hover:text-banana-dark transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-banana-dark mb-4 text-center">{title}</h2>
        
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="text-6xl">🚧</div>
          <p className="text-banana-text text-lg">
            This feature is currently under construction. Check back later!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-banana-dark text-banana-text rounded-xl font-bold text-lg hover:bg-banana-active hover:text-banana-dark transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
