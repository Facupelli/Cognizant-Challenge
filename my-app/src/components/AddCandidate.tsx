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
  width: 30%;
  background: white;
  font-size: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  @media (max-width: 600px) {
    width: 85%;
    margin: 70% auto;
  }
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 30% 60%;
  align-items: baseline;
  row-gap: 1rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  margin-right: 1rem;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border-radius: 0.2rem;
  border: 1px solid #f0d8d8;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const MarginLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.8rem;
  margin-left: auto;
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
      setShowForm(false);
    } else {
      // ADD CANDIDATE
      if (data.fullName.length > 0) {
        const candiadateData = {
          fullName: data.fullName,
          note: data.note,
          status: "First Interview",
          id,
        };

        setId(id + 1);

        const sameName = candidates.filter(
          (el) => el.fullName === data.fullName
        );
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
          setShowForm(false);
        }
      }
    }
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

            <MarginLeft>
              {editCandidate.fullName.length > 0 ? (
                <Button type="submit">EDIT</Button>
              ) : (
                <Button type="submit">ADD</Button>
              )}
            </MarginLeft>
          </Form>
        </form>
      </Container>
    </ModalStyled>
  );
};
