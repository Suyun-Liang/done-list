import React from "react";

function AddCommentForm({ entryId, onAddComment, onDeleteComment }) {
  const [draftNote, setDraftNote] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (draftNote.trim() === "") return;
    onAddComment(entryId, draftNote);
    setDraftNote("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={draftNote}
        onChange={(e) => setDraftNote(e.target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  );
}

export default AddCommentForm;
