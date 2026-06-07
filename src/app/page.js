import styled from "styled-components";
import Header from "../components/Header";
import TodaySection from "../components/TodaySection/TodaySection";
import TextLink from "../components/TextLink/TextLink";

export default function Page() {
  const initialNow = Date.now();

  return (
    <Main>
      <Header>Today I...</Header>
      <TodaySection initialNow={initialNow} />
      <div>
        <TextLink href="/history">View History</TextLink>
      </div>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
