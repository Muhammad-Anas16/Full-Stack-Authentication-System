"use client";

import { forgetPassword } from "@/lib/auth-client";
import { useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const result = await forgetPassword(email);

    if (result.success) {
      // Show success message
      toast.success("If your email exists, you'll receive a reset link");
    } else {
      // Handle error
      toast.error(result.error);
    }
  };

  return (
    // <form onSubmit={handleForgotPassword}>
    //         <input 
    //             type="email" 
    //             value={email} 
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="Enter your email"
    //         />
    //         <button type="submit">Send Reset Link</button>
    //     </form>
    <div className="min-h-screen flex items-center justify-center bg-gray-900"></div>
  );
};

export default ForgetPasswordForm;
