"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { isMobile as detectMobile, browserName as detectBrowser, osName as detectOS } from "react-device-detect";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Film, Star } from "lucide-react";
import CountrySelect from "./CountrySelect";
import { loginUser, registerUser, verifyLoginOtp } from "@/lib/graphql";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any) => void;
}

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91"); // default country dial code
  const [countryISO, setCountryISO] = useState<CountryCode>("IN"); // default country ISO for parsing

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
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: null,
    browserName: "",
    osName: "",
  });
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  useEffect(() => {
    setDeviceInfo({
      isMobile: detectMobile,
      browserName: detectBrowser,
      osName: detectOS,
    });
  }, []);

  // ======================
  // SIGNUP
  // ======================
  const handleSignup = async (data: any) => {
    try {
      let phoneData;
      const mobileInput = data.mobile?.toString() || "";
      if (mobileInput.startsWith("+")) {
        // international format provided
        phoneData = parsePhoneNumberWithError(mobileInput);
      } else {
        // parse as national number using selected ISO (handles leading 0s)
        phoneData = parsePhoneNumberWithError(mobileInput, countryISO);
      }
      if (!phoneData) throw new Error("Invalid mobile number");

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

      const res = await registerUser(input);

      if (res?.register?.status) {
        setMobileNumber(res.register.user.mobile_number);
        setIsOtpSend(true);
        setResendOTPBody(body);
        setActiveTab("signup");

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
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // ======================
  // LOGIN
  // ======================
  const handleLogin = async (data: any) => {
    try {
      if (!data.mobile) throw new Error("Mobile is required");
      let phoneData;
      const mobileInput = data.mobile?.toString() || "";
      if (mobileInput.startsWith("+")) {
        phoneData = parsePhoneNumberWithError(mobileInput);
      } else {
        phoneData = parsePhoneNumberWithError(mobileInput, countryISO);
      }

      const body = {
        mobilenumber: phoneData.nationalNumber,
        country_code: `+${phoneData.countryCallingCode}`,
        device_type: 1,
      };

      const res = await loginUser(body);

      if (res?.login?.status && res?.login?.user) {
        setMobileNumber(res.login.user.mobile_number);
        setIsOtpSend(true);
        setResendOTPBody(body);
        setActiveTab("login");
        setOtpMessage(`OTP sent to ${res.login.user.mobile_number}`);

        toast({
          title: "OTP Sent",
          description: "Please verify your OTP.",
        });
      } else {
        toast({
          title: "Not Registered",
          description: "Firstly register your mobile.",
          variant: "destructive",
        });
        setActiveTab("signup");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // ======================
  // OTP VERIFICATION
  // ======================
  const verifyOtp = async (data: { otp: string }) => {
    try {
      const input = {
        otp: data.otp,
        mobilenumber: mobileNumber,
        device_type: 1,
        device_name: deviceInfo.osName + " " + deviceInfo.browserName,
      };

      const res = await verifyLoginOtp(input);

      if (res?.verifyloginotp?.status) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: res.verifyloginotp.data.token,
            user: res.verifyloginotp.data.UserDetails,
            current_device_token:
              res.verifyloginotp.data.UserDetails.current_device_token,
          })
        );

        toast({
          title: "Success",
          description: "OTP verified successfully!",
        });

        onAuthSuccess(res.verifyloginotp.data.UserDetails);
        navigate("/");
        onOpenChange(false);
      } else {
        toast({
          title: "OTP Verification Failed",
          description: res?.verifyloginotp?.message || "OTP verification failed!",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // ======================
  // RESEND OTP
  // ======================
  const resendOTP = async () => {
    if (!resendOTPBody.mobilenumber) return;
    try {
      const res = await loginUser(resendOTPBody);
      if (res?.login?.status) {
        toast({ title: "OTP Resent", description: "Check your mobile again." });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
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
              <DialogTitle className="text-2xl font-bold">Join HillyPix</DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🎭 HillyWood Experience
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Access your cultural cinema library and exclusive premieres
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {isOtpSend && activeTab === "login" ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
                  <p className="text-sm text-gray-700">{otpMessage}</p>
                  <Input {...register("otp", { required: true, minLength: 6, maxLength: 6 })} placeholder="Enter OTP" maxLength={6} />
                  <Button type="button" onClick={resendOTP} variant="outline">Resend OTP</Button>
                  <Button type="submit" className="w-full">Verify OTP</Button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <Label>Mobile</Label>
                <div className="flex space-x-2">
                  <CountrySelect value={countryCode} onChange={(val) => setCountryCode(val)} onCountryChange={(iso) => setCountryISO(iso as any)} />
                  <Input className="flex-1" {...register("mobile")} placeholder="Enter mobile number" />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="signup">
            {isOtpSend && activeTab === "signup" ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
                  <p className="text-sm text-gray-700">{otpMessage}</p>
                  <Input {...register("otp", { required: true, minLength: 6, maxLength: 6 })} placeholder="Enter OTP" maxLength={6} />
                  <Button type="button" onClick={resendOTP} variant="outline">Resend OTP</Button>
                  <Button type="submit" className="w-full">Verify OTP</Button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
                <Label>Full Name</Label>
                <Input {...register("fullName")} placeholder="Full Name"/>
                <Label>Email</Label>
                <Input {...register("email")} type="email" placeholder="Enter Email" />
                <Label>Mobile</Label>
                <div className="flex space-x-2">
                  <CountrySelect value={countryCode} onChange={(val) => setCountryCode(val)} onCountryChange={(iso) => setCountryISO(iso as any)} />
                  <Input className="flex-1" {...register("mobile")} placeholder="Enter Mobile Number" />
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-background/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-golden" />
            <span className="text-sm font-medium text-golden">HillyWood Promise</span>
          </div>
          <p className="text-xs italic">“Every story preserves our heritage…”</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
