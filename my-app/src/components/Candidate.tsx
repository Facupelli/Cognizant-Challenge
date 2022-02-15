import React from "react";
import { Candidate, CandidateState } from "./Home";
import styled from "styled-components";
import {
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const Card = styled.div`
  background: #f0d8d8;
  border-radius: 0.2rem;
  margin-top: 0.8rem;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  &:hover{
    box-shadow:none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Name = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

export const Cross = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  height: 1.3rem;
  width: 1.3rem;
  cursor: pointer;
  color: #b36b6b;
  &:hover {
    color: #f09090;
  }
`;

const Note = styled.p`
  margin: 0;
  padding: 0;
`;

const Edit = styled.div`
  margin: 0 auto 0 0;
  padding: 0;
  height: 1.3rem;
  width: 1.3rem;
  cursor: pointer;
  color: #b36b6b;
  &:hover {
    color: #f09090;
  }
`;

const Move = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  color: #b36b6b;
  &:hover {
    color: #f09090;
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-top: 0.5rem;
`;

type Props = {
  candidate: Candidate;
  candidates: CandidateState;
  setCandidates: React.Dispatch<React.SetStateAction<any>>;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  setDeleteCandidate: React.Dispatch<React.SetStateAction<any>>;
  setShowForm: React.Dispatch<React.SetStateAction<any>>;
  setEditCandidate: React.Dispatch<React.SetStateAction<any>>;
};

export const CandidateComponent: React.FC<Props> = ({
  candidate,
  candidates,
  setCandidates,
  setShowModal,
  setDeleteCandidate,
  setShowForm,
  setEditCandidate,
}) => {
  const add = () => {
    if (candidate.status !== "Rejection") {
      const candidateToUpdate = candidates.findIndex(
        (el) => el.id === candidate.id
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
        (el) => el.id === candidate.id
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

  const handleEdit = () => {
    setEditCandidate(candidate);
    setShowForm(true);
  };

  const handleDelete = (candidateId: number) => {
    setShowModal(true);
    setDeleteCandidate(candidateId);
  };

  return (
    <>
      {candidate && (
        <Card>
          <div>
            <FlexDiv>
              <Name>{candidate.fullName}</Name>
              <Cross onClick={() => handleDelete(candidate.id)}>
                <TrashIcon />
              </Cross>
            </FlexDiv>
            <Note>{candidate.note}</Note>
          </div>
          <ButtonsWrap>
            <Edit onClick={handleEdit}>
              <PencilIcon />
            </Edit>
            <Move onClick={substract}>
              <ChevronLeftIcon />
            </Move>
            <Move onClick={add}>
              <ChevronRightIcon />
            </Move>
          </ButtonsWrap>
        </Card>
      )}
    </>
  );
};
