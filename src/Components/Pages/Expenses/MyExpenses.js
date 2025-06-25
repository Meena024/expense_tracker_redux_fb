import { useEffect } from "react";
import { fetchExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { initializeMyExpense } from "../../Store/Slices/ExpenseSlice";
import Card from "../../UI/Card";
import ExpenseListing from "./ExpenseListing";
import classes from "../../Styles.module.css";

const MyExpense = () => {
  const dispatch = useDispatch();
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

  return (
    <Card className="m-5 ">
      <h3 className="text-light">My Expenses</h3>
      <ul className={classes.li}>
        {myExpenses.map((exp) => (
          <ExpenseListing exp={exp} />
        ))}
      </ul>
    </Card>
  );
};

export default MyExpense;
