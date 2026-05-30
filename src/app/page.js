import styled from "styled-components";
import Button from "../components/Button/Button";
import Header from "../components/Header";
import TodaySection from "../components/TodaySection/TodaySection";
import ViewHistoryLink from "../components/ViewHistoryLink/ViewHistoryLink";

export default function Page() {
  const initialNow = Date.now();

  return (
    <Main>
      <Header>Today I...</Header>
      <TodaySection initialNow={initialNow} />
      <ViewHistoryLink />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
