import React from "react";
import Patient from "./components/Patient";
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 h-screen">
      <main className="flex-grow">
        <Patient />
      </main>
      <Footer />
    </div>
  );
}

export default App;
