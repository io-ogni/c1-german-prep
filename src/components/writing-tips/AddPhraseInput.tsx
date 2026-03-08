import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddPhraseInputProps {
  placeholder?: string;
  onAdd: (value: string) => void;
}

export function AddPhraseInput({ placeholder = 'Eigenen Satz hinzufügen…', onAdd }: AddPhraseInputProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-xs text-muted-foreground hover:text-foreground mt-1"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-3.5 w-3.5" />
        Hinzufügen
      </Button>
    );
  }

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue('');
      setOpen(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2 pl-5">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-8 text-sm"
        autoFocus
        onKeyDown={e => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') { setOpen(false); setValue(''); }
        }}
      />
      <Button size="sm" className="h-8 px-3" onClick={handleSubmit}>
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
