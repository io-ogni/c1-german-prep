import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';
import { ITDeutschNav } from '@/components/layout/ITDeutschNav';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { PILL_CONTAINER, TAB_TRIGGER_FUCHSIA } from '@/components/shared/navStyles';
import { ScrollNav } from '@/components/shared/ScrollNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { USER_STORY_DOMAINS } from '@/data/userStories';
import type { UserStory } from '@/data/userStories';

function StoryCard({ story, showEnglish }: { story: UserStory; showEnglish: boolean }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Left: User Story */}
          <div className="p-5 space-y-3">
            <Badge variant="secondary" className="text-[10px] font-normal">User Story</Badge>
            <div className="space-y-1">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold text-primary">{story.role_de}</span>{' '}
                {story.want_de},{' '}
                <span className="italic">{story.why_de}.</span>
              </p>
              {showEnglish && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  <span className="font-medium">{story.role_en}</span>{' '}
                  {story.want_en},{' '}
                  <span className="italic">{story.why_en}.</span>
                </p>
              )}
            </div>
          </div>

          {/* Right: Acceptance Criteria */}
          <div className="p-5 space-y-3 bg-muted/30">
            <Badge variant="secondary" className="text-[10px] font-normal">Akzeptanzkriterien</Badge>
            <ul className="space-y-2">
              {story.criteria.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-foreground">{c.de}</span>
                    {showEnglish && (
                      <span className="block text-xs text-muted-foreground mt-0.5">{c.en}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserStoriesContent() {
  const { lang } = useTranslation();
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <div className="space-y-4 mt-2">
      <div className="flex items-center justify-end">
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            showEnglish
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {showEnglish ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showEnglish ? 'EN aus' : 'EN ein'}
        </button>
      </div>

      <Tabs defaultValue={USER_STORY_DOMAINS[0].id}>
        <ScrollNav>
          <TabsList className={PILL_CONTAINER}>
            {USER_STORY_DOMAINS.map(d => (
              <TabsTrigger key={d.id} value={d.id} className={TAB_TRIGGER_FUCHSIA}>
                <span>{d.icon}</span> {d.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollNav>

        {USER_STORY_DOMAINS.map(domain => (
          <TabsContent key={domain.id} value={domain.id} className="mt-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              {lang === 'de' ? domain.description_de : domain.description_en}
            </p>
            {domain.stories.map(story => (
              <div key={story.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">{story.title_de}</h3>
                {showEnglish && <p className="text-xs text-muted-foreground">{story.title_en}</p>}
                <StoryCard story={story} showEnglish={showEnglish} />
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function ITUserStoriesPage() {
  const { t, lang } = useTranslation();
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          {t('nav_it_deutsch')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Damit 'Can you maybe look into this?' endlich auf Deutsch genauso passiv-aggressiv klingt.
        </p>
      </div>
      <ITDeutschNav />

      <div className="flex items-center justify-end">
        <button
          onClick={() => setShowEnglish(!showEnglish)}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            showEnglish
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {showEnglish ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showEnglish ? 'EN aus' : 'EN ein'}
        </button>
      </div>

      <Tabs defaultValue={USER_STORY_DOMAINS[0].id}>
        <ScrollNav>
          <TabsList className={PILL_CONTAINER}>
            {USER_STORY_DOMAINS.map(d => (
              <TabsTrigger key={d.id} value={d.id} className={TAB_TRIGGER_FUCHSIA}>
                <span>{d.icon}</span> {d.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollNav>

        {USER_STORY_DOMAINS.map(domain => (
          <TabsContent key={domain.id} value={domain.id} className="mt-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              {lang === 'de' ? domain.description_de : domain.description_en}
            </p>
            {domain.stories.map(story => (
              <div key={story.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">{story.title_de}</h3>
                {showEnglish && <p className="text-xs text-muted-foreground">{story.title_en}</p>}
                <StoryCard story={story} showEnglish={showEnglish} />
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
