import React from "react";
import Patient from "./components/Patient";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 h-screen">
      <Header />
      <main className="flex-grow">
        <Patient />
      </main>
      <Footer />
    </div>
  );
}

export default App;
