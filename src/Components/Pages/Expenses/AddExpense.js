import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import { useEffect, useRef } from "react";
import classes from "../Authentication/SignUp.module.css";
import { addExpense, editExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearExpenseToEdit } from "../../Store/Slices/ExpenseSlice";

const AddExpense = () => {
  const dateRef = useRef();
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();

  const expenseToEdit = useSelector((state) => state.Expense.expenseToEdit);

  useEffect(() => {
    if (expenseToEdit) {
      dateRef.current.value = expenseToEdit.date;
      amountRef.current.value = expenseToEdit.amount;
      descRef.current.value = expenseToEdit.description;
      categoryRef.current.value = expenseToEdit.category;
    }
  }, [expenseToEdit]);

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const exp = {
      date: dateRef.current.value,
      amount: amountRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };
    try {
      if (expenseToEdit) {
        await dispatch(editExpense(expenseToEdit.id, exp));
        dispatch(clearExpenseToEdit());
      } else {
        const exp_id = await dispatch(addExpense(exp));
        console.log("Expense added successfully", exp_id);
      }
    } catch (err) {
      alert("Failed to add expense: " + err.message);
    }
    dateRef.current.value = "";
    amountRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <Card className="m-5">
      <h2 className="py-3">Add Expense</h2>
      <Form className={classes.form} onSubmit={addExpenseHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="amount">Date:</label>
          </div>
          <div className="col-7">
            <input
              id="date"
              type="date"
              className="form-control"
              ref={dateRef}
              autoComplete="transaction-amount"
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
              ref={amountRef}
              autoComplete="transaction-amount"
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
              ref={descRef}
            />
          </div>
        </div>

        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="category">Category:</label>
          </div>
          <div className="col-7">
            <select id="category" className="form-control" ref={categoryRef}>
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
            Add Expense
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default AddExpense;
