import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Star, Trophy, Users, Film, Crown, Search, Filter } from 'lucide-react';
import Footer from '@/components/Footer';

const allHonorees = [
  {
    id: 1,
    name: 'Dr. Bhabendra Nath Saikia',
    state: 'Assam',
    category: 'Lifetime Achievement',
    achievement: 'Pioneer of Assamese Cinema',
    films: 15,
    years: '1975-2003',
    description: 'Revolutionized Assamese cinema with socially conscious filmmaking and powerful storytelling.',
    icon: Crown,
    color: 'golden'
  },
  {
    id: 2,
    name: 'Aribam Syam Sharma',
    state: 'Manipur',
    category: 'Outstanding Directors',
    achievement: 'Master of Manipuri Cinema',
    films: 12,
    years: '1985-2023',
    description: 'Created internationally acclaimed films that brought Manipuri cinema to global recognition.',
    icon: Film,
    color: 'primary'
  },
  {
    id: 3,
    name: 'Pradip Kurbah',
    state: 'Meghalaya',
    category: 'Outstanding Directors',
    achievement: 'Contemporary Storytelling',
    films: 8,
    years: '2010-2023',
    description: 'Modern filmmaker bridging traditional Khasi culture with contemporary cinema.',
    icon: Film,
    color: 'primary'
  },
  {
    id: 4,
    name: 'Seema Biswas',
    state: 'Assam',
    category: 'Celebrated Performers',
    achievement: 'National Award Winner',
    films: 25,
    years: '1990-2023',
    description: 'Versatile actress known for powerful performances in both regional and national cinema.',
    icon: Users,
    color: 'golden'
  },
  {
    id: 5,
    name: 'Kaushik Ganguly',
    state: 'Tripura',
    category: 'Celebrated Performers',
    achievement: 'Versatile Actor-Director',
    films: 18,
    years: '2005-2023',
    description: 'Multi-talented artist who excels both in front of and behind the camera.',
    icon: Users,
    color: 'golden'
  },
  {
    id: 6,
    name: 'Oinam Doren',
    state: 'Manipur',
    category: 'Rising Star',
    achievement: 'New Generation Filmmaker',
    films: 5,
    years: '2020-2023',
    description: 'Young director bringing fresh perspectives to Manipuri cinema.',
    icon: Star,
    color: 'primary'
  },
  {
    id: 7,
    name: 'Donkupar Roy',
    state: 'Meghalaya',
    category: 'Celebrating NorthEast Culture',
    achievement: 'Folk Tale Documentarian',
    films: 10,
    years: '2015-2023',
    description: 'Dedicated to preserving Khasi oral traditions through documentary filmmaking.',
    icon: Trophy,
    color: 'golden'
  },
  {
    id: 8,
    name: 'Rima Das',
    state: 'Assam',
    category: 'Technical Excellence',
    achievement: 'Independent Filmmaker',
    films: 6,
    years: '2017-2023',
    description: 'Self-taught filmmaker who handles multiple technical aspects of film production.',
    icon: Film,
    color: 'primary'
  }
];

const categories = ['All Categories', 'Lifetime Achievement', 'Outstanding Directors', 'Celebrated Performers', 'Rising Star', 'Celebrating NorthEast Culture', 'Technical Excellence'];
const states = ['All States', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'];

const AllHonorees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedState, setSelectedState] = useState('All States');

  const filteredHonorees = allHonorees.filter(honoree => {
    const matchesSearch = honoree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         honoree.achievement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || honoree.category === selectedCategory;
    const matchesState = selectedState === 'All States' || honoree.state === selectedState;
    
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              🏆 COMPLETE DIRECTORY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                All Hall of Fame
              </span>
              <br />
              Honorees
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our complete directory of honored individuals who have shaped 
              Northeast Indian cinema and cultural heritage.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-6">
          <div className="container mx-auto">
            <div className="bg-card-accent/30 rounded-xl p-6 border border-border/20 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-golden" />
                <h3 className="text-lg font-semibold text-foreground">Filter Honorees</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or achievement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background/50 border-border/30 focus:border-golden/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="bg-background/50 border-border/30 focus:border-golden/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredHonorees.length} of {allHonorees.length} honorees
              </div>
            </div>
          </div>
        </section>

        {/* Honorees Grid */}
        <section className="py-8 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHonorees.map((honoree) => (
                <Card 
                  key={honoree.id}
                  className="bg-card-accent/40 border-border/30 hover:border-golden/50 theatre-transition group h-full"
                >
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    {/* Icon and Badge */}
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 mx-auto bg-gradient-to-br from-${honoree.color}/20 to-primary/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 theatre-transition`}>
                        <div className={`w-14 h-14 bg-${honoree.color}/30 rounded-full flex items-center justify-center`}>
                          <honoree.icon className={`w-7 h-7 text-${honoree.color}`} />
                        </div>
                      </div>
                      <Badge className={`bg-${honoree.color}/20 text-${honoree.color} text-xs`}>
                        {honoree.category}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-foreground mb-2">{honoree.name}</h3>
                      <Badge variant="secondary" className="mx-auto mb-3 text-xs">
                        {honoree.state}
                      </Badge>
                      <p className="text-sm text-golden font-semibold mb-3">{honoree.achievement}</p>
                      <p className="text-xs text-muted-foreground mb-4 flex-1">
                        {honoree.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="text-xs text-muted-foreground space-y-1 mt-auto">
                        <div className="flex justify-between">
                          <span>Films:</span>
                          <span className="font-medium">{honoree.films}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active:</span>
                          <span className="font-medium">{honoree.years}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredHonorees.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No honorees found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                    setSelectedState('All States');
                  }}
                  variant="outline" 
                  className="border-golden/50 text-golden hover:bg-golden/10"
                >
                  Clear Filters
                </Button>
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

export default AllHonorees;