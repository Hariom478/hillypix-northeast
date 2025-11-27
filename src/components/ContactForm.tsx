"use client";

import { useForm } from "react-hook-form";
import useClientApi from "@/api/useClientApi";
import { toast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const Api = useClientApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // --------------------------
  // VALIDATION METHODS
  // --------------------------
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobile = (number: string) => {
    const regex = /^[1-9][0-9]{9,14}$/;
    return regex.test(number.trim());
  };

  // --------------------------
  // SUBMIT HANDLER
  // --------------------------
  const onSubmit = async (data: ContactFormData) => {
    try {
      // MOBILE VALIDATION (like login function)
      if (!validateMobile(data.phone)) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid mobile number.",
          variant: "destructive",
        });
        return;
      }

      // EMAIL VALIDATION
      if (!validateEmail(data.email)) {
        toast({
          title: "Invalid Email Address",
          description: "Please enter a valid email.",
          variant: "destructive",
        });
        return;
      }

      // API CALL
      const response = await Api(
        "https://backend.hillypix.com/api/contact-us-form",
        "POST",
        JSON.stringify(data)
      );

      const result = response?.data;
      if (result?.status === true) {
        toast({
          title: "Message Sent",
          description: result?.message || "Your message was sent successfully.",
        });
        reset();


      } else {
        toast({
          title: "Error",
          description: result?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
        

  };

  return (
    <div className="p-6 rounded-xl bg-black/20 backdrop-blur">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* NAME */}
        <div>
          <label className="block text-white mb-1">Your Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 rounded-lg bg-[#ffffffc7] text-black"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-white mb-1">Phone</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full px-3 py-2 rounded-lg bg-[#ffffffc7] text-black"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">Phone is required</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-white mb-1">Your Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 rounded-lg bg-[#ffffffc7] text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-white mb-1">Message</label>
          <textarea
            rows={3}
            {...register("message", { required: true })}
            className="w-full px-3 py-2 rounded-lg bg-[#ffffffc7] text-black"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">Message is required</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
