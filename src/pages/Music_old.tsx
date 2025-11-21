import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, TrendingUp, Sparkles, MapPin, Eye, Heart, Share2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useIsMobile } from '@/hooks/use-mobile';
import Footer from '@/components/Footer';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';
import moviePoster4 from '@/assets/movie-poster-4.jpg';
import moviePoster5 from '@/assets/movie-poster-5.jpg';
import moviePoster6 from '@/assets/movie-poster-6.jpg';

const musicVideos = [
  // Trending (Free - Ad Supported)
  { id: 1, title: "Kiman Bhi Bhal", artist: "Traditional Ensemble", state: "Nagaland", genre: "Classical", poster: moviePoster1, views: "125K", likes: "8.2K", isFree: true, price: 0, trending: true, new: false },
  { id: 2, title: "Hills Echo", artist: "Northeast Voices", state: "Meghalaya", genre: "Folk", poster: moviePoster2, views: "98K", likes: "6.5K", isFree: true, price: 0, trending: true, new: false },
  { id: 3, title: "Chamdan La Tho", artist: "Gospel Choir", state: "Manipur", genre: "Gospel", poster: moviePoster3, views: "156K", likes: "12K", isFree: true, price: 0, trending: true, new: false },
  
  // New Releases (Mix of Free and Paid)
  { id: 4, title: "Better Man", artist: "Jazz Fusion", state: "Assam", genre: "Jazz", poster: moviePoster4, views: "45K", likes: "3.8K", isFree: false, price: 29, trending: false, new: true },
  { id: 5, title: "Tuna", artist: "Pop Stars", state: "Mizoram", genre: "Pop", poster: moviePoster5, views: "78K", likes: "5.2K", isFree: true, price: 0, trending: false, new: true },
  { id: 6, title: "Mountain Melodies", artist: "Folk Ensemble", state: "Arunachal Pradesh", genre: "Traditional", poster: moviePoster6, views: "34K", likes: "2.9K", isFree: false, price: 39, trending: false, new: true },
  
  // Assam
  { id: 7, title: "Bihu Beats", artist: "Assamese Band", state: "Assam", genre: "Folk", poster: moviePoster1, views: "89K", likes: "7.1K", isFree: true, price: 0, trending: false, new: false },
  { id: 8, title: "Tea Garden Songs", artist: "Rural Artists", state: "Assam", genre: "Traditional", poster: moviePoster2, views: "52K", likes: "4.3K", isFree: false, price: 49, trending: false, new: true },
  
  // Manipur
  { id: 9, title: "Lai Haraoba", artist: "Manipuri Dancers", state: "Manipur", genre: "Classical", poster: moviePoster3, views: "67K", likes: "5.8K", isFree: true, price: 0, trending: false, new: false },
  { id: 10, title: "Valley Dreams", artist: "Modern Beats", state: "Manipur", genre: "Pop", poster: moviePoster4, views: "93K", likes: "8.4K", isFree: false, price: 39, trending: true, new: true },
  
  // Nagaland  
  { id: 11, title: "Hornbill Rhythms", artist: "Naga Warriors", state: "Nagaland", genre: "Traditional", poster: moviePoster5, views: "71K", likes: "6.2K", isFree: true, price: 0, trending: false, new: false },
  { id: 12, title: "Tribal Echoes", artist: "Contemporary Fusion", state: "Nagaland", genre: "Fusion", poster: moviePoster6, views: "44K", likes: "3.5K", isFree: false, price: 29, trending: false, new: true },
  
  // Meghalaya
  { id: 13, title: "Living Root", artist: "Khasi Voices", state: "Meghalaya", genre: "Folk", poster: moviePoster1, views: "58K", likes: "4.9K", isFree: true, price: 0, trending: false, new: false },
  
  // Mizoram
  { id: 14, title: "Bamboo Whispers", artist: "Mizo Artists", state: "Mizoram", genre: "Traditional", poster: moviePoster2, views: "39K", likes: "3.2K", isFree: true, price: 0, trending: false, new: false },
  
  // Tripura
  { id: 15, title: "Royal Heritage", artist: "Tripuri Ensemble", state: "Tripura", genre: "Classical", poster: moviePoster3, views: "42K", likes: "3.6K", isFree: false, price: 49, trending: false, new: true },
  
  // Sikkim
  { id: 16, title: "Himalayan Hymns", artist: "Mountain Voices", state: "Sikkim", genre: "Folk", poster: moviePoster4, views: "31K", likes: "2.7K", isFree: true, price: 0, trending: false, new: false },
];

const states = [
  { id: 'all', name: 'All States' },
  { id: 'Assam', name: 'Assam' },
  { id: 'Manipur', name: 'Manipur' },
  { id: 'Nagaland', name: 'Nagaland' },
  { id: 'Meghalaya', name: 'Meghalaya' },
  { id: 'Mizoram', name: 'Mizoram' },
  { id: 'Tripura', name: 'Tripura' },
  { id: 'Arunachal Pradesh', name: 'Arunachal Pradesh' },
  { id: 'Sikkim', name: 'Sikkim' },
];

