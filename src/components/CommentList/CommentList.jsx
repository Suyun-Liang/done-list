import React from "react";
import { Trash2 } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import styled from "styled-components";
import Button from "../Button/Button";

function CommentList({ comments, entryId, canDeleteComment, onDeleteComment }) {
  function handleDelete(commentId) {
    if (!canDeleteComment) return;
    onDeleteComment(entryId, commentId);
  }
  return (
    <div>
      <UnorderedList>
        {comments.map((c) => (
          <Item key={c.id}>
            <Main>
              <TextGroup>
                <p>{c.text}</p>
              </TextGroup>
              <ActionGroup>
                {canDeleteComment && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      handleDelete(c.id);
                    }}
                  >
                    <Trash2 />
                    <VisuallyHidden>Delete comment</VisuallyHidden>
                  </Button>
                )}
              </ActionGroup>
            </Main>
          </Item>
        ))}
      </UnorderedList>
    </div>
  );
}

export default CommentList;

const UnorderedList = styled.ul`
  padding-inline-start: 20px;
`;

const Item = styled.li``;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextGroup = styled.div`
  min-width: 0;
  & p {
    overflow-wrap: anywhere;
  }
`;
const ActionGroup = styled.div`
  flex-shrink: 0;
`;
