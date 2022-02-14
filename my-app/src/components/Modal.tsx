import React from "react";
import styled from "styled-components";
import { CandidateState } from "./Home";

export const ModalStyled = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  margin: 15% auto;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 2px solid #b36b6b;
  width: 30%;
  background: #f09090;
  font-size: 1.2rem;
`;

const Title = styled.p`
  text-align: center;
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`

const Button = styled.button`
  background: #f0d8d8;
  color: #706565;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 8px;
  border-style: none;
  text-align: center;
`;

type Props = {
  candidates: CandidateState;
  deleteCandidate: number;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  setCandidates: React.Dispatch<React.SetStateAction<any>>;
};

export const Modal: React.FC<Props> = ({
  setShowModal,
  candidates,
  setCandidates,
  deleteCandidate,
}) => {
  const handleNo = () => {
    setShowModal(false);
  };

  const handleYes = () => {
    const candidatesUpdated = candidates.filter(
      (el) => el.id !== deleteCandidate
    );

    setCandidates(candidatesUpdated);
    setShowModal(false);
  };

  return (
    <ModalStyled>
      <Container>
        <Title>Are you sure you want to delete this candidate?</Title>
        <FlexDiv>
          <Button onClick={handleYes}>YES</Button>
          <Button onClick={handleNo}>NO</Button>
        </FlexDiv>
      </Container>
    </ModalStyled>
  );
};
