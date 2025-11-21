"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  phone: string;
  onVerify: (otp: string) => void;
}

export default function OtpModal({ open, onClose, phone, onVerify }: Props) {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Verify OTP</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-2">
          OTP sent to <b>{phone}</b>
        </p>

        <input
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 rounded text-center tracking-widest text-xl"
          placeholder="Enter OTP"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded mt-3"
        >
          Verify OTP
        </button>
      </DialogContent>
    </Dialog>
  );
}
