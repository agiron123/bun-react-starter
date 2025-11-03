import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { APITester } from "./APITester";
import { KitchenSink } from "./KitchenSink";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  const [showKitchenSink, setShowKitchenSink] = useState(false);

  if (showKitchenSink) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={() => setShowKitchenSink(false)} variant="outline">
            Back to Main App
          </Button>
        </div>
        <KitchenSink />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={() => setShowKitchenSink(true)} variant="outline">
          View Kitchen Sink
        </Button>
      </div>
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>
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
  );
}

export default App;
