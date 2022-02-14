import React from "react";
import { Candidate, CandidateState } from "./Home";
import styled from "styled-components";

const Card = styled.div`
  background: #b8ac58;
  border-radius: 0.2rem;
  margin-top: 0.8rem;
  padding: 0.5rem;
`;

const Name = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
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
};

export const CandidateComponent: React.FC<Props> = ({
  candidate,
  candidates,
  setCandidates,
}) => {
  const add = () => {
    if (candidate.status !== "Rejection") {
      const newCandidates = candidates.map((el) => {
        if (el.fullName === candidate.fullName) {
          if (el.status === "First Interview") {
            return { ...el, status: "Tecnical Interview" };
          }
          if (el.status === "Tecnical Interview") {
            return { ...el, status: "Offer" };
          }
          if (el.status === "Offer") {
            return { ...el, status: "Assignment" };
          }
          if (el.status === "Assignment") {
            return { ...el, status: "Rejection" };
          }
          return el;
        }
      });
      console.log(newCandidates);
      setCandidates(newCandidates);
    }
  };

  const substract = () => {
    if (candidate.status !== "First Interview") {
      const newCandidates = candidates.map((el) => {
        if (el.fullName === candidate.fullName) {
          if (el.status === "Rejection") {
            return { ...el, status: "Assignment" };
          }
          if (el.status === "Assignment") {
            return { ...el, status: "Offer" };
          }
          if (el.status === "Offer") {
            return { ...el, status: "Tecnical Interview" };
          }
          if (el.status === "Tecnical Interview") {
            return { ...el, status: "First Interview" };
          }
          return el;
        }
      });
      console.log(newCandidates);
      setCandidates(newCandidates);
    }
  };

  return (
    <>
      {candidate && (
        <Card>
          <div>
            <Name>{candidate.fullName}</Name>
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
