import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Calendar, Film, Star, Settings, LogOut, Edit } from 'lucide-react';

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onSignOut: () => void;
}

const UserProfileDialog = ({ open, onOpenChange, user, onSignOut }: UserProfileDialogProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    state: user?.state || ''
  });

  const states = [
    'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    onSignOut();
    onOpenChange(false);
  };

  const mockActivityData = [
    { movie: 'Ka Jainsen', action: 'Purchased', date: '2 days ago', type: 'purchase' },
    { movie: 'Naga Rangtsa', action: 'Added to Watchlist', date: '5 days ago', type: 'watchlist' },
    { movie: 'Puanchei', action: 'Watched', date: '1 week ago', type: 'watched' },
    { movie: 'Gamosa Tales', action: 'Purchased', date: '2 weeks ago', type: 'purchase' }
  ];

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
                <User className="w-6 h-6 text-golden" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {user.name}
                </DialogTitle>
                <Badge className="bg-golden/20 text-golden text-xs mt-1">
                  HillyPix Member
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-muted-foreground hover:text-golden"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground">
            Manage your profile and view your HillyPix activity
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card-accent/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-golden">{user.purchasedMovies}</div>
                  <div className="text-xs text-muted-foreground">Movies Owned</div>
                </CardContent>
              </Card>
              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-light">12</div>
                  <div className="text-xs text-muted-foreground">Hours Watched</div>
                </CardContent>
              </Card>
              <Card className="bg-card-accent/30 border-border/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <div className="text-xs text-muted-foreground">States Explored</div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-foreground">Full Name</Label>
                    <Input
                      id="edit-name"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-background/50 border-border/30 focus:border-golden/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email" className="text-foreground">Email</Label>
                    <Input
                      id="edit-email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-background/50 border-border/30 focus:border-golden/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-state" className="text-foreground">State</Label>
                    <select
                      id="edit-state"
                      value={editData.state}
                      onChange={(e) => setEditData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-3 bg-background/50 border border-border/30 rounded-md focus:border-golden/50 focus:outline-none text-foreground"
                    >
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveProfile}
                      className="flex-1 theatre-gradient text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-border/30"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{user.state}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Member since {user.joinDate}</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <div className="space-y-3">
                {mockActivityData.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'purchase' ? 'bg-golden/20' :
                      activity.type === 'watched' ? 'bg-primary/20' : 'bg-muted/20'
                    }`}>
                      <Film className={`w-4 h-4 ${
                        activity.type === 'purchase' ? 'text-golden' :
                        activity.type === 'watched' ? 'text-primary-light' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action} <span className="text-golden">{activity.movie}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border/30 text-foreground hover:bg-background/50"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Notification Preferences
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border/30 text-foreground hover:bg-background/50"
                  >
                    <Star className="w-4 h-4 mr-3" />
                    Language & Region
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border/30 text-foreground hover:bg-background/50"
                  >
                    <Film className="w-4 h-4 mr-3" />
                    Viewing Preferences
                  </Button>
                </div>
              </div>

              <div className="border-t border-border/20 pt-6">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;