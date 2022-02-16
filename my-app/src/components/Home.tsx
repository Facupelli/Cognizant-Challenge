import React, { useState } from "react";
import styled from "styled-components";
import { AddCandidate } from "./AddCandidate";
import { CandidateComponent } from "./Candidate";
import { Modal } from "./Modal";

const Board = styled.div`
  // background: red;
  display: grid;
  grid-template-columns: repeat(5, 18%);
  column-gap: 10px;
  row-gap: 10px;
  justify-content: center;
  height: 80vh;
  padding-top: 2rem;

  @media (max-width: 600px) {
    margin: 1rem;
  }
`;

const Column = styled.div`
  box-sizing: border-box;
  background: #ededed;
  padding: 0.6rem;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  overflow-y: auto;

  @media (max-width: 600px) {
    grid-column: 1/-1;
    height: 100vh;
  }
`;

const ColumnTitle = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0px;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f09090;
`;

const BottomColumn = styled.div`
  // background: #ffcebd;
  // grid-column-start: 1;
  // grid-column-end: 3;
  margin-left: 3rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    position: fixed;
    margin: 0;
    margin-left: 2rem;
    top: 92%;
  }
`;

const Button = styled.button`
  background: #f09090;
  color: white;
  &:hover {
    background: #f0d8d8;
    box-shadow: none;
    color: #706565;
  }
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 8px;
  border-style: none;
  text-align: center;
  font-weight: bold;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export type CandidateState = Candidate[];

export type Candidate = {
  fullName: string;
  note: string;
  status: string;
  id: number;
};

export const Home: React.FC = () => {
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [deleteCandidate, setDeleteCandidate] = useState<number>(0);
  const [editCandidate, setEditCandidate] = useState<Candidate>({
    fullName: "",
    note: "",
    status: "",
    id: 0,
  });

  const [id, setId] = useState<number>(1);

  const [candidates, setCandidates] = useState<CandidateState>([]);
  console.log("candidates", candidates);

  const hanldeAddCandidate = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Board>
        <Column>
          <ColumnTitle>First Interview</ColumnTitle>
          {candidates.length > 0 &&
            candidates.map((el, i) => {
              if (el.status === "First Interview") {
                return (
                  <CandidateComponent
                    key={i}
                    candidate={el}
                    candidates={candidates}
                    setCandidates={setCandidates}
                    setShowModal={setShowModal}
                    setDeleteCandidate={setDeleteCandidate}
                    setShowForm={setShowForm}
                    setEditCandidate={setEditCandidate}
                  />
                );
              } else {
                return null;
              }
            })}
        </Column>
        <Column>
          <ColumnTitle>Tecnical Interview</ColumnTitle>
          {candidates.length > 0 &&
            candidates.map((el, i) => {
              if (el.status === "Tecnical Interview") {
                return (
                  <CandidateComponent
                    key={i}
                    candidate={el}
                    candidates={candidates}
                    setCandidates={setCandidates}
                    setShowModal={setShowModal}
                    setDeleteCandidate={setDeleteCandidate}
                    setShowForm={setShowForm}
                    setEditCandidate={setEditCandidate}
                  />
                );
              } else {
                return null;
              }
            })}
        </Column>
        <Column>
          <ColumnTitle>Offer</ColumnTitle>
          {candidates.length > 0 &&
            candidates.map((el, i) => {
              if (el.status === "Offer") {
                return (
                  <CandidateComponent
                    key={i}
                    candidate={el}
                    candidates={candidates}
                    setCandidates={setCandidates}
                    setShowModal={setShowModal}
                    setDeleteCandidate={setDeleteCandidate}
                    setShowForm={setShowForm}
                    setEditCandidate={setEditCandidate}
                  />
                );
              } else {
                return null;
              }
            })}
        </Column>
        <Column>
          <ColumnTitle>Assignment</ColumnTitle>
          {candidates.length > 0 &&
            candidates.map((el, i) => {
              if (el.status === "Assignment") {
                return (
                  <CandidateComponent
                    key={i}
                    candidate={el}
                    candidates={candidates}
                    setCandidates={setCandidates}
                    setShowModal={setShowModal}
                    setDeleteCandidate={setDeleteCandidate}
                    setShowForm={setShowForm}
                    setEditCandidate={setEditCandidate}
                  />
                );
              } else {
                return null;
              }
            })}
        </Column>
        <Column>
          <ColumnTitle>Rejection</ColumnTitle>
          {candidates.length > 0 &&
            candidates.map((el, i) => {
              if (el.status === "Rejection") {
                return (
                  <CandidateComponent
                    key={i}
                    candidate={el}
                    candidates={candidates}
                    setCandidates={setCandidates}
                    setShowModal={setShowModal}
                    setDeleteCandidate={setDeleteCandidate}
                    setShowForm={setShowForm}
                    setEditCandidate={setEditCandidate}
                  />
                );
              } else {
                return null;
              }
            })}
        </Column>
      </Board>
      <BottomColumn>
        <Button onClick={hanldeAddCandidate}>Add Candidate</Button>
      </BottomColumn>
      {showForm && (
        <AddCandidate
          setShowForm={setShowForm}
          setCandidates={setCandidates}
          candidates={candidates}
          editCandidate={editCandidate}
          setEditCandidate={setEditCandidate}
          id={id}
          setId={setId}
        />
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          candidates={candidates}
          setCandidates={setCandidates}
          deleteCandidate={deleteCandidate}
        />
      )}
    </div>
  );
};
