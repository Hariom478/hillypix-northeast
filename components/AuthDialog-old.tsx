import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Mail, Eye, EyeOff, Film, Star, Phone } from 'lucide-react';
interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    // password: '',
    // confirmPassword: '',
    // state: ''
  });

  const states = [
    'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Mock successful login
    // const mockUser = {
    //   id: '1',
    //   name: loginData.email.split('@')[0],
    //   email: loginData.email,
    //   state: 'Assam',
    //   joinDate: '2024',
    //   purchasedMovies: 3
    // // };

    // toast({
    //   title: "Welcome back!",
    //   description: `Successfully logged in as ${mockUser.name}`,
    // });

    // onAuthSuccess(mockUser);
    // onOpenChange(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    // if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.state) {
    //   toast({
    //     title: "Missing Information",
    //     description: "Please fill in all required fields.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
     if (!signupData.fullName || !signupData.email || !signupData.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // if (signupData.password !== signupData.confirmPassword) {
    //   toast({
    //     title: "Password Mismatch",
    //     description: "Passwords do not match.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // Mock successful signup
    const mockUser = {
      id: '2',
      name: signupData.fullName,
      email: signupData.email,
      mobile: signupData.mobile,
      joinDate: '2024',
      purchasedMovies: 0
    };

    toast({
      title: "Welcome to HillyPix!",
      description: `Account created successfully for ${mockUser.name}`,
    });

    onAuthSuccess(mockUser);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
              <Film className="w-5 h-5 text-golden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                Join HillyPix
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🎭 HillyWood Experience
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-muted-foreground">
            Access your cultural cinema library and exclusive premieres
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card-accent/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="login-mobile" className="text-foreground">Mobile</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-mobile"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div> */}

              {/* <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-golden hover:text-golden-light"
                >
                  Forgot password?
                </button>
              </div> */}

              <Button
                type="submit"
                className="w-full theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Sign In to HillyPix
              </Button>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-mobile" className="text-foreground">Mobile</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-mobile"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="text-foreground">Confirm</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type={showPassword ? "text" : "password"}
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10 bg-background/50 border-border/30 focus:border-golden/50"
                      placeholder="Confirm"
                    />
                  </div>
                </div>
              </div> */}

              {/* <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                >
                  {showPassword ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                  {showPassword ? 'Hide' : 'Show'} password
                </button>
              </div> */}

              <Button
                type="submit"
                className="w-full theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Cultural Quote */}
        <div className="mt-6 p-4 bg-background/20 rounded-lg border border-border/20">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-golden" />
            <span className="text-sm font-medium text-golden">HillyWood Promise</span>
          </div>
          <p className="text-xs text-muted-foreground italic">
            "Every story preserves our heritage, every ticket supports our artists, 
            every view celebrates Northeast India's rich cultural tapestry."
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;