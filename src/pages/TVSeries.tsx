import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Lock, Star, Clock, BookmarkPlus, BookmarkCheck, ChevronRight } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import TicketPurchaseDialog from '@/components/TicketPurchaseDialog';
import Footer from '@/components/Footer';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster4 from '@/assets/movie-poster-4.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';
import moviePoster6 from '@/assets/movie-poster-6.jpg';

const tvSeriesData = [
  {
    id: 1,
    title: "Duipeng Thang Tei",
    state: "Manipur",
    language: "Rongmei",
    poster: moviePoster1,
    rating: 5.0,
    year: 2021,
    genre: "Horror",
    totalSeasons: 1,
    totalEpisodes: 8,
    duration: "45 min per episode",
    description: "A spine-chilling horror series exploring supernatural folklore of the Rongmei people.",
    episodes: [
      { id: 1, title: "The Beginning", duration: "45:00", isFree: true, season: 1, episodeNumber: 1 },
      { id: 2, title: "The Haunting", duration: "47:30", isFree: false, season: 1, episodeNumber: 2 },
      { id: 3, title: "Dark Secrets", duration: "46:15", isFree: false, season: 1, episodeNumber: 3 },
      { id: 4, title: "The Ritual", duration: "48:00", isFree: false, season: 1, episodeNumber: 4 },
      { id: 5, title: "Shadows", duration: "44:30", isFree: false, season: 1, episodeNumber: 5 },
      { id: 6, title: "The Truth", duration: "46:45", isFree: false, season: 1, episodeNumber: 6 },
      { id: 7, title: "Confrontation", duration: "50:00", isFree: false, season: 1, episodeNumber: 7 },
      { id: 8, title: "Resolution", duration: "52:00", isFree: false, season: 1, episodeNumber: 8 },
    ]
  },
  {
    id: 2,
    title: "Ngaan Santanpou",
    state: "Manipur",
    language: "Tangkhul",
    poster: moviePoster2,
    rating: 4.5,
    year: 2025,
    genre: "Romance",
    totalSeasons: 1,
    totalEpisodes: 12,
    duration: "40 min per episode",
    description: "A heartwarming romance set in the hills of Manipur, celebrating traditional Tangkhul culture.",
    episodes: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "40:00",
      isFree: i === 0,
      season: 1,
      episodeNumber: i + 1
    }))
  },
  {
    id: 3,
    title: "Cultural Chronicles",
    state: "Assam",
    language: "Assamese",
    poster: moviePoster3,
    rating: 4.8,
    year: 2024,
    genre: "Documentary",
    totalSeasons: 2,
    totalEpisodes: 20,
    duration: "35 min per episode",
    description: "Exploring the rich cultural heritage, traditions, and stories of Northeast India.",
    episodes: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Season 1 - Episode ${i + 1}`,
      duration: "35:00",
      isFree: i === 0,
      season: 1,
      episodeNumber: i + 1
    }))
  },
  {
    id: 4,
    title: "Cathy",
    state: "Manipur",
    language: "Rongmei",
    poster: moviePoster4,
    rating: 4.7,
    year: 2025,
    genre: "Romance",
    totalSeasons: 1,
    totalEpisodes: 10,
    duration: "42 min per episode",
    description: "A modern love story intertwined with traditional values and cultural identity.",
    episodes: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "42:00",
      isFree: i === 0,
      season: 1,
      episodeNumber: i + 1
    }))
  },
  {
    id: 5,
    title: "Kiman Bhi Bhal",
    state: "Nagaland",
    language: "Nagamese",
    poster: moviePoster5,
    rating: 4.7,
    year: 2022,
    genre: "Classical",
    totalSeasons: 1,
    totalEpisodes: 6,
    duration: "50 min per episode",
    description: "A classical drama series showcasing the artistic traditions of Nagaland.",
    episodes: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      duration: "50:00",
      isFree: i === 0,
      season: 1,
      episodeNumber: i + 1
    }))
  },
  {
    id: 6,
    title: "Hills of Mystery",
    state: "Meghalaya",
    language: "Khasi",
    poster: moviePoster6,
    rating: 4.6,
    year: 2023,
    genre: "Thriller",
    totalSeasons: 2,
    totalEpisodes: 16,
    duration: "45 min per episode",
    description: "A gripping thriller series exploring mysterious events in the hills of Meghalaya.",
    episodes: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Season 1 - Episode ${i + 1}`,
      duration: "45:00",
      isFree: i === 0,
      season: 1,
      episodeNumber: i + 1
    }))
  },
];

