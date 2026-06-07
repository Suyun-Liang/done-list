import styled from "styled-components";
import Header from "../../components/Header";
import HistoryView from "../../components/HistoryView/HistoryView";
import TextLink from "../../components/TextLink/TextLink";

export default function PastPage() {
  const initialNow = Date.now();
  return (
    <Main>
      <Header>History Memories</Header>
      <div>
        <TextLink href="/">Back To Home</TextLink>
      </div>
      <HistoryView initialNow={initialNow} />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
