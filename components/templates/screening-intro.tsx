import { useScreeningStore } from '@/app/lib/stores/screening.store';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/organisms/header';
import { FeatureCard } from '@/components/molecules/feature-card';
import { BrainCircuit, Clock, Gamepad2, ShieldCheck, ArrowRight } from 'lucide-react';

export function ScreeningIntro() {
  const { setStep } = useScreeningStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header title="Introduction" showBack />
      
      <main className="grow flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 ring-8 ring-white dark:ring-slate-900 shadow-xl">
              <BrainCircuit className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              How the Screening Works
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              This short screening helps us understand your reading style. It is not a test with grades, so just relax and do your best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Clock} 
              title="10-15 Minutes" 
              description="You can take your time. There is no rush to finish quickly." 
              variant="blue"
            />
            <FeatureCard 
              icon={Gamepad2} 
              title="Simple Games" 
              description="You will play 5 simple drawing and word activities. Just be yourself." 
              variant="purple"
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Private Results" 
              description="Your answers are safe. Only you and your parents will see them." 
              variant="green"
            />
          </div>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg rounded-2xl gap-2 shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-transform"
              onClick={() => setStep('standby')}
            >
              Start Screening <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
