import { useTranslation } from '@/i18n/useTranslation';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Headphones, Video, Monitor, MessageSquareText } from 'lucide-react';
import { useRef, useState } from 'react';
import { DialogueList, DialogueView } from '@/components/it-deutsch/DialogueReader';
import { IT_DIALOGUES } from '@/data/itDialogues';
import type { ITDialogue } from '@/data/itDialogues';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const MEDIA_BASE = `${SUPABASE_URL}/storage/v1/object/public/Media%20IT`;

const VIDEO = {
  file: 'IT-Gehaltsverhandlung_(C1).mp4',
  title: 'IT-Gehaltsverhandlung (C1)',
  description: 'Das C1-Hochstapler-Problem: Wie du mit präziser Business-Sprache, Power-Verben und datengetriebener Argumentation Gehaltsverhandlungen auf Augenhöhe führst.',
};

const PODCASTS = [
  {
    file: 'Verbales_Karate_fuer_deutsche_IT-Meetings.mp3',
    title: 'Verbales Karate für deutsche IT-Meetings',
    description: 'Power Nouns, deeskalierende Formulierungen und kulturell verankerte Idiome — die rhetorischen Machtmittel, die über berufliche Autorität entscheiden.',
    duration: '~15 Min.',
  },
  {
    file: 'Warum_Hoeflichkeit_dich_zehntausend_Euro_kostet.mp3',
    title: 'Warum Höflichkeit dich zehntausend Euro kostet',
    description: 'Das Intermediate Plateau, Machtdynamiken in Meetings und warum Modalpartikel und die richtige Duzen-Etikette dein Gehalt beeinflussen.',
    duration: '~15 Min.',
  },
  {
    file: 'Souveraenitaet_durch_Sachlichkeit_im_deutschen_IT-Alltag.mp3',
    title: 'Souveränität durch Sachlichkeit im deutschen IT-Alltag',
    description: 'Verbales Judo: Substantivierung, Konjunktiv II und präzise Kollokationen — die kulturelle Matrix für professionelle Autorität.',
    duration: '~15 Min.',
  },
];

function AudioCard({ podcast }: { podcast: typeof PODCASTS[0] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <button
            onClick={toggle}
            className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow"
          >
            {playing ? (
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-white rounded-full" />
                <div className="w-1 h-4 bg-white rounded-full" />
              </div>
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Headphones className="h-3.5 w-3.5 text-fuchsia-500 shrink-0" />
              <span className="text-xs text-muted-foreground font-medium">{podcast.duration}</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{podcast.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{podcast.description}</p>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={`${MEDIA_BASE}/${podcast.file}`}
          controlsList="nodownload"
          preload="none"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          className="w-full mt-3"
          controls
        />
      </CardContent>
    </Card>
  );
}

export default function ITDeutschPage() {
  const { t, lang } = useTranslation();
  const [selectedDialogue, setSelectedDialogue] = useState<ITDialogue | null>(null);

  if (selectedDialogue) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            {t('nav_it_deutsch')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Berufssprache für die IT-Branche — Vokabular, Redewendungen und Dialoge für den Arbeitsalltag.</p>
        </div>
        <ITDeutschNav />
        <DialogueView dialogue={selectedDialogue} onBack={() => setSelectedDialogue(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Berufssprache für die IT-Branche — Vokabular, Redewendungen und Dialoge für den Arbeitsalltag.</p>
      </div>
      <ITDeutschNav />

      {/* Dialogues — prominent placement */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareText className="h-4 w-4 text-fuchsia-500" />
          <h2 className="font-semibold text-foreground">{lang === 'de' ? 'Dialoge' : 'Dialogues'}</h2>
        </div>
        <DialogueList dialogues={IT_DIALOGUES} onSelect={setSelectedDialogue} />
      </div>

      {/* Featured video */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Video className="h-4 w-4 text-fuchsia-500" />
          <h2 className="font-semibold text-foreground">Video</h2>
        </div>
        <Card className="max-w-2xl">
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <video
              src={`${MEDIA_BASE}/${VIDEO.file}`}
              controls
              controlsList="nodownload"
              preload="metadata"
              className="w-full aspect-video bg-black"
              poster=""
            />
            <div className="p-5">
              <h3 className="font-semibold text-foreground mb-1">{VIDEO.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{VIDEO.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Podcasts */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Headphones className="h-4 w-4 text-fuchsia-500" />
          <h2 className="font-semibold text-foreground">Podcasts</h2>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {PODCASTS.map((p) => (
            <AudioCard key={p.file} podcast={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
