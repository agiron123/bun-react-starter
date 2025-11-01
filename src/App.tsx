import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/lib/auth-context";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const { isAuthenticated, user, logout, loading } = useAuth();

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
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Bun Logo"
                className="h-10 w-10 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
              />
              <img
                src={reactLogo}
                alt="React Logo"
                className="h-10 w-10 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto p-8 text-center">
          <Card>
            <CardHeader className="gap-4">
              <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
              <CardDescription>
                Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
                test HMR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <APITester />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