const TVSeries = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState<any>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [expandedSeries, setExpandedSeries] = useState<number | null>(null);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { getContinueWatching, getProgress } = useWatchProgress();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleWatchlistToggle = (series: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist(series.id)) {
      removeFromWatchlist(series.id);
      toast({
        title: "Removed from Watchlist",
        description: `${series.title} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist({
        id: series.id,
        title: series.title,
        poster: series.poster,
        rating: series.rating,
        duration: series.duration,
        language: series.language,
        genre: series.genre
      });
      toast({
        title: "Added to Watchlist",
        description: `${series.title} has been added to your watchlist.`,
      });
    }
  };

  const handleBuySeries = (series: any) => {
    setSelectedSeries(series);
    setIsTicketDialogOpen(true);
  };

  const handlePlayEpisode = (series: any, episode: any) => {
    if (episode.isFree) {
      toast({
        title: "Playing Free Episode",
        description: `Enjoy ${series.title} - ${episode.title}`,
      });
    } else {
      toast({
        title: "Purchase Required",
        description: "Buy the full series to unlock this episode.",
        variant: "destructive",
      });
      handleBuySeries(series);
    }
  };

  const continueWatching = getContinueWatching();
  const filteredSeries = selectedTab === 'all' 
    ? tvSeriesData 
    : tvSeriesData.filter(s => s.genre.toLowerCase() === selectedTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center bg-gradient-to-b from-card-accent/20 to-background">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              📺 TV SERIES
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                Regional
              </span>
              <br />
              Web Series
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch episodic shows and web series from Northeast India. Watch the first episode free, 
              then buy individual episodes or the full series.
            </p>
          </div>
        </section>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <section className="py-16 px-6">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Continue Watching</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {continueWatching.map((progress) => {
                  const series = tvSeriesData.find(s => s.id === progress.seriesId);
                  const episode = series?.episodes.find(e => e.id === progress.episodeId);
                  if (!series || !episode) return null;

                  return (
                    <Card key={`${series.id}-${episode.id}`} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img 
                            src={series.poster} 
                            alt={series.title}
                            className="w-full h-48 object-cover group-hover:scale-105 theatre-transition"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                            <Button size="lg" className="bg-golden hover:bg-golden-dark text-black">
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </Button>
                          </div>
                          {/* Progress Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                            <div 
                              className="h-full bg-golden"
                              style={{ width: `${progress.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{series.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            S{episode.season}E{episode.episodeNumber} • {Math.round(progress.progress)}% watched
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Category Tabs */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'max-w-2xl mx-auto grid-cols-5'} bg-card-accent/50`}>
                <TabsTrigger value="all" className={isMobile ? 'text-xs' : ''}>All</TabsTrigger>
                <TabsTrigger value="horror" className={isMobile ? 'text-xs' : ''}>Horror</TabsTrigger>
                <TabsTrigger value="romance" className={isMobile ? 'text-xs' : ''}>Romance</TabsTrigger>
                {!isMobile && <TabsTrigger value="documentary">Documentary</TabsTrigger>}
                {!isMobile && <TabsTrigger value="thriller">Thriller</TabsTrigger>}
                {isMobile && <TabsTrigger value="documentary" className="text-xs">Doc</TabsTrigger>}
              </TabsList>
            </Tabs>

            {/* Series Grid */}
            <div className="space-y-8">
              {filteredSeries.map((series) => {
                const isExpanded = expandedSeries === series.id;
                const progress = getProgress(series.id, 1);

                return (
                  <Card key={series.id} className="bg-card-accent/30 border-border/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="md:flex">
                        {/* Series Poster */}
                        <div className="md:w-64 relative">
                          <img 
                            src={series.poster} 
                            alt={series.title}
                            className="w-full h-96 md:h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <Badge className="bg-golden text-black text-xs font-semibold">
                              S{series.totalSeasons}
                            </Badge>
                            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-golden fill-current" />
                              <span className="text-xs text-white font-medium">{series.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Series Info */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h2 className="text-2xl font-bold text-foreground mb-2">{series.title}</h2>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                                <Badge variant="secondary">{series.state}</Badge>
                                <span>{series.year}</span>
                                <span>•</span>
                                <span>{series.genre}</span>
                                <span>•</span>
                                <span>{series.language}</span>
                                <span>•</span>
                                <span>{series.totalEpisodes} Episodes</span>
                              </div>
                              <p className="text-muted-foreground mb-4 max-w-2xl">
                                {series.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => handleWatchlistToggle(series, e)}
                            >
                              {isInWatchlist(series.id) ? (
                                <BookmarkCheck className="w-5 h-5 text-golden" />
                              ) : (
                                <BookmarkPlus className="w-5 h-5" />
                              )}
                            </Button>
                          </div>

                          <div className="flex gap-3 mb-4">
                            <Button 
                              className="bg-golden text-black hover:bg-golden/90"
                              onClick={() => handlePlayEpisode(series, series.episodes[0])}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Watch Free Episode
                            </Button>
                            <Button 
                              variant="outline"
                              className="border-golden/30 text-golden hover:bg-golden/10"
                              onClick={() => handleBuySeries(series)}
                            >
                              Buy Full Series
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setExpandedSeries(isExpanded ? null : series.id)}
                            >
                              {isExpanded ? 'Hide' : 'Show'} Episodes
                              <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </Button>
                          </div>

                          {/* Episode List */}
                          {isExpanded && (
                            <div className="mt-6 space-y-2 max-h-96 overflow-y-auto">
                              {series.episodes.map((episode) => {
                                const episodeProgress = getProgress(series.id, episode.id);
                                
                                return (
                                  <div 
                                    key={episode.id}
                                    className="flex items-center gap-4 p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors cursor-pointer"
                                    onClick={() => handlePlayEpisode(series, episode)}
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-card-accent flex items-center justify-center">
                                      {episode.isFree ? (
                                        <Play className="w-4 h-4 text-golden" />
                                      ) : (
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-foreground">
                                          {episode.episodeNumber}. {episode.title}
                                        </span>
                                        {episode.isFree && (
                                          <Badge className="bg-golden/20 text-golden text-xs">FREE</Badge>
                                        )}
                                      </div>
                                      {episodeProgress && (
                                        <div className="mt-1 h-1 bg-card-accent rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-golden"
                                            style={{ width: `${episodeProgress.progress}%` }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="w-3 h-3" />
                                      {episode.duration}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ticket Purchase Dialog */}
        {selectedSeries && (
          <TicketPurchaseDialog 
            open={isTicketDialogOpen}
            onOpenChange={setIsTicketDialogOpen}
            movie={{
              title: selectedSeries.title,
              poster: selectedSeries.poster,
              rating: selectedSeries.rating,
              duration: `${selectedSeries.totalEpisodes} Episodes`,
              language: selectedSeries.language,
              state: selectedSeries.state
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TVSeries;
