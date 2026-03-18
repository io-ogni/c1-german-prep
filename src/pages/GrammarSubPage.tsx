import { useNavigate, useParams } from 'react-router-dom';
import { ExerciseFlow } from '@/components/vocabulary/ExerciseFlow';

const SUB_PAGES: Record<string, { topic: string; title: string; level: 'b2' | 'c1' }> = {
  prepositions: { topic: 'praepositionen', title: 'Präpositionen', level: 'b2' },
  konjunktiv: { topic: 'konjunktiv_ii', title: 'Konjunktiv II', level: 'b2' },
  passiv: { topic: 'passiv', title: 'Passiv', level: 'b2' },
};

export default function GrammarSubPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const config = slug ? SUB_PAGES[slug] : undefined;

  if (!config) {
    navigate('/grammar');
    return null;
  }

  return (
    <ExerciseFlow
      area="grammar"
      topic={config.topic}
      level={config.level}
      topicTitle={config.title}
      onBack={() => navigate('/grammar')}
    />
  );
}
