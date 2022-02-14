import React from "react";
import { useForm } from "react-hook-form";
import { Candidate, CandidateState } from "./Home";
import { ModalStyled } from "./Modal";
import styled from "styled-components";

const Container = styled.div`
  margin: 15% auto;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 2px solid #b36b6b;
  width: 30%;
  background: white;
  font-size: 1.2rem;
`;

type FormData = {
  fullName: string;
  note: string;
};

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<any>>;
  setCandidates: React.Dispatch<React.SetStateAction<any>>;
  candidates: CandidateState;
  editCandidate: Candidate;
  setEditCandidate: React.Dispatch<React.SetStateAction<any>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<any>>;
};

export const AddCandidate: React.FC<Props> = ({
  setShowForm,
  setCandidates,
  candidates,
  editCandidate,
  setEditCandidate,
  id,
  setId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    // EDIT CANDIDATE
    if (editCandidate.fullName.length > 0) {
      const candidateToUpdate = candidates.findIndex(
        (el) => el.id === editCandidate.id
      );

      const newCandidates = [...candidates];

      newCandidates[candidateToUpdate].fullName = data.fullName;
      newCandidates[candidateToUpdate].note = data.note;

      setCandidates(newCandidates);
      setEditCandidate({
        fullName: "",
        note: "",
        status: "",
        id: 0,
      });
    } else {
      // ADD CANDIDATE
      const candiadateData = {
        fullName: data.fullName,
        note: data.note,
        status: "First Interview",
        id,
      };

      setId(id + 1);

      const sameName = candidates.filter((el) => el.fullName === data.fullName);
      if (sameName.length > 0) {
        console.log("CANDIDATES CANT HAVE THE SAME NAME");
        // ADD CANDIDATE
      } else {
        setCandidates([...candidates, candiadateData]);
        reset();
        setEditCandidate({
          fullName: "",
          note: "",
          status: "",
          id: 0,
        });
      }
    }
    setShowForm(false);
  });

  const handleCloseForm = () => {
    setShowForm(false);
    setEditCandidate({
      fullName: "",
      note: "",
      status: "",
      id: 0,
    });
  };

  const handleEdit = () => {};

  return (
    <ModalStyled>
      <Container>
        <form onSubmit={onSubmit}>
          <label>Full Name</label>
          {editCandidate.fullName.length > 0 ? (
            <input
              {...register("fullName")}
              defaultValue={editCandidate.fullName}
            />
          ) : (
            <input {...register("fullName")} />
          )}

          <label>Note</label>
          {editCandidate.fullName.length > 0 ? (
            <input {...register("note")} defaultValue={editCandidate.note} />
          ) : (
            <input {...register("note")} />
          )}

          {editCandidate.fullName.length > 0 ? (
            <button type="submit">EDIT</button>
          ) : (
            <button type="submit">ADD</button>
          )}
          <p onClick={handleCloseForm}>X</p>
        </form>
      </Container>
    </ModalStyled>
  );
};
