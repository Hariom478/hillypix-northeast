import { useState, useEffect } from 'react';
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
import { getHomePage } from "@/lib/graphql";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthProvider";
import { getUser } from "@/lib/localAuth";

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

const CulturalLibrary = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('traditional');
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const navigate = useNavigate();
  // const { user, token, logout } = useAuth();
  const user = getUser();


  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useWatchlist(user?.id, 'movies');
  const {
    toast
  } = useToast();


  useEffect(() => {
    getHomePage(user?.id).then(data => {

      const fetchedLists = data?.getHomePage?.data?.list || [];

      // Filter lists jisme kam se kam ek listable ka title ho
      const filteredLists = fetchedLists.filter(list =>
        list.listable?.some(item => item?.title)
      );

      // Add "All" category at top
      const listsWithAll = [{ id: "all", name: "All" }, ...filteredLists];

      setLists(listsWithAll);

      // Collect all movies from every listable
      const mergedMovies = fetchedLists.flatMap(list =>
        list.listable
          ?.filter(item => item?.title)
          .map(item => item.title) || []
      );

      setAllMovies(mergedMovies);
      setSelectedListId("all");
      setMovies(mergedMovies);

    });
  }, []);

  const handleBuyTicket = (movie: any) => {
    setSelectedMovie(movie);
    // setIsTicketDialogOpen(true);
    navigate("/details", { state: { videos: movie } });
  };


  const handleWatchlist = (movie: any, e: React.MouseEvent) => {

    if (!user) {
      toast({ title: "Login Required", description: "Please login first." });
      // navigate("/login");
      return;
    }

    const updatedWatchStatus = movie.is_user_watched == 1 ? 0 : 1;

    // 🔥 Update local UI immediately
    setMovies(prev =>
      prev.map(item =>
        item.id === movie.id ? { ...item, is_user_watched: updatedWatchStatus } : item
      )
    );

    // Backend call (optional)
    if (updatedWatchStatus === 1) {
      addToWatchlist(movie);
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} added to your watchlist.`,
      });
    } else {
      removeFromWatchlist(movie.id);
      toast({
        title: "Removed from Watchlist",
        description: `${movie.title} removed from your watchlist.`,
      });
    }

    // e.stopPropagation();
    // if (video?.is_watchlist) {
    //   removeFromWatchlist(video?.id);
    //   toast({
    //     title: "Removed from Watchlist",
    //     description: `${video.title} has been removed from your watchlist.`,
    //   });
    //   fetchData(user?.id,selectedLanguage);
    // } else {
    //   addToWatchlist(video);
    //   toast({
    //     title: "Added to Watchlist",
    //     description: `${video.title} has been added to your watchlist.`,
    //   });
    //   fetchData(user?.id,selectedLanguage);
    // }
  };






  const filteredMovies = movies.filter(movie => (selectedGenre === 'all' || movie.genre === selectedGenre) && movie.category === selectedCategory);
  const displayedMovies = filteredMovies.slice(0, visibleMovies);
  const hasMoreMovies = visibleMovies < filteredMovies.length;
  const handleLoadMore = () => {
    setVisibleMovies(prev => prev + 6);
  };




  const handlePlay = (movie) => {
    const videos = movie;
    navigate("/details", { state: { videos } });
  };

  // Reset visible movies when filters change
  const handleGenreChange = (id) => {
    setSelectedListId(id);

    if (id === "all") {
      setMovies(allMovies);
      return;
    }

    const selectedList = lists.find(l => l.id === id);

    setMovies(
      selectedList?.listable
        ?.filter(item => item?.title)
        ?.map(item => item.title)
      || []
    );
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
      {/* <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Filter className="w-5 h-5 mr-2 text-golden" />
              Filter by Genre
            </h3>
          </div>
          <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-3'}`}>
            {lists.map(genre => <Button key={genre.id} variant={selectedGenre === genre.id ? "default" : "outline"} onClick={() => handleGenreChange(genre.id)} className={`
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
        </div> */}


      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Filter className="w-5 h-5 mr-2 text-golden" />
            Filter by Category
          </h3>
        </div>

        <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-3'}`}>
          {lists.map(listItem => (
            <Button
              key={listItem.id}
              variant={selectedListId === listItem.id ? "default" : "outline"}
              onClick={() => handleGenreChange(listItem.id)}
              className={` 
                ${selectedListId === listItem.id ? 'theatre-gradient text-white' : 'border-border/30 hover:border-golden/30'}
                theatre-transition
                ${isMobile ? 'text-xs px-2 h-auto py-2' : ''}
              `}
            >
              {listItem.name}

            
              {!isMobile && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {listItem.listable?.length || 'All'}
                </Badge>
              )}
            </Button>
          ))}
        </div>

      </div>

      {/* Category Tabs */}
      {/* Category Tabs */}

      <Tabs value={selectedListId} onValueChange={handleGenreChange} className="mb-8">

        {lists.map(list => (
          <TabsContent key={list.id} value={list.id} className="mt-8">


            <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}`}>

              {movies?.map(movie => (
                <Card
                  key={movie.id}
                  className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover"
                >
                  <CardContent className="p-0">

                    {/* Movie Poster */}
                    <div className="relative overflow-hidden">
                      <img
                        src={movie?.tv_portrait_image || movie?.tv_banner || movie?.tv_landscape_image}
                        alt={movie.title}
                        className={`w-full ${isMobile ? 'h-36' : 'h-64'} object-cover group-hover:scale-105 theatre-transition`}
                      />

                      {/* Desktop Buttons */}
                      {!isMobile && (
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">

                          <div className="flex gap-2">
                            {/* {movie?.is_title_rent_by_user == 1 && (
                              <Badge className="bg-golden text-black text-xs font-semibold">
                                Owned
                              </Badge>
                            )} */}
                          </div>
                          {movie?.rating_avg && (
                            <div className="flex items-center space-x-1 bg-black/60 px-2 py-1 rounded-full">
                              <Star className="w-4 h-4 text-golden fill-current" /> <span className="text-xs text-white">{movie?.rating_avg || "-"}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Play Button */}
                      {!isMobile && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                          <Button
                            size="lg"
                            className={movie?.is_title_rent_by_user == 1 ? "bg-golden text-black" : "theatre-gradient text-white"}
                            onClick={() => movie?.is_title_rent_by_user == 1 ? handlePlay(movie) : handleBuyTicket(movie)}
                          >
                            ▶ {movie?.is_title_rent_by_user == 1
                              ? "Watch"
                              : movie?.getpayperwatch
                                ? `Buy ₹${movie.getpayperwatch.amount}`
                                : null
                            }

                          </Button>

                        </div>
                      )}
                    </div>

                    {/* Movie Text */}
                    <div className={`flex items-end justify-between ${isMobile ? "p-1.5" : "p-4"}`}>
                      <div>
                        {isMobile ? (
                          <>
                            <h3 className="text-[10px] font-semibold line-clamp-1">{movie.title}</h3>
                            <p className="text-[8px]">{movie.runtime || movie.language}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="font-bold text-md mb-1 line-clamp-1">{movie.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              {movie.language} • {movie.type}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {movie.genres || "General"}
                            </Badge>


                          </>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`border-golden/30 transition ${movie?.is_user_watched == 1 ? "bg-golden/10" : ""
                          }`}
                        onClick={(e) => handleWatchlist(movie, e)}
                      >
                        {movie?.is_user_watched == 1 ? (
                          <BookmarkCheck className="w-3 h-3 text-golden" />
                        ) : (
                          <BookmarkPlus className="w-3 h-3" />
                        )}
                      </Button>
                    </div>



                  </CardContent>
                </Card>
              ))}

            </div>

          </TabsContent>
        ))}

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