import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, BookOpen, Filter, Star, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useToast } from '@/hooks/use-toast';
import TicketPurchaseDialog from './TicketPurchaseDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster4 from '@/assets/movie-poster-4.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';
import moviePoster6 from '@/assets/movie-poster-6.jpg';
const genres = [{
  id: 'all',
  name: 'All Genres',
  count: 127
}, {
  id: 'romance',
  name: 'Romance',
  count: 22,
  color: 'text-pink-400'
}, {
  id: 'comedy',
  name: 'Comedy',
  count: 28,
  color: 'text-yellow-400'
}, {
  id: 'action',
  name: 'Action',
  count: 35,
  color: 'text-red-400'
}, {
  id: 'horror',
  name: 'Horror',
  count: 15,
  color: 'text-purple-400'
}, {
  id: 'biopic',
  name: 'Stories from Life/Biopic',
  count: 18,
  color: 'text-green-400'
}, {
  id: 'drama',
  name: 'Drama',
  count: 25,
  color: 'text-blue-400'
}];
const categories = [{
  id: 'traditional',
  name: 'Traditional',
  icon: '🏛️'
}, {
  id: 'modern',
  name: 'Modern',
  icon: '🎬'
}, {
  id: 'documentary',
  name: 'Documentary',
  icon: '📽️'
}, {
  id: 'folk',
  name: 'Folk Tales',
  icon: '📚'
}];
const movies = [{
  id: 1,
  title: 'Ka Jainsen',
  genre: 'drama',
  category: 'traditional',
  poster: moviePoster1,
  rating: 4.8,
  year: 2023,
  language: 'Khasi',
  duration: '2h 15m',
  owned: true
}, {
  id: 2,
  title: 'Naga Rangtsa',
  genre: 'action',
  category: 'traditional',
  poster: moviePoster2,
  rating: 4.9,
  year: 2023,
  language: 'Ao Naga',
  duration: '2h 05m',
  owned: false
}, {
  id: 3,
  title: 'Puanchei',
  genre: 'romance',
  category: 'traditional',
  poster: moviePoster3,
  rating: 4.7,
  year: 2023,
  language: 'Mizo',
  duration: '1h 58m',
  owned: true
}, {
  id: 4,
  title: 'Himalayan Dreams',
  genre: 'drama',
  category: 'modern',
  poster: moviePoster4,
  rating: 4.5,
  year: 2024,
  language: 'Nepali',
  duration: '2h 10m',
  owned: false
}, {
  id: 5,
  title: 'Gamosa Tales',
  genre: 'comedy',
  category: 'modern',
  poster: moviePoster5,
  rating: 4.6,
  year: 2024,
  language: 'Assamese',
  duration: '1h 55m',
  owned: true
}, {
  id: 6,
  title: 'Raas Leela',
  genre: 'drama',
  category: 'folk',
  poster: moviePoster6,
  rating: 4.8,
  year: 2023,
  language: 'Manipuri',
  duration: '2h 20m',
  owned: false
},
// Additional movies for "Load More" functionality
{
  id: 7,
  title: 'Weaver\'s Song',
  genre: 'romance',
  category: 'traditional',
  poster: moviePoster1,
  rating: 4.4,
  year: 2023,
  language: 'Kokborok',
  duration: '1h 45m',
  owned: false
}, {
  id: 8,
  title: 'Mountain Echoes',
  genre: 'horror',
  category: 'traditional',
  poster: moviePoster2,
  rating: 4.6,
  year: 2024,
  language: 'Nyishi',
  duration: '2h 12m',
  owned: true
}, {
  id: 9,
  title: 'Digital Village',
  genre: 'comedy',
  category: 'modern',
  poster: moviePoster3,
  rating: 4.3,
  year: 2024,
  language: 'Assamese',
  duration: '1h 48m',
  owned: false
}, {
  id: 10,
  title: 'Urban Legends',
  genre: 'horror',
  category: 'modern',
  poster: moviePoster4,
  rating: 4.7,
  year: 2024,
  language: 'Manipuri',
  duration: '2h 05m',
  owned: true
}, {
  id: 11,
  title: 'Tech Dreams',
  genre: 'action',
  category: 'modern',
  poster: moviePoster5,
  rating: 4.2,
  year: 2024,
  language: 'Nepali',
  duration: '1h 52m',
  owned: false
}, {
  id: 12,
  title: 'Sacred Groves',
  genre: 'biopic',
  category: 'documentary',
  poster: moviePoster6,
  rating: 4.9,
  year: 2023,
  language: 'Khasi',
  duration: '1h 38m',
  owned: true
}, {
  id: 13,
  title: 'Hunter\'s Tale',
  genre: 'action',
  category: 'folk',
  poster: moviePoster1,
  rating: 4.5,
  year: 2023,
  language: 'Sema Naga',
  duration: '1h 55m',
  owned: false
}, {
  id: 14,
  title: 'Bamboo Forest',
  genre: 'biopic',
  category: 'documentary',
  poster: moviePoster2,
  rating: 4.6,
  year: 2024,
  language: 'Mizo',
  duration: '1h 42m',
  owned: true
}, {
  id: 15,
  title: 'Royal Heritage',
  genre: 'drama',
  category: 'documentary',
  poster: moviePoster3,
  rating: 4.4,
  year: 2023,
  language: 'Bengali',
  duration: '2h 15m',
  owned: false
}, {
  id: 16,
  title: 'Spirit Dance',
  genre: 'horror',
  category: 'folk',
  poster: moviePoster4,
  rating: 4.8,
  year: 2024,
  language: 'Apatani',
  duration: '1h 48m',
  owned: true
}, {
  id: 17,
  title: 'City Lights',
  genre: 'romance',
  category: 'modern',
  poster: moviePoster5,
  rating: 4.1,
  year: 2024,
  language: 'Assamese',
  duration: '1h 58m',
  owned: false
}, {
  id: 18,
  title: 'Love in Hills',
  genre: 'romance',
  category: 'modern',
  poster: moviePoster6,
  rating: 4.5,
  year: 2024,
  language: 'Nepali',
  duration: '2h 08m',
  owned: true
}];
const CulturalLibrary = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('traditional');
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useWatchlist();
  const {
    toast
  } = useToast();
  const handleBuyTicket = (movie: any) => {
    setSelectedMovie(movie);
    setIsTicketDialogOpen(true);
  };
  const handleWatchlistToggle = (movie: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast({
        title: "Removed from Watchlist",
        description: `${movie.title} has been removed from your watchlist.`
      });
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        duration: movie.duration,
        language: movie.language,
        genre: genres.find(g => g.id === movie.genre)?.name || movie.genre
      });
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} has been added to your watchlist.`
      });
    }
  };
  const filteredMovies = movies.filter(movie => (selectedGenre === 'all' || movie.genre === selectedGenre) && movie.category === selectedCategory);
  const displayedMovies = filteredMovies.slice(0, visibleMovies);
  const hasMoreMovies = visibleMovies < filteredMovies.length;
  const handleLoadMore = () => {
    setVisibleMovies(prev => prev + 6);
  };

  // Reset visible movies when filters change
  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    setVisibleMovies(6);
  };
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleMovies(6);
  };
  return <section className="py-20 px-6 bg-gradient-to-b from-background to-card-accent/20" data-section="cultural-library">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
            📚 CULTURAL LIBRARY
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
              North East India.
            </span>
            <br />
            Untold Stories Awaits The World
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our vast collection of Music and Films from North East India. Each preserving unique cultural heritage and traditions the world has never seen</p>
        </div>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Filter className="w-5 h-5 mr-2 text-golden" />
              Filter by Genre
            </h3>
          </div>
          <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-3'}`}>
            {genres.map(genre => <Button key={genre.id} variant={selectedGenre === genre.id ? "default" : "outline"} onClick={() => handleGenreChange(genre.id)} className={`
                  ${selectedGenre === genre.id ? 'theatre-gradient text-white' : 'border-border/30 hover:border-golden/30'} theatre-transition
                  ${isMobile ? 'text-xs px-2 h-auto py-2' : ''}
                `}>
                <span className={selectedGenre !== genre.id ? genre.color : ''}>{isMobile && genre.id !== 'all' ? genre.name.split('/')[0] : genre.name}</span>
                {!isMobile && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {genre.count}
                  </Badge>
                )}
              </Button>)}
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-8">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} bg-card-accent/50`}>
            {categories.map(category => <TabsTrigger key={category.id} value={category.id} className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${isMobile ? 'text-xs px-2' : ''}`}>
                <span className={isMobile ? 'text-base' : 'mr-2'}>{category.icon}</span>
                {!isMobile && category.name}
                {isMobile && category.id === 'documentary' && <span className="ml-1 text-xs">Doc</span>}
                {isMobile && category.id === 'folk' && <span className="ml-1 text-xs">Folk</span>}
              </TabsTrigger>)}
          </TabsList>

          {categories.map(category => <TabsContent key={category.id} value={category.id} className="mt-8">
              <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}`}>
                {displayedMovies.map(movie => <Card key={movie.id} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover">
                    <CardContent className="p-0">
                      {/* Movie Poster */}
                      <div className="relative overflow-hidden">
                        <img src={movie.poster} alt={movie.title} className={`w-full ${isMobile ? 'h-36' : 'h-64'} object-cover group-hover:scale-105 theatre-transition`} />
                        
                        {/* Overlay Info - Hide most on mobile */}
                        {!isMobile && (
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <div className="flex gap-2">
                              {movie.owned && <Badge className="bg-golden text-black text-xs font-semibold">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  Owned
                                </Badge>}
                              <Button size="sm" variant="secondary" className="h-6 px-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 border-none" onClick={e => handleWatchlistToggle(movie, e)}>
                                {isInWatchlist(movie.id) ? <BookmarkCheck className="w-3 h-3 text-golden" /> : <BookmarkPlus className="w-3 h-3 text-white" />}
                              </Button>
                            </div>
                            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-golden fill-current" />
                              <span className="text-xs text-white font-medium">{movie.rating}</span>
                            </div>
                          </div>
                        )}

                        {/* Mobile: Show only rating */}
                        {isMobile && (
                          <div className="absolute top-1 right-1">
                            <div className="flex items-center space-x-0.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                              <Star className="w-2.5 h-2.5 text-golden fill-current" />
                              <span className="text-[10px] text-white font-medium">{movie.rating}</span>
                            </div>
                          </div>
                        )}

                        {/* Play Button Overlay - Desktop only */}
                        {!isMobile && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                            <Button size="lg" className={movie.owned ? 'bg-golden hover:bg-golden-dark text-black' : 'theatre-gradient text-white'} onClick={() => movie.owned ? null : handleBuyTicket(movie)}>
                              <Play className="w-4 h-4 mr-2" />
                              {movie.owned ? 'Watch Now' : 'Buy Ticket'}
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Movie Details */}
                      <div className={isMobile ? 'p-1.5' : 'p-4'}>
                        {isMobile ? (
                          // Compact mobile view
                          <>
                            <h3 className="text-[10px] font-semibold text-foreground line-clamp-1 mb-0.5">
                              {movie.title}
                            </h3>
                            <p className="text-[8px] text-muted-foreground line-clamp-1">
                              {movie.duration}
                            </p>
                          </>
                        ) : (
                          // Full desktop view
                          <>
                            <h3 className="font-bold text-foreground mb-1 line-clamp-1">{movie.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              {movie.language} • {movie.year} • {movie.duration}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {genres.find(g => g.id === movie.genre)?.name}
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>)}
        </Tabs>

        {/* Load More */}
        {hasMoreMovies && <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={handleLoadMore} className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3">
              Load More Films ({filteredMovies.length - visibleMovies} remaining)
            </Button>
          </div>}
        
        {!hasMoreMovies && filteredMovies.length > 6 && <div className="text-center mt-12">
            <p className="text-muted-foreground">You've seen all films in this category</p>
          </div>}
        
        {/* Ticket Purchase Dialog */}
        {selectedMovie && <TicketPurchaseDialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen} movie={selectedMovie} />}
      </div>
    </section>;
};
export default CulturalLibrary;