const Music = () => {
  const [selectedTab, setSelectedTab] = useState('trending');
  const [selectedState, setSelectedState] = useState('all');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = (video: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist(video.id)) {
      removeFromWatchlist(video.id);
      toast({
        title: "Removed from Watchlist",
        description: `${video.title} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist(video);
      toast({
        title: "Added to Watchlist",
        description: `${video.title} has been added to your watchlist.`,
      });
    }
  };

  const handlePlayVideo = (video: any) => {
    if (video.isFree) {
      toast({
        title: "Playing Music Video",
        description: `Enjoy ${video.title} by ${video.artist} (Ad-supported)`,
      });
    } else {
      toast({
        title: "Premium Content",
        description: `Buy ${video.title} for ₹${video.price} to watch without ads.`,
      });
    }
  };

  const handleLike = (video: any) => {
    toast({
      title: "Liked!",
      description: `You liked ${video.title}`,
    });
  };

  const handleShare = async (video: any) => {
    const shareData = {
      title: video.title,
      text: `Check out ${video.title} by ${video.artist}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share this music video with friends.",
      });
    }
  };

  const getFilteredVideos = () => {
    let filtered = musicVideos;

    // Filter by tab
    if (selectedTab === 'trending') {
      filtered = filtered.filter(v => v.trending);
    } else if (selectedTab === 'new') {
      filtered = filtered.filter(v => v.new);
    } else if (selectedTab === 'state' && selectedState !== 'all') {
      filtered = filtered.filter(v => v.state === selectedState);
    }

    return filtered;
  };

  const filteredVideos = getFilteredVideos();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center bg-gradient-to-b from-card-accent/20 to-background">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              🎵 MUSIC VIDEOS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                North East India
              </span>
              <br />
              Showcasing the echoes from the hills and valleys
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and support North Eastern Artists. Experience the music of Northeast India or buy
              exclusive content for Rs. X. Each transaction directly supports the artists.
            </p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8 px-6 sticky top-16 bg-background/95 backdrop-blur-md z-40 border-b border-border/20">
          <div className="container mx-auto">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 bg-card-accent/50">
                <TabsTrigger value="trending" className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${isMobile ? 'text-xs px-2' : ''}`}>
                  <TrendingUp className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
                  {isMobile ? 'Trending' : 'Trending Music'}
                </TabsTrigger>
                <TabsTrigger value="new" className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${isMobile ? 'text-xs px-2' : ''}`}>
                  <Sparkles className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
                  {isMobile ? 'New' : 'New Releases'}
                </TabsTrigger>
                <TabsTrigger value="state" className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${isMobile ? 'text-xs px-2' : ''}`}>
                  <MapPin className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
                  {isMobile ? 'States' : 'Languages'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* State Filter (shown only in By State tab) */}
        {selectedTab === 'state' && (
          <section className="py-6 px-6 bg-card-accent/10">
            <div className="container mx-auto">
              <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-2 justify-center'}`}>
                {states.map((state) => (
                  <Button
                    key={state.id}
                    variant={selectedState === state.id ? "default" : "outline"}
                    onClick={() => setSelectedState(state.id)}
                    className={`${selectedState === state.id ? 'bg-golden text-black hover:bg-golden/90' : 'border-border/30'} ${isMobile ? 'text-xs px-2 h-auto py-2' : ''}`}
                  >
                    {state.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Music Videos Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}`}>
              {filteredVideos.map((video) => (
                <Card 
                  key={video.id}
                  className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.poster} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 theatre-transition"
                      />
                      
                      {/* Badges - Desktop only or minimal on mobile */}
                      {!isMobile && (
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          <div className="flex gap-2">
                            {video.isFree && (
                              <Badge className="bg-green-600 text-white text-xs">
                                FREE
                              </Badge>
                            )}
                            {!video.isFree && (
                              <Badge className="bg-golden text-black text-xs font-semibold">
                                ₹{video.price}
                              </Badge>
                            )}
                            {video.new && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                NEW
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Mobile: Show only price/free badge */}
                      {isMobile && (
                        <div className="absolute top-1 right-1">
                          {video.isFree ? (
                            <Badge className="bg-green-600 text-white text-[10px] px-1 py-0">FREE</Badge>
                          ) : (
                            <Badge className="bg-golden text-black text-[10px] px-1 py-0">₹{video.price}</Badge>
                          )}
                        </div>
                      )}

                      {/* Play Overlay - Desktop only */}
                      {!isMobile && (
                        <div 
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center cursor-pointer"
                          onClick={() => handlePlayVideo(video)}
                        >
                          <div className="w-16 h-16 rounded-full bg-golden flex items-center justify-center">
                            <Play className="w-8 h-8 text-black fill-black ml-1" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className={isMobile ? 'p-1.5' : 'p-4'}>
                      {isMobile ? (
                        // Compact mobile view
                        <>
                          <h3 className="text-[10px] font-semibold text-foreground line-clamp-1 mb-0.5">
                            {video.title}
                          </h3>
                          <p className="text-[8px] text-muted-foreground line-clamp-1">
                            {video.artist}
                          </p>
                        </>
                      ) : (
                        // Full desktop view
                        <>
                          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{video.artist}</p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {video.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {video.likes}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {video.state}
                            </Badge>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1 bg-golden text-black hover:bg-golden/90"
                              onClick={() => handlePlayVideo(video)}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              {video.isFree ? 'Watch' : 'Buy'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-golden/30"
                              onClick={(e) => handleWatchlistToggle(video, e)}
                            >
                              {isInWatchlist(video.id) ? (
                                <BookmarkCheck className="w-3 h-3 text-golden" />
                              ) : (
                                <BookmarkPlus className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No music videos found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Music;
