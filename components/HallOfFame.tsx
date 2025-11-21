import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Star, Trophy, Users, Film, Crown } from 'lucide-react';
import NominationDialog from './NominationDialog';
const awardCategories = [{
  id: 'lifetime',
  title: 'Lifetime Achievement',
  icon: Crown,
  color: 'golden',
  recipients: [{
    name: 'Dr. Bhabendra Nath Saikia',
    state: 'Assam',
    achievement: 'Pioneer of Assamese Cinema',
    films: 15,
    years: '1975-2003',
    quote: 'Cinema is the mirror of society',
    awards: 'National Film Award, Padma Shri'
  }, {
    name: 'Jahnu Barua',
    state: 'Assam',
    achievement: 'Master of Neorealism',
    films: 18,
    years: '1982-2023',
    quote: 'Stories from the heart of Northeast',
    awards: 'Multiple National Awards'
  }]
}, {
  id: 'directors',
  title: 'Visionary Directors',
  icon: Film,
  color: 'primary',
  recipients: [{
    name: 'Aribam Syam Sharma',
    state: 'Manipur',
    achievement: 'Master of Manipuri Cinema',
    films: 12,
    years: '1985-2023',
    quote: 'Preserving culture through frames',
    awards: 'Padma Shri, National Awards'
  }, {
    name: 'Pradip Kurbah',
    state: 'Meghalaya',
    achievement: 'Contemporary Storytelling',
    films: 8,
    years: '2010-2023',
    quote: 'Modern voices, timeless stories',
    awards: 'Multiple Festival Awards'
  }, {
    name: 'Rima Das',
    state: 'Assam',
    achievement: 'Independent Cinema Pioneer',
    films: 5,
    years: '2017-2023',
    quote: 'Village tales for the world',
    awards: 'National Award, International Recognition'
  }]
}, {
  id: 'actors',
  title: 'Celebrated Performers',
  icon: Users,
  color: 'golden',
  recipients: [{
    name: 'Seema Biswas',
    state: 'Assam',
    achievement: 'National Award Winner',
    films: 25,
    years: '1990-2023',
    quote: 'Every role is a new journey',
    awards: 'National Film Award, Sangeet Natak Akademi'
  }, {
    name: 'Adil Hussain',
    state: 'Assam',
    achievement: 'International Cinema Icon',
    films: 40,
    years: '2000-2023',
    quote: 'From Assam to the world stage',
    awards: 'Multiple International Awards'
  }, {
    name: 'Danny Denzongpa',
    state: 'Sikkim',
    achievement: 'Legendary Character Artist',
    films: 190,
    years: '1971-2023',
    quote: 'A lifetime in cinema',
    awards: 'Filmfare Lifetime Achievement'
  }]
}];
const milestones = [{
  year: '2023',
  title: 'HillyWood Movement Launch',
  description: 'HillyPix launched as the first dedicated platform for Northeast Indian cinema, bringing together eight states under one cultural umbrella',
  icon: Trophy,
  highlight: true,
  impact: '10,000+ films catalogued'
}, {
  year: '2017',
  title: 'Village Rockstars Global Success',
  description: 'Rima Das\'s film became India\'s official Oscar entry, putting Assamese cinema on the world map',
  icon: Star,
  impact: '93 festivals, 25+ awards'
}, {
  year: '2011',
  title: 'Haanduk Film Revolution',
  description: 'Pradip Kurbah\'s groundbreaking Khasi language film opened doors for regional language cinema',
  icon: Film,
  impact: 'First Khasi film at MAMI'
}, {
  year: '2000',
  title: 'Digital Renaissance Begins',
  description: 'Northeast filmmakers embrace digital technology, democratizing film production across the region',
  icon: Award,
  impact: '300% increase in productions'
}];
const HallOfFame = () => {
  const [isNominationOpen, setIsNominationOpen] = useState(false);
  return <section className="py-20 px-6 bg-gradient-to-b from-card-accent/20 to-background">
      <div className="container mx-auto">
        {/* Section Header */}
        

        {/* Award Categories */}
        <div className="mb-20">
          {awardCategories.map((category, categoryIndex) => <div key={category.id} className="mb-16">
              {/* Category Header with Theatre Curtain Effect */}
              <div className="flex items-center justify-center mb-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-golden/5 to-transparent h-px top-1/2"></div>
                <div className="flex items-center space-x-4 bg-background px-6 py-3 rounded-full border border-golden/20 relative z-10 theatre-shadow">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color === 'golden' ? 'from-golden/30 to-golden/10' : 'from-primary/30 to-primary/10'} flex items-center justify-center backdrop-blur-sm`}>
                    <category.icon className={`w-7 h-7 ${category.color === 'golden' ? 'text-golden' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-3xl font-anton bg-gradient-to-r from-golden to-primary bg-clip-text text-transparent">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.recipients.map((recipient, recipientIndex) => <Card key={recipientIndex} className="bg-gradient-to-br from-card-accent/60 to-card-accent/20 border-border/30 hover:border-golden/60 theatre-transition group overflow-hidden relative">
                    {/* Spotlight Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-golden/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 theatre-transition"></div>
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Avatar with Layered Circles */}
                      <div className="relative mb-6 flex justify-center">
                        <div className="relative">
                          {/* Outer rotating ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-golden via-primary to-golden opacity-20 blur-md animate-pulse"></div>
                          
                          {/* Main avatar circle */}
                          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-golden/30 to-primary/30 flex items-center justify-center group-hover:scale-110 theatre-transition backdrop-blur-sm border-2 border-golden/20">
                            <div className="w-20 h-20 bg-gradient-to-br from-golden/40 to-primary/40 rounded-full flex items-center justify-center">
                              <Award className="w-10 h-10 text-golden" />
                            </div>
                          </div>
                          
                          {/* Award badge */}
                          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center border-2 border-background shadow-lg">
                            <Star className="w-4 h-4 text-primary-foreground fill-current" />
                          </div>
                        </div>
                      </div>

                      {/* Name and State */}
                      <div className="text-center mb-4">
                        <h4 className="text-2xl font-spartan font-bold text-foreground mb-2 group-hover:text-golden theatre-transition">
                          {recipient.name}
                        </h4>
                        <Badge className="bg-primary/20 text-primary border border-primary/30 mb-3">
                          {recipient.state}
                        </Badge>
                      </div>

                      {/* Achievement & Quote */}
                      <div className="text-center mb-4">
                        <p className="text-sm text-golden font-semibold mb-3 font-inter">{recipient.achievement}</p>
                        <p className="text-xs italic text-muted-foreground border-l-2 border-golden/30 pl-3 mb-3 font-playfair">
                          "{recipient.quote}"
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{recipient.films}</div>
                          <div className="text-xs text-muted-foreground">Films</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold text-foreground">{recipient.years}</div>
                          <div className="text-xs text-muted-foreground">Active Years</div>
                        </div>
                      </div>

                      {/* Awards */}
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <div className="text-xs text-center">
                          <div className="text-golden font-semibold mb-1">🏆 Awards</div>
                          <div className="text-muted-foreground">{recipient.awards}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>)}
        </div>

        {/* Call to Action - Enhanced */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card-accent/60 via-card-accent/40 to-card-accent/20 p-12 rounded-2xl border border-golden/20 theatre-shadow">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-golden/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="inline-block p-4 bg-golden/10 rounded-full mb-4">
                <Trophy className="w-12 h-12 text-golden" />
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-anton mb-4">
              <span className="bg-gradient-to-r from-golden to-primary bg-clip-text text-transparent">
                Nominate Cultural Heroes
              </span>
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-merriweather">
              Know someone who deserves recognition for their contribution to Northeast Indian cinema? 
              Help us celebrate and preserve their legacy for generations to come.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-golden to-golden/80 hover:from-golden/90 hover:to-golden/70 text-black font-semibold px-8 py-6 text-lg golden-glow" onClick={() => setIsNominationOpen(true)}>
                <Award className="w-5 h-5 mr-2" />
                Submit Nomination
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg backdrop-blur-sm" asChild>
                <Link to="/all-honorees">
                  <Users className="w-5 h-5 mr-2" />
                  View All Honorees
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/30">
              <div>
                <div className="text-3xl font-bold text-golden mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Honorees</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">8</div>
                <div className="text-sm text-muted-foreground">States</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-golden mb-1">2000+</div>
                <div className="text-sm text-muted-foreground">Films</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nomination Dialog */}
        <NominationDialog open={isNominationOpen} onOpenChange={setIsNominationOpen} />
      </div>
    </section>;
};
export default HallOfFame;