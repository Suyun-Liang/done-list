import React from "react";
import styled from "styled-components";
import Image from "next/image";

function EmptyState({
  illustration,
  illustrationSize = 300,
  title,
  description,
}) {
  return (
    <Wrapper>
      <Image
        src={illustration}
        alt=""
        width={illustrationSize}
        height={illustrationSize}
      />
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: var(--color-brown-900);
`;

const Description = styled.p`
  color: var(--color-brown-700);
`;

export default EmptyState;
