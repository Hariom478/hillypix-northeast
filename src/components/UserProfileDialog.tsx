import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from '@/lib/graphql';
import { User, Mail, Phone, Film, Star, Settings, LogOut, Edit } from 'lucide-react';

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onSignOut: () => void;
}

const UserProfileDialog = ({ open, onOpenChange, user, onSignOut }: UserProfileDialogProps) => {
  const { toast } = useToast();
  const [localUser, setLocalUser] = useState<any>(user || null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Read from localStorage 'auth' if `user` prop isn't provided
  useEffect(() => {
    if (user) {
      setLocalUser(user);
      return;
    }
    try {
      // Prefer the lightweight `hillypix-user` key used by the Header for quick rendering.
      const savedLite = typeof window !== "undefined" ? localStorage.getItem("hillypix-user") : null;
      if (savedLite) {
        const lu = JSON.parse(savedLite);
        setLocalUser(lu);
        setAvatarPreview(lu?.avatar_url || lu?.avatar || null);
        return;
      }

      // Fallback to the full `auth` object if present
      const raw = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        // stored shape may be { user: { ... } } or directly the user object
        const lu = parsed?.user || parsed || null;
        setLocalUser(lu);
        setAvatarPreview(lu?.avatar_url || lu?.avatar || null);
      }
    } catch (e) {
      setLocalUser(null);
    }
  }, [user]);

  if (!localUser) return null;

  /* Normalize user fields from different backend shapes */
  const formattedUser = {
    // some backends use `name`, others use `firstname`/`lastname`
    name:
      localUser.name ||
      [localUser.first_name, localUser.last_name].filter(Boolean).join(" ") ||
      [localUser.firstname, localUser.lastname].filter(Boolean).join(" ") ||
      [localUser.firstName, localUser.lastName].filter(Boolean).join(" ") ||
      localUser.fullname ||
      "",
    email: localUser.email || localUser.user_email || "",
    mobile:
      `${localUser.country_code || localUser.countryCode || ""} ${
        localUser.mobile_number || localUser.mobilenumber || localUser.phone || ""
      }`.trim(),

      
  };
  console.log("Raw user object:", localUser);


  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: formattedUser.name || "",
  });

  // keep edit input in sync when the user object updates
  useEffect(() => {
    setEditData({ name: formattedUser.name || "" });
  }, [formattedUser.name]);

  // helper: return initials or first letter
  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  // handle avatar file selection
 const onAvatarSelected = async (file?: File | null) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    const dataUrl = String(reader.result);

    const raw = localStorage.getItem("auth");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.token;

    let avatar_url = dataUrl;

    try {
      const res = await updateUserProfile({ avatar_url: dataUrl }, token);
      if (res?.updateUserProfile?.status) {
        avatar_url = res.updateUserProfile.data.avatar_url;
      }
    } catch (e) {
      console.log("Avatar update failed:", e);
    }

    // save final avatar
    const newUserObj = {
      ...localUser,
      avatar_url,
    };

    if (parsed) {
      parsed.user = newUserObj;
      localStorage.setItem("auth", JSON.stringify(parsed));
    }
    localStorage.setItem("hillypix-user", JSON.stringify(newUserObj));

    setLocalUser(newUserObj);
    setAvatarPreview(avatar_url);
  };

  reader.readAsDataURL(file);
};


  const handleSaveProfile = async () => {
  const newName = (editData.name || "").trim();
  const parts = newName.split(" ");
  const first_name = parts[0] || "";
  const last_name = parts.slice(1).join(" ") || "";

  const raw = localStorage.getItem("auth");
  const parsed = raw ? JSON.parse(raw) : null;
  const token = parsed?.token;

  let updated = {
    first_name,
    last_name,
    avatar_url: localUser.avatar_url,
  };

  try {
    const res = await updateUserProfile(updated, token);

    if (res?.updateUserProfile?.status) {
      updated = res.updateUserProfile.data; // <-- backend updated values
    }
  } catch (e) {
    console.log("Profile update failed:", e);
  }

  // Save to localStorage
  const newUserObj = {
    ...localUser,
    ...updated,
    name: `${updated.first_name} ${updated.last_name}`.trim(),
  };

  if (parsed) {
    parsed.user = newUserObj;
    localStorage.setItem("auth", JSON.stringify(parsed));
  }
  localStorage.setItem("hillypix-user", JSON.stringify(newUserObj));

  setLocalUser(newUserObj);
  toast({ title: "Profile Updated" });

  setIsEditing(false);
};


  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    // clear both lightweight and full auth snapshots to avoid stale data on refresh
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("hillypix-user");
        localStorage.removeItem("auth");
      }
    } catch (e) {
      /* ignore */
    }
    onSignOut();
    onOpenChange(false);
  };
  // console.log("Formatted User Details:", formattedUser);

// console.log("User name:", formattedUser.name);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center">
                {avatarPreview ? (
                  // show image
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-golden/30 flex items-center justify-center text-xl font-semibold text-golden">
                    {getInitial(formattedUser.name)}
                  </div>
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {formattedUser.name || "User"}
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
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" /> Profile
            </TabsTrigger>
            {/* <TabsTrigger value="activity">
              <Film className="w-4 h-4 mr-2" /> Activity
            </TabsTrigger> */}
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

              {isEditing ? (
                <div className="space-y-4">

                  {/* Editable Name */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Full Name</Label>
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ name: e.target.value })}
                      className="bg-background/50 border-border/30 focus:border-golden/50"
                    />
                  </div>

                  {/* Avatar upload */}
                  <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-3">
                      {avatarPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatarPreview} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                          {getInitial(editData.name)}
                        </div>
                      )}
                      <div>
                        <input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => onAvatarSelected(e.target.files?.[0] ?? null)}
                          className="hidden"
                        />
                        <label htmlFor="avatar-input" className="inline-block cursor-pointer text-sm text-indigo-600">
                          {isUploadingAvatar ? "Uploading..." : "Change Photo"}
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Email (read-only because backend does NOT return it yet) */}
                  <div className="space-y-2 opacity-60">
                    <Label>Email</Label>
                    <Input
                      value={formattedUser.email || "Not provided"}
                      disabled
                      className="bg-background/30 border-border/20"
                    />
                  </div>

                  {/* Mobile (read-only) */}
                  <div className="space-y-2 opacity-60">
                    <Label>Mobile</Label>
                    <Input
                      value={formattedUser.mobile}
                      disabled
                      className="bg-background/30 border-border/20"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 theatre-gradient text-white" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                
                <div className="space-y-3">


                  {/* Display Name */}
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{formattedUser.name || "Not provided"}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{formattedUser.email || "Not provided"}</span>
                  </div>

                  {/* Mobile */}
                  <div className="flex items-center space-x-3 p-3 bg-background/20 rounded-lg">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{formattedUser.mobile}</span>
                  </div>

                </div>
              )}
            </div>
          </TabsContent>

          {/* SETTINGS + ACTIVITY TABS unchanged */}
          {/* ... keep your rest code ... */}

          <TabsContent value="settings" className="mt-6">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-3" /> Sign Out
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
