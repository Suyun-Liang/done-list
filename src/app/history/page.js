import BackHomeLink from "../../components/BackHomeLink/BackHomeLink";
import Header from "../../components/Header";
import HistoryView from "../../components/HistoryView/HistoryView";

export default function PastPage() {
  const initialNow = Date.now();
  return (
    <>
      <Header>History Memories</Header>
      <BackHomeLink />
      <HistoryView initialNow={initialNow} />
    </>
  );
}
