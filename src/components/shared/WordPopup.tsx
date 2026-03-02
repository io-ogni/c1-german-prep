import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

interface WordPopupProps {
  word: string;
  translation?: string;
  children: React.ReactNode;
  onAddToVocabulary?: () => void;
}

export function WordPopup({ word, translation, children, onAddToVocabulary }: WordPopupProps) {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="space-y-2">
          <p className="font-semibold text-sm text-foreground">{word}</p>
          {translation && (
            <p className="text-xs text-muted-foreground">{translation}</p>
          )}
          {onAddToVocabulary && (
            <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={onAddToVocabulary}>
              <Plus className="h-3.5 w-3.5" />
              {t('nav.myVocabulary')}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
