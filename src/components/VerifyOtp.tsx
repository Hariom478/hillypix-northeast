"use client";

import React, { useState, useEffect } from "react";
import styles from "./forms.module.scss";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { loginUser, verifyLoginOtp } from "@/lib/graphql";
import { useRouter, useSearchParams } from "next/navigation";
import {
  isMobile as detectMobile,
  browserName as detectBrowser,
  osName as detectOS,
} from "react-device-detect";

interface LoginForm {
  mobilenumber: string;
  otp?: string;
}

interface DeviceInfo {
  isMobile: boolean;
  browserName: string;
  osName: string;
}

const Page: React.FC = () => {
  const [otpMessage, setOtpMessage] = useState<string>("");
  const [getStatus, setGetStatus] = useState<boolean | "">("");
  const [phone, setPhone] = useState<string>("");
  const [isParamMobile, setIsParamMobile] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    browserName: "",
    osName: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const verification = searchParams.get("verification");
  const paramMobileNumber = searchParams
    .get("mobilenumber")
    ?.split("-")
    .join("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  useEffect(() => {
    setDeviceInfo({
      isMobile: detectMobile,
      browserName: detectBrowser,
      osName: detectOS,
    });
  }, []);

  useEffect(() => {
    if (verification === "1") setGetStatus(true);
  }, [verification]);

  useEffect(() => {
    if (paramMobileNumber !== null) setIsParamMobile(paramMobileNumber);
  }, [paramMobileNumber]);

  const submit: SubmitHandler<LoginForm> = async (data) => {
    const body = {
      country_code: data.mobilenumber.substring(0, 4),
      mobilenumber: data.mobilenumber.substring(4),
    };

    try {
      const res = await loginUser(body);
      if (res?.login?.status === true) {
        setGetStatus(true);
        setOtpMessage(`An OTP has been sent to ${res?.login?.user?.mobile_number || ""}`);
      } else if (res?.login?.status === false) {
        router.push("/register");
      } else {
        toast.error("Something is missing!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: "top-right" });
      console.error(error);
    }
  };

  const verifyOtp: SubmitHandler<LoginForm> = async (data) => {
    const input = {
      otp: data.otp!,
      mobilenumber: isParamMobile
        ? isParamMobile
        : data.mobilenumber?.substring(4).split("-").join(""),
      device_type: 1,
      device_name: `${deviceInfo.osName} ${deviceInfo.browserName}`,
    };

    try {
      const res = await verifyLoginOtp(input);
      if (res?.verifyloginotp?.status === true) {
        toast.success("OTP verified successfully!", { position: "top-right" });
        
        // Save token and user data in localStorage
        localStorage.setItem("token", res?.verifyloginotp?.data?.token || "");
        localStorage.setItem(
          "user",
          JSON.stringify(res?.verifyloginotp?.data?.UserDetails || {})
        );

        setTimeout(() => router.push("/"), 500);
      } else {
        toast.error(
          res?.verifyloginotp?.message || "OTP verification failed!",
          { position: "top-right" }
        );
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: "top-right" });
      console.error(error);
    }
  };

  return (
    <div className={styles.registerwrap}>
      <div className="container">
        <div className={styles.coverwrap}>
          <div className="row justify-content-center p-5">
            <div className="col-lg-4 col-md-6 col-sm-12 p-0">
              <div className={styles.secondcol}>
                <img src="/images/logo.png" alt="" className={styles.logoimg} />
                <h3 className={styles.rightheading}>Sign In !</h3>
                <p className={styles.nametxt}>
                  Sign up if you still don't have an account
                </p>
                <div className={styles.copyrightdiv}>
                  <p className={styles.bottomtxt}>
                    Don't have an account?{" "}
                    <Link href="/register">
                      <span className={styles.signin}>Sign up.</span>
                    </Link>
                  </p>
                  <p className={styles.bottomtxt}>© Hillypix - Truly East</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 p-0">
              <div className={styles.firstcol}>
                {getStatus === false ? (
                  <h3 className={styles.leftheadinglogin}>Sign In</h3>
                ) : (
                  <h3 className={styles.leftheadinglogin}>Verify OTP</h3>
                )}

                <div className={styles.formdiv}>
                  {getStatus === "" && (
                    <form onSubmit={handleSubmit(submit)} className={styles.loginform}>
                      <div className={styles.inputwrap}>
                        <PhoneInput
                          defaultCountry="in"
                          className={styles.inputdiv}
                          {...register("mobilenumber", { required: true })}
                          value={phone}
                          onChange={(value: string) => setPhone(value)}
                        />
                      </div>
                      {errors.mobilenumber && (
                        <div className={styles.formerror}>
                          {errors.mobilenumber.message}
                        </div>
                      )}
                      <div className={styles.checkboxwrap}>
                        <input type="checkbox" className={styles.checkboxdiv} />
                        <p className={styles.checktxt}>Stay signed in for a month</p>
                      </div>

                      <button type="submit" className={styles.accountbtn2}>
                        Continue
                      </button>
                    </form>
                  )}
                  {getStatus === true && (
                    <form onSubmit={handleSubmit(verifyOtp)} className={styles.loginform}>
                      <p className={styles.otp_msg}>{otpMessage}</p>
                      <div className={styles.inputwrap}>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          {...register("otp", { required: true })}
                          className={styles.inputdiv}
                        />
                      </div>
                      <div className={styles.checkboxwrap}>
                        <input type="checkbox" className={styles.checkboxdiv} />
                        <p className={styles.checktxt}>Stay signed in for a month</p>
                      </div>

                      <button type="submit" className={styles.accountbtn2}>
                        Continue
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
