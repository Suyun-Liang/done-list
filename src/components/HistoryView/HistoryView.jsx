import React from "react";
import SearchableHistory from "../SearchableHistory/SearchableHistory";
import PastSection from "../PastSection";

function HistoryView({ initialNow }) {
  return (
    <div>
      <SearchableHistory>
        <PastSection initialNow={initialNow} />
      </SearchableHistory>
    </div>
  );
}

export default HistoryView;
