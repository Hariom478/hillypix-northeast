import { useState } from 'react';
import Header from '@/components/Header';
import NowPremiering from '@/components/NowPremiering';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { requestNotificationPermission, scheduleReminder } from '@/utils/notifications';
import LearnMoreDialog from '@/components/LearnMoreDialog';
import Footer from '@/components/Footer';
const Premieres = () => {
  const [isLearnMoreDialogOpen, setIsLearnMoreDialogOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleSetReminder = async (premiereTitle: string, premiereDate: string) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      toast({
        title: "Notification Permission Denied",
        description: "Please enable notifications in your browser settings to receive reminders.",
        variant: "destructive"
      });
      return;
    }
    try {
      scheduleReminder(premiereTitle, premiereDate);
      toast({
        title: "Reminder Set!",
        description: `You'll receive a notification 1 hour before ${premiereTitle} premieres.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder. Please try again.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        

        {/* Now Premiering Section */}
        <NowPremiering />

        {/* Upcoming Premieres */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              title: "Legends of Arunachal",
              date: "Dec 15, 2024",
              fullDate: "2024-12-15T19:00:00",
              time: "7:00 PM IST",
              state: "Arunachal Pradesh",
              language: "Nyishi"
            }, {
              title: "Songs of Tripura",
              date: "Dec 22, 2024",
              fullDate: "2024-12-22T20:00:00",
              time: "8:00 PM IST",
              state: "Tripura",
              language: "Kokborok"
            }, {
              title: "Bamboo Dreams",
              date: "Dec 29, 2024",
              fullDate: "2024-12-29T19:30:00",
              time: "7:30 PM IST",
              state: "Mizoram",
              language: "Mizo"
            }].map((premiere, index) => <div key={index} className="bg-card-accent/30 rounded-xl p-6 border border-border/20 hover:border-golden/30 theatre-transition">
                  <h3 className="text-xl font-bold mb-3">{premiere.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-golden" />
                      {premiere.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-golden" />
                      {premiere.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-golden" />
                      {premiere.state}
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">{premiere.language}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" className="theatre-gradient text-white" onClick={() => handleSetReminder(premiere.title, premiere.fullDate)}>
                      Set Reminder
                    </Button>
                    <Button variant="outline" size="sm" className="border-golden/50 text-golden" onClick={() => setIsLearnMoreDialogOpen(true)}>
                      Learn More
                    </Button>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Learn More Dialog */}
        <LearnMoreDialog open={isLearnMoreDialogOpen} onOpenChange={setIsLearnMoreDialogOpen} topic="premiere" />
      </main>

      {/* Footer */}
      <Footer />
    </div>;
};
export default Premieres;