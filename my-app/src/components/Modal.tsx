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
  width: 30%;
  background: white;
  font-size: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Title = styled.p`
  text-align: center;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  background: #f0d8d8;
  color: #706565;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 8px;
  border-style: none;
  text-align: center;
  &:hover {
    background: #706565;
    color: #f0d8d8;
  }
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
