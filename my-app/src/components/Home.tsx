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
  min-height: 90vh;
`;

const Column = styled.div`
  background: #A49393;
  padding: 10px;
  min-height: 70vh;
  border-radius: 0.5rem;
`;

const ColumnTitle = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0px;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #706565;
`;

const BottomColumn = styled.div`
  // background: #ffcebd;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const Button = styled.button`
  background: #9c6754;
  color: white;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 8px;
  border-style: none;
  text-align: center;
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

  const [id, setId] = useState<number>(1)

  const [candidates, setCandidates] = useState<CandidateState>([]);
  console.log("candidates", candidates);

  const hanldeAddCandidate = () => {
    setShowForm(true);
  };

  return (
    <>
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
              }else{
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
              }else{
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
              }else{
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
              }else{
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
              }else{
                return null;
              }
            })}
        </Column>
        <BottomColumn>
          <Button onClick={hanldeAddCandidate}>Add Candidate</Button>
        </BottomColumn>
      </Board>
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
    </>
  );
};
