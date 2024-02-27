// import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styleComp.css";
import Formcontainer from "../formcontainer";
import { useForm, SubmitHandler } from "react-hook-form";

interface datas {
  description: string;
  amount: Number;
  category: string;
}

interface FormComponentProps {
  onSubmit: (data: datas) => void;
}

const expenseForm: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<datas>();

  const handleForm: SubmitHandler<datas> = (data) => {
    onSubmit(data);

    reset();
  };
  return (
    <>
      <Formcontainer>
        <h1 className="textH mb-5  text-center">Expense Cart</h1>
        <Form onSubmit={handleSubmit(handleForm)} action="">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="textM">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              {...register("description", {
                required: true,
                minLength: 3,
              })}
            />
            {errors.description?.type === "required" && (
              <p className="text-danger">Please enter description</p>
            )}
            {errors.description?.type === "minLength" && (
              <p className="text-danger">
                description should be at least 3 character
              </p>
            )}
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="textM">Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="$"
              {...register("amount", { required: true })}
            />
            {errors.amount && <p className="text-danger">Amount is required</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="textM">Category</Form.Label>
            <Form.Select {...register("category", { required: true })}>
              <option hidden value="">
                Select one...
              </option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </Form.Select>
            {errors.category && (
              <p className="text-danger">Category is required</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Formcontainer>
    </>
  );
};

export default expenseForm;
