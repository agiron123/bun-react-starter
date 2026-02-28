import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useAuth } from "@/lib/auth-context";
import { router } from "./router";
import "./index.css";

export function App() {
  const { isAuthenticated, user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        {showRegister ? (
          <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
