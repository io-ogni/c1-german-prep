import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddConnectorInputProps {
  onAdd: (fn: string, items: string) => void;
}

export function AddConnectorInput({ onAdd }: AddConnectorInputProps) {
  const [open, setOpen] = useState(false);
  const [fn, setFn] = useState('');
  const [items, setItems] = useState('');

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-xs text-muted-foreground hover:text-foreground mt-2"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-3.5 w-3.5" />
        Konnektor hinzufügen
      </Button>
    );
  }

  const handleSubmit = () => {
    if (fn.trim() && items.trim()) {
      onAdd(fn.trim(), items.trim());
      setFn('');
      setItems('');
      setOpen(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2 flex-wrap sm:flex-nowrap">
      <Input
        value={fn}
        onChange={e => setFn(e.target.value)}
        placeholder="Funktion"
        className="h-8 text-sm w-28 shrink-0"
        autoFocus
        onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); setFn(''); setItems(''); } }}
      />
      <Input
        value={items}
        onChange={e => setItems(e.target.value)}
        placeholder="Konnektoren (kommagetrennt)"
        className="h-8 text-sm flex-1"
        onKeyDown={e => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') { setOpen(false); setFn(''); setItems(''); }
        }}
      />
      <Button size="sm" className="h-8 px-3" onClick={handleSubmit}>
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
