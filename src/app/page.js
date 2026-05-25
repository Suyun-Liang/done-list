import Header from "../components/Header";
import TodaySection from "../components/TodaySection/TodaySection";
import ViewHistoryLink from "../components/ViewHistoryLink/ViewHistoryLink";

export default function Page() {
  const initialNow = Date.now();

  return (
    <>
      <Header>Today I...</Header>
      <TodaySection initialNow={initialNow} />
      <ViewHistoryLink />
    </>
  );
}
