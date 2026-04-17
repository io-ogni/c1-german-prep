import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  question: string;
  children: React.ReactNode;
  feedback?: { correct: boolean; message: string } | null;
  className?: string;
}

export function ExerciseCard({ question, children, feedback, className }: ExerciseCardProps) {
  return (
    <Card className={cn('w-full overflow-hidden', className)}>
      <CardHeader className="p-3 md:p-6 pb-4 md:pb-5">
        <CardTitle className="text-base font-medium leading-relaxed">{question}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0 flex flex-col space-y-3">
        {children}
        {feedback && (
          <div
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium',
              feedback.correct
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {feedback.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
