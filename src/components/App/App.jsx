import React from "react";
import Header from "../Header";
import EntriesProvider from "../../context/EntriesContext";
import PastSection from "../PastSection";
import TodaySection from "../TodaySection/TodaySection";

function App() {
  return (
    <>
      <EntriesProvider>
        <Header>Today I...</Header>
        <TodaySection />
        <PastSection />
      </EntriesProvider>
    </>
  );
}

export default App;
