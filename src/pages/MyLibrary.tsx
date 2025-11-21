import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Star, Clock, Trash2 } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';

const myMovies = [
  {
    id: 1,
    title: 'Ka Jainsen',
    genre: 'Drama',
    poster: moviePoster1,
    rating: 4.8,
    duration: '2h 15m',
    language: 'Khasi',
    purchaseDate: 'Nov 15, 2024',
    watchTime: '45 mins watched'
  },
  {
    id: 3,
    title: 'Puanchei',
    genre: 'Romance', 
    poster: moviePoster3,
    rating: 4.7,
    duration: '1h 58m',
    language: 'Mizo',
    purchaseDate: 'Nov 10, 2024',
    watchTime: 'Completed'
  },
  {
    id: 5,
    title: 'Gamosa Tales',
    genre: 'Comedy',
    poster: moviePoster5,
    rating: 4.6,
    duration: '1h 55m', 
    language: 'Assamese',
    purchaseDate: 'Nov 5, 2024',
    watchTime: '1h 20m watched'
  }
];

const MyLibrary = () => {
  const [selectedTab, setSelectedTab] = useState('owned');
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRemoveFromWatchlist = (id: number, title: string) => {
    removeFromWatchlist(id);
    toast({
      title: "Removed from Watchlist",
      description: `${title} has been removed from your watchlist.`,
    });
  };

  const handleBrowseLibrary = () => {
    navigate('/');
    setTimeout(() => {
      const librarySection = document.querySelector('[data-section="cultural-library"]');
      if (librarySection) {
        librarySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              📖 MY LIBRARY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                Your Personal
              </span>
              <br />
              Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All your purchased films in one place. Watch anytime, anywhere, and support the HillyWood movement.
            </p>
          </div>
        </section>

        {/* Library Content */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card-accent/50">
                <TabsTrigger value="owned" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Owned ({myMovies.length})
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Watchlist ({watchlist.length})
                </TabsTrigger>
                <TabsTrigger value="bundles" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Bundles (1)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="owned" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {myMovies.map((movie) => (
                    <Card key={movie.id} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden">
                      <CardContent className="p-0">
                        {/* Movie Poster */}
                        <div className="relative overflow-hidden">
                          <img 
                            src={movie.poster} 
                            alt={movie.title}
                            className="w-full h-64 object-cover group-hover:scale-105 theatre-transition"
                          />
                          
                          {/* Watch Progress */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <Badge className="bg-golden text-black text-xs font-semibold">
                              Owned
                            </Badge>
                            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-golden fill-current" />
                              <span className="text-xs text-white font-medium">{movie.rating}</span>
                            </div>
                          </div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                            <Button size="lg" className="bg-golden hover:bg-golden-dark text-black">
                              <Play className="w-4 h-4 mr-2" />
                              {movie.watchTime === 'Completed' ? 'Watch Again' : 'Continue'}
                            </Button>
                          </div>
                        </div>

                        {/* Movie Details */}
                        <div className="p-4">
                          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{movie.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {movie.language} • {movie.duration}
                          </p>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {movie.genre}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {movie.watchTime}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="watchlist" className="mt-8">
                {watchlist.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Your watchlist is empty. Start exploring our library to add films!</p>
                    <Button 
                      className="mt-4 theatre-gradient text-white"
                      onClick={handleBrowseLibrary}
                    >
                      Browse Library
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {watchlist.map((movie) => (
                      <Card key={movie.id} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden">
                            <img 
                              src={movie.poster} 
                              alt={movie.title}
                              className="w-full h-64 object-cover group-hover:scale-105 theatre-transition"
                            />
                            
                            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                              <Badge className="bg-primary/80 text-primary-foreground text-xs">
                                Watchlist
                              </Badge>
                              <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                                <Star className="w-3 h-3 text-golden fill-current" />
                                <span className="text-xs text-white font-medium">{movie.rating}</span>
                              </div>
                            </div>

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                              <Button size="lg" className="theatre-gradient text-white">
                                <Play className="w-4 h-4 mr-2" />
                                Buy Ticket
                              </Button>
                            </div>
                          </div>

                          <div className="p-4">
                            <h3 className="font-bold text-foreground mb-1 line-clamp-1">{movie.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              {movie.language} • {movie.duration}
                            </p>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {movie.genre}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() => handleRemoveFromWatchlist(movie.id, movie.title)}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bundles" className="mt-8">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bundles purchased yet. Check out our cultural packs!</p>
                  <Button 
                    className="mt-4 theatre-gradient text-white"
                    onClick={handleBrowseLibrary}
                  >
                    View Bundles
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyLibrary;