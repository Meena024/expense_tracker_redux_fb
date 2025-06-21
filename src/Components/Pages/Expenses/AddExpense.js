import { Form } from "react-bootstrap";
import Card from "../../UI/Card";
import { useRef } from "react";
import classes from "../Authentication/SignUp.module.css";
import { setExpense } from "../../Store/Slices/ExpenseSlice";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();

  const addExpenseHandler = (e) => {
    e.preventDefault();

    const exp = {
      amount: amountRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };
    console.log(exp);
    dispatch(setExpense(exp));
  };

  return (
    <Card className="my-5">
      <h2 className="py-3">Add Expense</h2>
      <Form className={classes.form} onSubmit={addExpenseHandler}>
        <div className="row m-2 align-items-center">
          <div className="col-3 text-end">
            <label htmlFor="amount">Amount:</label>
          </div>
          <div className="col-9">
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
          <div className="col-9">
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
          <div className="col-9">
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
