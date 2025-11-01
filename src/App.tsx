import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/lib/auth-context";
import { router } from "./router";
import "./index.css";

export function App() {
  const { isAuthenticated, user, loading } = useAuth();

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
        <LoginForm />
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
