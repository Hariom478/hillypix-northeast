"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import {
  isMobile as detectMobile,
  browserName as detectBrowser,
  osName as detectOS,
} from "react-device-detect";
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
import {
  loginUser,
  registerUser,
  verifyLoginOtp,
  logoutDevice,
} from "@/lib/graphql";
import { saveServerAuth, mergeServerUser } from "@/lib/localAuth";

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<any>();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    setValue: setValue2,
    formState: { errors: errors2, isSubmitting: isSubmitting2},
  } = useForm<any>();

   const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    setValue: setValue3,
    formState: { errors: errors3, isSubmitting: isSubmitting3},
  } = useForm<any>();


   const {
    register: register4,
    handleSubmit: handleSubmit4,
    reset: reset4,
    setValue: setValue4,
    formState: { errors: errors4, isSubmitting: isSubmitting4},
  } = useForm<any>();

  // normalize OTP error to avoid runtime crashes when errors.otp has unexpected shape
  const otpError: string | undefined = (() => {
    const e = (errors as any)?.otp;
    if (!e) return undefined;
    if (typeof e === "string") return e;
    if (typeof e === "object" && e?.message) return String(e.message);
    return undefined;
  })();

  // normalize mobile error for login field `mobilenumber`
  const mobileError: string | undefined = (() => {
    const e = (errors as any)?.mobilenumber;
    if (!e) return undefined;
    if (typeof e === "string") return e;
    if (typeof e === "object" && e?.message) return String(e.message);
    return undefined;
  })();

  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isOtpSend2, setIsOtpSend2] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(""); // national number
  const [otpMessage, setOtpMessage] = useState("");
  const [resendOTPBody, setResendOTPBody] = useState<any>({});
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: null as boolean | null,
    browserName: "",
    osName: "",
  });
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [isLoading, setIsLoading] = useState(false);
  const [showDeviceLimitModal, setShowDeviceLimitModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [pendingOtp, setPendingOtp] = useState<string | null>(null);
  const [isShowRestoreModal, setIsShowRestoreModal] = useState(false);

  const splitName = (fullName: string) => {
    const parts = (fullName || "").trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  useEffect(() => {
    setDeviceInfo({
      isMobile: detectMobile,
      browserName: detectBrowser || "",
      osName: detectOS || "",
    });
  }, []);

  // ======================
  // SIGNUP
  // ======================
  const handleSignup = async (data: any) => {
    // e.preventDefault();
    // alert("dsfdsfdfdsf");
    // return false;
    try {
      setIsLoading(true);
      let phoneData;
      const mobileInput = (data.mobile || data.mobilenumber || "").toString();
      try {
        if (mobileInput.startsWith("+")) {
          phoneData = parsePhoneNumberWithError(mobileInput);
        } else {
          // try parse as national first
          phoneData = parsePhoneNumberWithError(mobileInput, countryISO);
        }
      } catch (e) {
        // fallback: try with country dial prefix
        try {
          phoneData = parsePhoneNumberWithError(`${countryCode}${mobileInput}`);
        } catch (e2) {
          throw new Error("Invalid mobile number");
        }
      }

      const { firstName, lastName } = splitName(data.fullName || "");

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
      if (res?.register?.status==true) {
        setMobileNumber(res.register.user?.mobile_number || phoneData.nationalNumber);
        setIsOtpSend2(true);
        setResendOTPBody(body);
        setActiveTab("signup");
        setOtpMessage(`OTP sent to ${res.register.user?.mobile_number || phoneData.number}`);

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
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log('errors', errors);

  // ----------------------
  // HANDLE LOGIN (SEND OTP)
  // ----------------------
  // ----------------------
  // HANDLE LOGIN (SEND OTP)
  // ----------------------
  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);

      // VALIDATE MOBILE
      if (!data.mobilenumber) {
        toast({
          title: "Error",
          description: "Mobile number is required.",
          variant: "destructive",
        });
        return;
      }

      // prepare request body
      const input = {
        mobilenumber: data.mobilenumber.toString(),
        country_code: countryCode, // "+91"
        device_type: 1, // required by API
      };

      const res = await loginUser(input);

      // ===========================
      // SUCCESS → SEND OTP
      // ===========================
      if (res?.login?.status === true) {
        const user = res.login.user;

        // Save mobile for OTP verification
        setMobileNumber(user?.mobile_number || data.mobilenumber);

        // Save resend OTP body (MUST contain country_code)
        setResendOTPBody({
          mobilenumber: user?.mobile_number || data.mobilenumber,
          country_code: countryCode,
          device_type: 1,
        });

        // UI update
        setIsOtpSend(true);

        toast({
          title: "Success",
          description: "OTP sent to your mobile.",
        });

        return;
      }

      // ===========================
      // USER NOT REGISTERED
      // ===========================
      if (res?.login?.status === false && !res?.login?.user) {
        toast({
          title: "User Not Found",
          description: "Please sign up first.",
          variant: "destructive",
        });
        return;
      }

      // ===========================
      // OTHER FAILURE
      // ===========================
      toast({
        title: "Login Failed",
        description: res?.login?.message || "Failed to send OTP.",
        variant: "destructive",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ======================
  // OTP VERIFICATION
  // ======================
  const verifyOtp = async (data: { otp: string }) => {

    console.log("data data",data);
    try {
      if (!data?.otp) {
        toast({
          title: "Error",
          description: "Please enter OTP",
          variant: "destructive",
        });
        return;
      }
      const input = {
        otp: data.otp,
        mobilenumber: mobileNumber,
        device_type: 1,
        device_name: `${deviceInfo.osName} ${deviceInfo.browserName}`,
      };

      setIsLoading(true);
      const res = await verifyLoginOtp(input);
      if (res?.verifyloginotp?.status) {
        const serverUser = res.verifyloginotp.data.UserDetails || {};
        const token = res.verifyloginotp.data?.token || null;
        try {
          saveServerAuth(serverUser, token, serverUser.current_device_token);
        } catch (e) {
          // best-effort fallback: store basic auth
          try {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                token: token,
                user: serverUser,
                current_device_token: serverUser.current_device_token,
              })
            );
            localStorage.setItem("hillypix-user", JSON.stringify(serverUser));
          } catch (e2) {
            // ignore
          }
        }

        const merged = mergeServerUser(serverUser);

        toast({ title: "Success", description: "OTP verified successfully!" });

        onAuthSuccess(merged);

        setTimeout(() => {
          window.location.href="/";
          navigate("/");
        }, 500);
        onOpenChange(false);
      } else if (
        res?.verifyloginotp?.status === false &&
        res?.verifyloginotp?.show_logout_button === true
      ) {
        // device limit reached — store token + pending otp and show device-limit modal
        const fallbackToken =
          res?.verifyloginotp?.data?.token ??
          res?.verifyloginotp?.token ??
          null;
        setToken(fallbackToken);
        setPendingOtp(data.otp ?? null);
        setShowDeviceLimitModal(true);
      } else {
        toast({
          title: "OTP Verification Failed",
          description:
            res?.verifyloginotp?.message || "OTP verification failed!",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ======================
  // RESEND OTP
  // ======================
  const resendOTP = async () => {
    if (!resendOTPBody?.mobilenumber) {
      toast({
        title: "Error",
        description: "No mobile available to resend OTP.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await loginUser(resendOTPBody);
      if (res?.login?.status) {
        toast({ title: "OTP Resent", description: "Check your mobile again." });
        setOtpMessage(
          `OTP re-sent to ${
            res.login?.user?.mobile_number || resendOTPBody.mobilenumber
          }`
        );
        setIsOtpSend(true);
      } else {
        toast({
          title: "Error",
          description: res?.login?.message || "Failed to resend OTP",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------
  // Edit number (allow user to go back and change mobile before verifying)
  // ----------------------
  const editNumber = () => {
    setIsOtpSend(false);
    setValue("otp", "");
  };

  // ----------------------
  // Logout all devices (called when device-limit modal shown)
  // ----------------------
  const logoutAllDevices = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "Missing token.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      // assuming logoutDevice accepts (body, token)
      const res = await logoutDevice({ logout_all: true }, token);
      if (res?.logoutDevice?.status === true) {
        toast({
          title: "Success",
          description: "Logged out from all devices!",
        });
        setShowDeviceLimitModal(false);

        // retry verifying OTP with same pending OTP
        if (pendingOtp) {
          // call verifyLoginOtp again with the same payload
          const input = {
            otp: pendingOtp,
            mobilenumber: mobileNumber,
            device_type: 1,
            device_name: `${deviceInfo.osName} ${deviceInfo.browserName}`,
          };
          const retry = await verifyLoginOtp(input);
          if (retry?.verifyloginotp?.status) {
            const serverUser = retry.verifyloginotp.data.UserDetails || {};
            const token = retry.verifyloginotp.data?.token || null;
            try {
              saveServerAuth(
                serverUser,
                token,
                serverUser.current_device_token
              );
            } catch (e) {
              try {
                localStorage.setItem(
                  "auth",
                  JSON.stringify({
                    token: token,
                    user: serverUser,
                    current_device_token: serverUser.current_device_token,
                  })
                );
                localStorage.setItem(
                  "hillypix-user",
                  JSON.stringify(serverUser)
                );
              } catch (e2) {
                // ignore
              }
            }

            const merged = mergeServerUser(serverUser);

            toast({
              title: "Success",
              description: "OTP verified successfully!",
            });
            onAuthSuccess(merged);
            setTimeout(() => navigate("/"), 400);
            onOpenChange(false);
          } else {
            toast({
              title: "Error",
              description:
                retry?.verifyloginotp?.message ||
                "Failed after logout-all attempt",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Error",
          description:
            res?.logoutDevice?.message || "Failed to log out all devices.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    // If you have a `restoreUser` GraphQL call, call it here.
    // I left this as a placeholder - wire to your restoreUser function if available.
    try {
      setIsLoading(true);
      // example:
      // const res = await restoreUser({ mobile_number: mobileNumber, country_code: ??? });
      // if success => toast + setIsOtpSend(true)
      toast({
        title: "Info",
        description: "Restore flow not implemented - wire to your API.",
      });
      setIsShowRestoreModal(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to restore.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "signup")}
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {isOtpSend ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit4(verifyOtp)} className="space-y-4">
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="flex-1">{otpMessage}</span>
                    <button
                      type="button"
                      onClick={editNumber}
                      className="ml-2 text-sm text-indigo-600"
                    >
                      Edit
                    </button>
                  </p>

                  <Input
                    {...register4("otp", {
                      required: "OTP is required",
                      minLength: { value: 6, message: "OTP must be 6 digits" },
                      maxLength: { value: 6, message: "OTP must be 6 digits" },
                      pattern: {
                        value: /^\d+$/,
                        message: "OTP must contain only numbers",
                      },
                    })}
                    placeholder="Enter OTP"
                    maxLength={6}
                    inputMode="numeric"
                    autoFocus
                  />
                  {/* {otpError && (
                    <p className="text-sm text-red-600">{otpError}</p>
                  )} */}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-sm text-indigo-600"
                    >
                      Resend OTP
                    </button>
                    <Button type="submit" className="ml-2" disabled={isLoading}>
                      {isLoading ? "Please wait..." : "Verify OTP"}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              // <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              //   <Label>Mobile</Label>
              //   <div className="flex space-x-2">
              //     <div className="w-36">
              //       <CountrySelect value={countryCode} onChange={(val) => setCountryCode(val)} onCountryChange={(iso) => setCountryISO(iso as any)} />
              //     </div>
              //     <Input className="flex-1" {...register("mobilenumber", { required: "Mobile is required" })} placeholder="Enter mobile number" />
              //   </div>
              //   {mobileError && <p className="text-sm text-red-600">{mobileError}</p>}
              //   <Button type="submit" className="w-full" disabled={isLoading}>
              //     {isLoading ? "Sending OTP..." : "Sign In"}
              //   </Button>
              // </form>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <Label>Mobile</Label>

                <div className="flex space-x-2">
                  <div className="w-36">
                    <CountrySelect
                      value={countryCode}
                      onChange={(val) => setCountryCode(val)}
                      onCountryChange={(iso) => setCountryISO(iso as any)}
                    />
                  </div>

                  <Input
                    className="flex-1"
                    {...register("mobilenumber", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile number must be exactly 10 digits",
                      },
                    })}
                    maxLength={10} // prevents typing more than 10
                    placeholder="Enter mobile number"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Sign In"}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="signup">
            {isOtpSend2 && activeTab === "signup" ? (
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit3(verifyOtp)} className="space-y-4">
                  <p className="text-sm text-gray-700">{otpMessage}</p>
                  <Input
                    {...register3("otp", {
                      required: true,
                      minLength: 6,
                      maxLength: 6,
                    })}
                    placeholder="Enter OTP"
                    maxLength={6}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button type="button" onClick={resendOTP} variant="outline">
                      Resend OTP
                    </Button>
                    <Button type="submit" className="w-full">
                      Verify OTP
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmit2(handleSignup)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label>Full Name</Label>
                  <Input
                    className="flex-1"
                    placeholder="Enter Full Name"
                    {...register2("fullName", {
                      required: "Full name is required",
                    })}
                  />
                  {!!errors2.fullName?.message && (
                      <p className="text-red-500 text-sm">{errors2.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    className="flex-1"
                    placeholder="Enter Email"
                    {...register2("email", { required: "Email is required" })}
                  />
                  {errors2.email && (
                    <p className="text-red-500 text-sm">
                      {errors2?.email?.message}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <Label>Mobile</Label>
                  <div className="flex space-x-2">
                    <CountrySelect
                      value={countryCode}
                      onChange={(val) => setCountryCode(val)}
                      onCountryChange={(iso) => setCountryISO(iso)}
                    />

                    <Input
                      className="flex-1"
                      placeholder="Enter mobile number"
                      {...register2("mobile", {
                        required: "Mobile number is required",
                      })}
                       maxLength={10}
                    />
                  </div>
                  {errors2.mobile && (
                    <p className="text-red-500 text-sm">
                      {errors2.mobile.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  // disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Please wait..." : "Create Account"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-background/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-golden" />
            <span className="text-sm font-medium text-golden">
              HillyWood Promise
            </span>
          </div>
          <p className="text-xs italic">
            “Every story preserves our heritage…”
          </p>
        </div>
      </DialogContent>

      {/* Device limit modal */}
      <Dialog
        open={showDeviceLimitModal}
        onOpenChange={(v) => setShowDeviceLimitModal(v)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Device Limit Reached</DialogTitle>
            <DialogDescription>
              You have reached the maximum number of allowed devices. Logout
              from all other devices to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeviceLimitModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={logoutAllDevices}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Logout All"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Restore account modal */}
      <Dialog
        open={isShowRestoreModal}
        onOpenChange={(v) => setIsShowRestoreModal(v)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Restore Account</DialogTitle>
            <DialogDescription>
              Your account appears to be inactive. Would you like to restore it?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-start gap-3 pt-3">
            <Button
              variant="secondary"
              onClick={() => setIsShowRestoreModal(false)}
            >
              No
            </Button>
            <Button onClick={handleRestore}>Yes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default AuthDialog;
function setShowSignup(arg0: boolean) {
  throw new Error("Function not implemented.");
}
