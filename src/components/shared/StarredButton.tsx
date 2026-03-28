interface StarredButtonProps {
  active: boolean;
  onClick: () => void;
}

export function StarredButton({ active, onClick }: StarredButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      <span className="text-sm leading-none">⭐</span>
      Markierte
    </button>
  );
}
