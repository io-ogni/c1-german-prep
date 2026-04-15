import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SelectionHint } from '@/components/shared/SelectionHint';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { TelcBadge } from '@/components/shared/TelcBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';

// Wrap components that use router
function withRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('SelectionHint', () => {
  it('renders hint text for table variant', () => {
    // Clear any dismissed state
    localStorage.removeItem('selection-hint-dismissed');
    withRouter(<SelectionHint hintKey="test-key" variant="table" />);
    expect(screen.getByText(/Markiere Einträge/)).toBeInTheDocument();
  });

  it('renders reading variant text', () => {
    localStorage.removeItem('selection-hint-dismissed');
    withRouter(<SelectionHint hintKey="test-reading" variant="reading" />);
    expect(screen.getByText(/Tippe auf ein Wort/)).toBeInTheDocument();
  });

  it('renders link to vocabulary page', () => {
    localStorage.removeItem('selection-hint-dismissed');
    withRouter(<SelectionHint hintKey="test-link" variant="table" />);
    const link = screen.getByText('Wortschatz');
    expect(link).toHaveAttribute('href', '/my-vocabulary');
  });
});

describe('ExerciseCard', () => {
  it('renders question and children', () => {
    render(
      <ExerciseCard question="What is the capital of Germany?">
        <p>Berlin</p>
      </ExerciseCard>
    );
    expect(screen.getByText('What is the capital of Germany?')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
  });

  it('renders correct feedback', () => {
    render(
      <ExerciseCard question="Test" feedback={{ correct: true, message: 'Richtig!' }}>
        <p>Content</p>
      </ExerciseCard>
    );
    expect(screen.getByText('Richtig!')).toBeInTheDocument();
  });

  it('renders incorrect feedback', () => {
    render(
      <ExerciseCard question="Test" feedback={{ correct: false, message: 'Falsch. Richtige Antwort: Berlin' }}>
        <p>Content</p>
      </ExerciseCard>
    );
    expect(screen.getByText(/Falsch/)).toBeInTheDocument();
  });
});

describe('TelcBadge', () => {
  it('renders telc text', () => {
    render(<TelcBadge />);
    expect(screen.getByText('telc')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(<TelcBadge className="ml-2" />);
    expect(container.firstChild).toHaveClass('ml-2');
  });
});

describe('ProgressBar', () => {
  it('renders with 0% value', () => {
    const { container } = render(<ProgressBar value={0} />);
    expect(container.querySelector('[role="progressbar"]') || container.firstChild).toBeInTheDocument();
  });

  it('renders with 100% value', () => {
    const { container } = render(<ProgressBar value={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
