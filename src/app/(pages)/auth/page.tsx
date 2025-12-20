"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CustomerRegisterForm from "@/app/components/auth/CustomerRegisterForm";
import CustomerLoginForm from "@/app/components/auth/CustomerLoginForm";
// import { Button } from "@/components/ui/button";

const AuthPage: React.FC = () => {
  const search = useSearchParams();

  const modeParam = search?.get("mode") ?? "login";

  const [mode, setMode] = useState<string>(modeParam);

  useEffect(() => {
    setMode(modeParam);
  }, [modeParam]);

  return (
    <div className="flex flex-col gap-10 lg:gap-20">
      {/* <div className="flex justify-center gap-6">
        <Button
          variant={mode === "login" ? "default" : "ghost"}
          onClick={() => setMode("login")}
        >
          Sign in
        </Button>
        <Button
          variant={mode === "register" ? "default" : "ghost"}
          onClick={() => setMode("register")}
        >
          Create account
        </Button>
      </div> */}

      <div className="flex-1 flex justify-center mt-10 lg:mt-20">
        <div className="w-full max-w-2xl">
          {mode === "register" ? (
            <CustomerRegisterForm />
          ) : (
            <CustomerLoginForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
