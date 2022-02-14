import React from "react";
import { CandidateState } from "./Home";

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

    setCandidates(candidatesUpdated)
    setShowModal(false)
  };

  return (
    <div>
      <p>Are you sure you want to delete this candidate?</p>
      <button onClick={handleYes}>YES</button>
      <button onClick={handleNo}>NO</button>
    </div>
  );
};
