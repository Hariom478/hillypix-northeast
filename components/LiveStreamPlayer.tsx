import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Radio, Clock, Users, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { requestNotificationPermission, scheduleReminder } from '@/utils/notifications';

interface LiveStreamPlayerProps {
  streamUrl?: string;
  isLive?: boolean;
  eventDate?: string;
  viewerCount?: number;
  onRegisterClick?: () => void;
}

const LiveStreamPlayer = ({ 
  streamUrl = '', 
  isLive = false, 
  eventDate = '2025-12-15T18:00:00',
  viewerCount = 0,
  onRegisterClick
}: LiveStreamPlayerProps) => {
  const [timeUntilEvent, setTimeUntilEvent] = useState('');
  const { toast } = useToast();

  const handleSetReminder = async () => {
    const hasPermission = await requestNotificationPermission();
    
    if (!hasPermission) {
      toast({
        title: "Notification Permission Denied",
        description: "Please enable notifications in your browser settings to receive reminders.",
        variant: "destructive",
      });
      return;
    }

    try {
      scheduleReminder("Hillywood Red Carpet Event", eventDate);
      toast({
        title: "Reminder Set!",
        description: "You'll receive a notification 1 hour before the event starts.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Hillywood Red Carpet Event',
      text: 'Watch the prestigious celebration of North East India\'s finest talents!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully!",
          description: "Thanks for spreading the word!",
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share this link with your friends and family.",
      });
    }
  };

  useEffect(() => {
    if (!isLive) {
      const calculateTimeUntil = () => {
        const now = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        const difference = eventTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeUntilEvent(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeUntilEvent('Event has started!');
        }
      };

      calculateTimeUntil();
      const interval = setInterval(calculateTimeUntil, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [isLive, eventDate]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="overflow-hidden bg-black border-golden/30">
        {/* Live Indicator */}
        {isLive && (
          <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <Badge className="bg-white text-red-600 font-bold">LIVE</Badge>
              <span className="text-white text-sm font-semibold">Hillywood Red Carpet Event</span>
            </div>
            {viewerCount > 0 && (
              <div className="flex items-center gap-2 text-white text-sm">
                <Users className="w-4 h-4" />
                <span>{viewerCount.toLocaleString()} watching</span>
              </div>
            )}
          </div>
        )}

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-background via-card-accent to-background">
          {isLive && streamUrl ? (
            <iframe
              src={streamUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Hillywood Red Carpet Live Stream"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-golden/10 flex items-center justify-center">
                  {isLive ? (
                    <Play className="w-12 h-12 text-golden" />
                  ) : (
                    <Clock className="w-12 h-12 text-golden" />
                  )}
                </div>
                
                {isLive ? (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Stream Starting Soon
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      The broadcast will begin shortly. Please stay tuned.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Event Broadcast Coming Soon
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-golden" />
                      <span className="text-xl font-semibold text-golden">{timeUntilEvent}</span>
                    </div>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      The Hillywood Red Carpet Event will be live streamed here. 
                      Register now to receive notifications when we go live!
                    </p>
                  </>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    className="border-golden/50 text-golden hover:bg-golden/10"
                    onClick={handleSetReminder}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button 
                    className="bg-golden text-black hover:bg-golden/90"
                    onClick={onRegisterClick}
                  >
                    Register for Event
                  </Button>
                </div>
              </div>

              {/* Event Details */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-card-accent/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(eventDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-card-accent/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Time</p>
                  <p className="font-semibold text-foreground">
                    {new Date(eventDate).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
                <div className="bg-card-accent/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Platform</p>
                  <p className="font-semibold text-foreground">Live Broadcast</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stream Controls/Info */}
        {isLive && (
          <div className="bg-card-accent/30 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-foreground">Hillywood Red Carpet Event 2025</h4>
              <p className="text-sm text-muted-foreground">Celebrating North East India's finest talent</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-golden/30"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Live Chat Section (Optional) */}
      {isLive && (
        <Card className="mt-4 p-4 bg-card-accent/30 border-golden/20">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-golden" />
            <h4 className="font-semibold text-foreground">Live Chat</h4>
          </div>
          <div className="bg-background/50 rounded-lg p-4 h-64 overflow-y-auto">
            <p className="text-sm text-muted-foreground text-center">
              Chat will appear here during the live event
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveStreamPlayer;
