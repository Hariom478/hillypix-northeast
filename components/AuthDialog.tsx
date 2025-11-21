"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Film, Star } from "lucide-react";
import { useRouter } from "next/dist/client/router";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginUser, registerUser } from "@/lib/graphql";
import { parsePhoneNumber } from "libphonenumber-js";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const { toast } = useToast();
 const navigate = useNavigate();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isOtpSend, setIsOtpSend] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [resendOTPBody, setResendOTPBody] = useState<any>({});

  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  // ======================
  // LOGIN
  // ======================
  const handleLogin = async (data: any) => {
    if (!data.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const phoneData = parsePhoneNumber(data.mobile);

    const body = {
      mobilenumber: phoneData?.nationalNumber,
      country_code: `+${phoneData?.countryCallingCode}`,
      device_type: 1,
    };

    try {
      const res = await loginUser(body);

      if (res?.login?.status === true && res?.login?.user) {
        setIsOtpSend(true);
        setMobileNumber(res.login.user.mobile_number);
        setOtpMessage(`OTP sent to ${res.login.user.mobile_number}`);
        setResendOTPBody(body);

        toast({
          title: "OTP Sent",
          description: "Please verify your OTP.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: res?.login?.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // ======================
  // SIGNUP
  // ======================
  const handleSignup = async (data: any) => {
    const phoneData = parsePhoneNumber(data.mobile);

    if (!phoneData) {
      toast({
        title: "Invalid Mobile Number",
        variant: "destructive",
      });
      return;
    }

    const { firstName, lastName } = splitName(data.fullName);

    const input = {
      firstname: firstName,
      lastname: lastName,
      email: data.email,
      mobilenumber: phoneData.nationalNumber,
      country_code: `+${phoneData.countryCallingCode}`,
    };

    const body = {
      mobilenumber: phoneData.nationalNumber,
      country_code: `+${phoneData.countryCallingCode}`,
      device_type: 1,
    };

    try {
      const res = await registerUser(input);

      console.log("Signup Response:", res);

      if (res?.register?.status == true) {
        setMobileNumber(res.register.user.mobile_number);
        setIsOtpSend(true);
        setResendOTPBody(body);

        toast({
          title: "Success",
          description: "Registered successfully. Please verify OTP.",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: res?.register?.message?.error || "Try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
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
              <DialogTitle className="text-2xl font-bold">
                Join HillyPix
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🎭 HillyWood Experience
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Access your cultural cinema library and exclusive premieres
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <Label>Mobile</Label>
              <Input {...register("mobile")} placeholder="Enter mobile number" />

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
              <Label>Full Name</Label>
              <Input {...register("fullName")} />

              <Label>Email</Label>
              <Input {...register("email")} type="email" />

              <Label>Mobile</Label>
              <Input {...register("mobile")} />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-background/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-golden" />
            <span className="text-sm font-medium text-golden">
              HillyWood Promise
            </span>
          </div>
          <p className="text-xs italic">“Every story preserves our heritage…”</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
