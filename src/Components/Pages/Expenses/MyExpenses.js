import { useEffect } from "react";
import { fetchExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { initializeMyExpense } from "../../Store/Slices/ExpenseSlice";

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
    <div>
      <h3 className="text-light">My Expenses</h3>
      <ul className="text-light">
        {myExpenses.map((exp) => (
          <li key={exp.id}>
            ${exp.amount}- {exp.category} - {exp.description}
            {"   "}
            <button>Edit</button>
            {"   "}
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyExpense;
