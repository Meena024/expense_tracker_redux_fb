import { useEffect } from "react";
import {
  deleteExpense,
  fetchExpense,
} from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeMyExpense,
  setExpenseToEdit,
} from "../../Store/Slices/ExpenseSlice";
import { useNavigate } from "react-router";
import Card from "../../UI/Card";

const MyExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myExpenses = useSelector((state) => state.Expense.MyExpenses);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expenses = await fetchExpense();
        dispatch(initializeMyExpense(expenses));
      } catch (err) {
        console.error("Failed to load expenses:", err);
      }
    };

    loadExpenses();
  }, [dispatch]);

  const deleteHandler = async (exp_id) => {
    try {
      await dispatch(deleteExpense(exp_id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const editHandler = (exp) => {
    dispatch(setExpenseToEdit(exp));
    navigate("/addExpense");
  };

  return (
    <Card className="my-5">
      <h3 className="text-light">My Expenses</h3>
      <ul className="text-light">
        {myExpenses.map((exp) => (
          <li key={exp.id}>
            ${exp.amount}- {exp.category} - {exp.description}
            {"   "}
            <button onClick={() => editHandler(exp)}>Edit</button>
            {"   "}
            <button onClick={() => deleteHandler(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default MyExpense;
