// features/auth/ui/auth-page.tsx
"use client";

import { useState } from "react";

import { LoginForm } from "@/features/auth/ui/login-form";
import { RegisterForm } from "@/features/auth/ui/register-form";

export function AuthPage() {
  const [isLoginAuth, setLoginAuth] = useState(true);

  return (
    <div className="w-full max-w-md">
      {isLoginAuth ? (
        <LoginForm onRegisterClick={() => setLoginAuth(false)} />
      ) : (
        <RegisterForm onLoginClick={() => setLoginAuth(true)} />
      )}
    </div>
  );
}
