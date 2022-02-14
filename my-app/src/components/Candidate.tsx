import React from "react";
import { Candidate, CandidateState } from "./Home";
import styled from "styled-components";

const Card = styled.div`
  background: #b8ac58;
  border-radius: 0.2rem;
  margin-top: 0.8rem;
  padding: 0.5rem;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Name = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

const Cross = styled.p`
  margin: 0;
  padding: 0;
  margin-left: auto;
`;

const Note = styled.p`
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  background: #9c6754;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  border-style: none;
  text-align: center;
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
`;

type Props = {
  candidate: Candidate;
  candidates: CandidateState;
  setCandidates: React.Dispatch<React.SetStateAction<any>>;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  setDeleteCandidate: React.Dispatch<React.SetStateAction<any>>;
};

export const CandidateComponent: React.FC<Props> = ({
  candidate,
  candidates,
  setCandidates,
  setShowModal,
  setDeleteCandidate,
}) => {
  const add = () => {
    if (candidate.status !== "Rejection") {
      const candidateToUpdate = candidates.findIndex(
        (el) => el.fullName === candidate.fullName
      );

      const newCandidates = [...candidates];

      if (newCandidates[candidateToUpdate].status === "First Interview") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Tecnical Interview",
        };
      } else if (
        newCandidates[candidateToUpdate].status === "Tecnical Interview"
      ) {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Offer",
        };
      } else if (newCandidates[candidateToUpdate].status === "Offer") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Assignment",
        };
      } else if (newCandidates[candidateToUpdate].status === "Assignment") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Rejection",
        };
      }

      setCandidates(newCandidates);
    }
  };

  const substract = () => {
    if (candidate.status !== "First Interview") {
      const candidateToUpdate = candidates.findIndex(
        (el) => el.fullName === candidate.fullName
      );

      const newCandidates = [...candidates];

      if (newCandidates[candidateToUpdate].status === "Rejection") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Assignment",
        };
      } else if (newCandidates[candidateToUpdate].status === "Assignment") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Offer",
        };
      } else if (newCandidates[candidateToUpdate].status === "Offer") {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "Tecnical Interview",
        };
      } else if (
        newCandidates[candidateToUpdate].status === "Tecnical Interview"
      ) {
        newCandidates[candidateToUpdate] = {
          ...newCandidates[candidateToUpdate],
          status: "First Interview",
        };
      }

      setCandidates(newCandidates);
    }
  };

  const handleDelete = (candidateName: String) => {
    setShowModal(true);
    setDeleteCandidate(candidateName);
  };

  return (
    <>
      {candidate && (
        <Card>
          <div>
            <FlexDiv>
              <Name>{candidate.fullName}</Name>
              <Cross onClick={() => handleDelete(candidate.fullName)}>X</Cross>
            </FlexDiv>
            <Note>{candidate.note}</Note>
          </div>
          <ButtonsWrap>
            <Button onClick={substract}>-</Button>
            <Button onClick={add}>+</Button>
          </ButtonsWrap>
        </Card>
      )}
    </>
  );
};
