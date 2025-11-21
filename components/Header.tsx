import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, Film, Award, Home, Tv, Music, PartyPopper, BookOpen, Info, Star, Menu } from 'lucide-react';
import hillywoodLogo from '@/assets/hillywood-logo.svg';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AuthDialog from './AuthDialog';
import UserProfileDialog from './UserProfileDialog';
import { searchableContent } from '@/data/searchData';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hillypix-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('hillypix-user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('hillypix-user');
  };

  const filteredContent = searchableContent.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.language.toLowerCase().includes(query) ||
      item.genre.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  const handleSelectItem = (route: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(route);
  };

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center hover:opacity-80 theatre-transition">
            <img 
              src={hillywoodLogo} 
              alt="HillyWood" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/' ? 'text-golden' : ''}`}>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/premieres' ? 'text-golden' : ''}`}>
              <Link to="/premieres">
                <Film className="w-4 h-4 mr-2" />
                Movies
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/tv-series' ? 'text-golden' : ''}`}>
              <Link to="/tv-series">
                <Tv className="w-4 h-4 mr-2" />
                Series
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/music' ? 'text-golden' : ''}`}>
              <Link to="/music">
                <Music className="w-4 h-4 mr-2" />
                Music
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/hall-of-fame' ? 'text-golden' : ''}`}>
              <Link to="/hall-of-fame">
                <Award className="w-4 h-4 mr-2" />
                Hall of Fame
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/hillywood-fiesta' ? 'text-golden' : ''}`}>
              <Link to="/hillywood-fiesta">
                <PartyPopper className="w-4 h-4 mr-2" />
                Hillywood Fiesta
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/about' ? 'text-golden' : ''}`}>
              <Link to="/about">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-golden"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline text-xs">Search</span>
              <kbd className="hidden lg:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border border-border/30 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* My Library / Auth */}
            {user ? (
              <Button variant="outline" size="sm" asChild className="hidden sm:flex border-golden/30 text-golden hover:bg-golden/10">
                <Link to="/my-library">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Library ({user.purchasedMovies})
                </Link>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAuthDialogOpen(true)}
                className="hidden sm:flex border-golden/30 text-golden hover:bg-golden/10"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Profile */}
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsProfileDialogOpen(true)}
                className="text-muted-foreground hover:text-golden hidden md:flex"
              >
                <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-golden">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Button>
            ) : null}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden text-muted-foreground hover:text-golden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <SheetHeader>
                  <SheetTitle className="flex items-center">
                    <img 
                      src={hillywoodLogo} 
                      alt="HillyWood" 
                      className="h-8 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 mt-8">
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/">
                      <Home className="w-4 h-4 mr-3" />
                      Home
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/premieres' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/premieres">
                      <Film className="w-4 h-4 mr-3" />
                      Movies
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/tv-series' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/tv-series">
                      <Tv className="w-4 h-4 mr-3" />
                      Series
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/music' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/music">
                      <Music className="w-4 h-4 mr-3" />
                      Music
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/hall-of-fame' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/hall-of-fame">
                      <Award className="w-4 h-4 mr-3" />
                      Hall of Fame
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/hillywood-fiesta' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/hillywood-fiesta">
                      <PartyPopper className="w-4 h-4 mr-3" />
                      Hillywood Fiesta
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className={`justify-start text-foreground hover:text-golden theatre-transition ${location.pathname === '/about' ? 'text-golden bg-golden/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/about">
                      <Info className="w-4 h-4 mr-3" />
                      About
                    </Link>
                  </Button>

                  {/* Mobile User Actions */}
                  <div className="pt-6 border-t border-border/20 mt-6 space-y-2">
                    {user ? (
                      <>
                        <Button 
                          variant="ghost" 
                          asChild 
                          className="justify-start w-full border-golden/30 text-golden hover:bg-golden/10"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link to="/my-library">
                            <BookOpen className="w-4 h-4 mr-3" />
                            My Library ({user.purchasedMovies})
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsProfileDialogOpen(true);
                          }}
                          className="justify-start w-full text-muted-foreground hover:text-golden"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsAuthDialogOpen(true);
                        }}
                        className="w-full border-golden/30 text-golden hover:bg-golden/10"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Auth Dialog */}
        <AuthDialog 
          open={isAuthDialogOpen}
          onOpenChange={setIsAuthDialogOpen}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Profile Dialog */}
        {user && (
          <UserProfileDialog 
            open={isProfileDialogOpen}
            onOpenChange={setIsProfileDialogOpen}
            user={user}
            onSignOut={handleSignOut}
          />
        )}

        {/* Search Command Dialog */}
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <CommandInput 
            placeholder="Search movies, series, music, languages..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {filteredContent.length > 0 && (
              <>
                {['movie', 'series', 'music'].map((type) => {
                  const items = filteredContent.filter((item) => item.type === type);
                  if (items.length === 0) return null;
                  
                  return (
                    <CommandGroup 
                      key={type} 
                      heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                    >
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={`${item.title}-${item.language}-${item.genre}`}
                          onSelect={() => handleSelectItem(item.route)}
                          className="flex items-center gap-3 py-3 cursor-pointer"
                        >
                          <img 
                            src={item.poster} 
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{item.title}</p>
                              <Badge variant="secondary" className="text-xs">
                                {item.language}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{item.genre}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{item.year}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="flex items-center gap-1 text-xs text-golden">
                                <Star className="w-3 h-3 fill-golden" />
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </>
            )}
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
};

export default Header;