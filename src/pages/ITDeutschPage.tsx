import { useTranslation } from '@/i18n/useTranslation';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Headphones, Video, Monitor, MessageSquareText } from 'lucide-react';
import { useRef, useState } from 'react';
import { DialogueList, DialogueView } from '@/components/it-deutsch/DialogueReader';
import { IT_DIALOGUES } from '@/data/itDialogues';
import type { ITDialogue } from '@/data/itDialogues';
import { PILL_CONTAINER, TAB_TRIGGER_FUCHSIA } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';

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

function AudioCard({ podcast, index }: { podcast: typeof PODCASTS[0]; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="group transition-all hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4 py-2 flex items-center gap-2 text-xs font-medium bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:text-fuchsia-300">
          <Headphones className="h-3 w-3" />
          Episode {index + 1}
          <span className="ml-auto text-[10px] opacity-70">{podcast.duration}</span>
        </div>
        <div className="px-4 py-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm leading-snug">{podcast.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{podcast.description}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              {playing ? (
                <div className="flex gap-0.5">
                  <div className="w-1 h-3.5 bg-white rounded-full" />
                  <div className="w-1 h-3.5 bg-white rounded-full" />
                </div>
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-fuchsia-400 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{currentTime}</span>
            </div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={`${MEDIA_BASE}/${podcast.file}`}
          controlsList="nodownload"
          preload="none"
          onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime('0:00'); }}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration) setProgress((el.currentTime / el.duration) * 100);
            setCurrentTime(formatTime(el.currentTime));
          }}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}

export default function ITDeutschPage() {
  const { t, lang } = useTranslation();
  const [selectedDialogue, setSelectedDialogue] = useState<ITDialogue | null>(null);

  if (selectedDialogue) {
    return <DialogueView dialogue={selectedDialogue} onBack={() => setSelectedDialogue(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Damit 'Can you maybe look into this?' endlich auf Deutsch genauso passiv-aggressiv klingt.</p>
      </div>
      <ITDeutschNav />

      <Tabs defaultValue="dialoge">
        <ScrollNav>
          <TabsList className={PILL_CONTAINER}>
            <TabsTrigger value="dialoge" className={TAB_TRIGGER_FUCHSIA}><MessageSquareText className="h-3.5 w-3.5" /> Dialoge</TabsTrigger>
            <TabsTrigger value="podcasts" className={TAB_TRIGGER_FUCHSIA}><Headphones className="h-3.5 w-3.5" /> Podcasts</TabsTrigger>
            <TabsTrigger value="video" className={TAB_TRIGGER_FUCHSIA}><Video className="h-3.5 w-3.5" /> Video</TabsTrigger>
          </TabsList>
        </ScrollNav>

        <TabsContent value="dialoge">
          <DialogueList dialogues={IT_DIALOGUES} onSelect={setSelectedDialogue} />
        </TabsContent>

        <TabsContent value="podcasts">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {PODCASTS.map((p, i) => (
              <AudioCard key={p.file} podcast={p} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video">
          <Card className="sm:max-w-[calc(50%-0.375rem)] overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="px-4 py-2 flex items-center gap-2 text-xs font-medium bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:text-fuchsia-300">
                <Video className="h-3 w-3" />
                Roleplay
              </div>
              <video
                src={`${MEDIA_BASE}/${VIDEO.file}`}
                controls
                controlsList="nodownload"
                preload="metadata"
                className="w-full aspect-video bg-black"
              />
              <div className="px-4 py-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{VIDEO.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{VIDEO.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
