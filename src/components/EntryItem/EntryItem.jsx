import React from "react";

function EntryItem({ id, children }) {
  return <li id={id}>{children}</li>;
}

export default EntryItem;
