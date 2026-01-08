import { Button } from '@/components/ui/button';
import { Pencil, Eraser, Trash2, CheckCircle } from 'lucide-react';

interface DrawingToolbarProps {
  onClear: () => void;
  onEraserToggle: () => void;
  isEraserActive: boolean;
  onComplete: () => void;
}

export function DrawingToolbar({ onClear, onEraserToggle, isEraserActive, onComplete }: DrawingToolbarProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Button
          variant={!isEraserActive ? "default" : "secondary"}
          size="icon"
          className="w-12 h-12 rounded-lg"
          onClick={() => isEraserActive && onEraserToggle()}
        >
          <Pencil className="w-5 h-5" />
        </Button>
        <Button
          variant={isEraserActive ? "default" : "secondary"}
          size="icon"
          className="w-12 h-12 rounded-lg"
          onClick={onEraserToggle}
        >
          <Eraser className="w-5 h-5" />
        </Button>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2" />
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={onClear}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
      
      <Button 
        onClick={onComplete}
        className="w-full sm:w-auto px-8 h-12 rounded-xl text-lg font-bold gap-2 shadow-lg shadow-blue-500/20"
      >
        I&apos;m Done <CheckCircle className="w-5 h-5" />
      </Button>
    </div>
  );
}
