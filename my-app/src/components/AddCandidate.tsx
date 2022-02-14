import React from "react";
import { useForm } from "react-hook-form";
import { Candidate, CandidateState } from "./Home";
import { Button, ModalStyled } from "./Modal";
import styled from "styled-components";
import { XIcon } from "@heroicons/react/solid";
import { Cross } from "./Candidate";

const Container = styled.div`
  margin: 15% auto;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 2px solid #b36b6b;
  width: 30%;
  background: white;
  font-size: 1.2rem;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 30% 60%;
  align-items: baseline;
  row-gap: 1rem;
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border-radius: 0.2rem;
  border: 1px solid #f09090;
`;

const MarginLeft = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: end;
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
          <Cross onClick={handleCloseForm}>
            <XIcon />
          </Cross>

          <Form>
            <Label>Full Name:</Label>
            {editCandidate.fullName.length > 0 ? (
              <Input
                {...register("fullName")}
                defaultValue={editCandidate.fullName}
              />
            ) : (
              <Input {...register("fullName")} />
            )}
            <Label>Note:</Label>
            {editCandidate.fullName.length > 0 ? (
              <Input {...register("note")} defaultValue={editCandidate.note} />
            ) : (
              <Input {...register("note")} />
            )}
          </Form>

          {editCandidate.fullName.length > 0 ? (
            <MarginLeft>
              <Button type="submit">EDIT</Button>
            </MarginLeft>
          ) : (
            <MarginLeft>
              <Button type="submit">ADD</Button>
            </MarginLeft>
          )}
        </form>
      </Container>
    </ModalStyled>
  );
};
