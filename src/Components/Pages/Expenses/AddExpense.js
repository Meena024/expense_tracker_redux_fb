import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import classes from "../Authentication/SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, editExpense } from "../../Store/Slices/ExpenseSliceThunk";
import {
  clearExpenseToEdit,
  setEditExpense,
} from "../../Store/Slices/ExpenseSlice";

const AddExpense = () => {
  const dispatch = useDispatch();
  const expenseToEdit = useSelector((state) => state.Expense.expenseToEdit);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setDate(expenseToEdit.date || "");
      setAmount(expenseToEdit.amount || "");
      setDescription(expenseToEdit.description || "");
      setCategory(expenseToEdit.category || "");
    }
  }, [expenseToEdit]);

  const resetForm = () => {
    setDate("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const expense = {
      date,
      amount,
      description,
      category,
    };

    try {
      if (expenseToEdit) {
        await dispatch(editExpense({ id: expenseToEdit.id, exp: expense }));
        dispatch(setEditExpense({ ...expense, id: expenseToEdit.id }));
        dispatch(clearExpenseToEdit());
      } else {
        await dispatch(addExpense(expense));
        console.log("Expense added successfully");
      }
    } catch (err) {
      alert("Failed to submit expense: " + err.message);
    }

    resetForm();
  };

  return (
    <Card className="m-5">
      <h2 className="py-3">{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>
      <Form className={classes.form} onSubmit={submitHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="date">Date:</label>
          </div>
          <div className="col-7">
            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="amount">Amount:</label>
          </div>
          <div className="col-7">
            <input
              id="amount"
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="description">Description:</label>
          </div>
          <div className="col-7">
            <input
              id="description"
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="category">Category:</label>
          </div>
          <div className="col-7">
            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" type="submit">
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default AddExpense;
