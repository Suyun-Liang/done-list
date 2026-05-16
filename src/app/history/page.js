import Header from "../../components/Header";
import HistoryView from "../../components/HistoryView/HistoryView";

export default function PastPage() {
  const initialNow = Date.now();
  return (
    <>
      <Header>History Memories</Header>
      <HistoryView initialNow={initialNow} />
    </>
  );
}
