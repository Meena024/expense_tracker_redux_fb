import { useEffect } from "react";
import {
  fetchExpense,
  fetchPremiumStatus,
  setPremium,
} from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import ExpenseListing from "./ExpenseListing";
import classes from "../../Styles.module.css";

const MyExpense = () => {
  const dispatch = useDispatch();
  const myExpenses = useSelector((state) => state.Expense.MyExpenses);
  const isPremium = useSelector((state) => state.Expense.isPremium);

  const totalExpense = myExpenses.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );

  const premiumHandler = async () => {
    try {
      await dispatch(setPremium()).unwrap();
      console.log("Premium activated.");
    } catch (err) {
      console.error("Error activating premium:", err);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      try {
        await dispatch(fetchExpense()).unwrap();
        await dispatch(fetchPremiumStatus()).unwrap();
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    initialFetch();
  }, [dispatch]);

  const downloadCSV = () => {
    const csvRows = [
      ["Date", "Amount", "Category", "Description"],
      ...myExpenses.map((expense) => [
        expense.date,
        expense.amount,
        expense.category,
        expense.description,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="m-5">
      <div>
        <label className="mx-5">My Expenses</label>
        {totalExpense > 100 && !isPremium && (
          <button onClick={premiumHandler}>Activate Premium</button>
        )}
        {isPremium && <button onClick={downloadCSV}>Download CSV</button>}
      </div>
      <ul className={classes.li}>
        <Card className="mx-5 my-2 fw-bold fs-3">
          Total Expense: ${totalExpense}
        </Card>
        {myExpenses.map((exp) => (
          <ExpenseListing exp={exp} key={exp.id} />
        ))}
      </ul>
    </Card>
  );
};

export default MyExpense;
