'use client';
import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { DrawingToolbar } from '@/components/molecules/drawing-toolbar';
import type { KonvaEventObject } from 'konva/lib/Node';

interface LineType {
  tool: 'pen' | 'eraser';
  points: number[];
}

export function DrawingCanvas() {
  const { nextChallenge, currentChallengeIndex, challenges } = useScreeningStore();
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lines, setLines] = useState<LineType[]>([]);
  const isDrawing = useRef(false);

  // Clear canvas when challenge changes
  useEffect(() => {
    setLines([]);
  }, [currentChallengeIndex]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;
    
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto gap-6">
      <div className="w-full bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
           {/* Dynamic icon based on shape would go here */}
           <span className="material-icons-round text-3xl font-bold capitalize">
             {challenges[currentChallengeIndex].shape[0]}
           </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            {challenges[currentChallengeIndex].name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {challenges[currentChallengeIndex].instruction}
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-4/3 bg-white dark:bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden shadow-inner cursor-crosshair touch-none">
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        
        <Stage
          width={800} // Ideally dynamic based on container ref
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#1E88E5" // Primary Blue
                strokeWidth={line.tool === 'eraser' ? 20 : 5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <DrawingToolbar 
        onClear={() => setLines([])}
        isEraserActive={tool === 'eraser'}
        onEraserToggle={() => setTool(tool === 'pen' ? 'eraser' : 'pen')}
        onComplete={nextChallenge}
      />
    </div>
  );
}
