import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from '@/lib/graphql';
import { User, Mail, Phone, Settings, LogOut, Edit } from 'lucide-react';
import Cookies from "js-cookie";

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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setAvatarPreview(user?.avatar_url || null);
      return;
    }

    try {
      const savedLite = localStorage.getItem("hillypix-user");

      if (savedLite) {
        const lu = JSON.parse(savedLite);
        setLocalUser(lu);
        setAvatarPreview(lu?.avatar_url || null);
        return;
      }

      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        const lu = parsed?.user || parsed || null;
        setLocalUser(lu);
        setAvatarPreview(lu?.avatar_url || null);
      }
    } catch {
      setLocalUser(null);
    }
  }, [user]);


  if (!localUser) return null;

  const formattedUser = {
    name: localUser.name || `${localUser.first_name || ""} ${localUser.last_name || ""}`.trim(),
    email: localUser.email || "Not Provided",
    mobile: `${localUser.country_code || ""} ${localUser.mobile_number || ""}`.trim(),
  };

  const [editData, setEditData] = useState({ name: formattedUser.name });

  useEffect(() => {
    setEditData({ name: formattedUser.name });
  }, [formattedUser.name]);


  const getInitial = (name?: string) => name?.trim().charAt(0)?.toUpperCase() || "U";

  const onAvatarSelected = async (file?: File | null) => {
    if (!file) return;

    setIsUploadingAvatar(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const dataUrl = reader.result as string;

      const raw = localStorage.getItem("auth");
      const parsed = raw ? JSON.parse(raw) : null;
      const token = parsed?.token;

      let avatar_url = dataUrl;

      try {
        const res = await updateUserProfile(
          {
            user_id: localUser?.id || parsed?.user?.id,
            avatar_url: dataUrl,
          },
          token
        );

        if (res?.updateUserProfile?.status) {
          avatar_url = res.updateUserProfile.data.avatar_url;
        }
      } catch (err) {
        console.log("Avatar update failed", err);
      }

      const updated = { ...localUser, avatar_url };

      if (parsed) {
        parsed.user = updated;
        localStorage.setItem("auth", JSON.stringify(parsed));
      }

      localStorage.setItem("hillypix-user", JSON.stringify(updated));

      setLocalUser(updated);
      setAvatarPreview(avatar_url);
      setIsUploadingAvatar(false);
      toast({ title: "Profile photo updated" });
    };

    reader.readAsDataURL(file);
  };

  
const handleSaveProfile = async () => {
  const nameParts = editData.name.trim().split(" ");
  const first_name = nameParts[0] || "";
  const last_name = nameParts.slice(1).join(" ");

  const raw = localStorage.getItem("auth");
  const parsed = raw ? JSON.parse(raw) : null;
  const token = parsed?.token;

  let updated = {
    user_id: Number(localUser?.id || parsed?.user?.id), // FIX #1
    first_name,
    last_name,
  };

  try {
    const res = await updateUserProfile(updated, token);

    if (res?.updateUserProfile?.status) {
      updated = res.updateUserProfile.data;
    }
  } catch (error) {
    console.log("Profile update failed:", error);
  }

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
    // localStorage.removeItem("hillypix-user");
    // localStorage.removeItem("auth");
    Cookies.remove("UserToken", { path: "/" });
    Cookies.remove("CurrentDeviceToken", { path: "/" });
    Cookies.remove("UserData", { path: "/" });
    toast({ title: "Signed Out Successfully..." });
    onSignOut();
    onOpenChange(false);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-golden/30 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-golden">{getInitial(formattedUser.name)}</span>
                )}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{formattedUser.name}</DialogTitle>
                <Badge className="bg-golden/20 text-golden text-xs">HillyPix Member</Badge>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-2 bg-muted/50">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" /> Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            {isEditing ? (
              <div className="space-y-4">

                <Label>Full Name</Label>
                <Input value={editData.name} onChange={(e) => setEditData({ name: e.target.value })} />

                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  {avatarPreview ? <img src={avatarPreview} className="w-16 h-16 rounded-full" /> :
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">{getInitial(editData.name)}</div>}
                  
                  <label className="text-sm text-blue-400 cursor-pointer">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => onAvatarSelected(e.target.files?.[0] ?? null)} />
                    {isUploadingAvatar ? "Uploading..." : "Change Avatar"}
                  </label>
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

                <Button className="w-full bg-golden" onClick={handleSaveProfile}>Save Changes</Button>
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
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Button className="w-full text-red-500 border-red-400" variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
