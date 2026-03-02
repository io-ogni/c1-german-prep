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
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium leading-relaxed">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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
