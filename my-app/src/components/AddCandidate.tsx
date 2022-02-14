import React from "react";
import { useForm } from "react-hook-form";
import { CandidateState } from "./Home";

type FormData = {
  fullName: string;
  note: string;
};

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<any>>;
  setCandidates: React.Dispatch<React.SetStateAction<any>>;
  candidates: CandidateState;
};

export const AddCandidate: React.FC<Props> = ({
  setShowForm,
  setCandidates,
  candidates,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    const candiadateData = {
      fullName: data.fullName,
      note: data.note,
      status: "First Interview",
    };
    setCandidates([...candidates, candiadateData]);
    reset();
  });

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Full Name</label>
      <input {...register("fullName")} />
      <label>Note</label>
      <input {...register("note")} />
      <button type="submit">ADD</button>
      <p onClick={handleCloseForm}>X</p>
    </form>
  );
};
