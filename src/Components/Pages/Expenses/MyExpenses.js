import { useEffect, useMemo, useState } from "react";
import {
  fetchExpense,
  fetchPremiumStatus,
  setPremium,
} from "../../Store/Slices/ExpenseSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import ExpenseListing from "./ExpenseListing";
import classes from "../../Styles.module.css";
import { setColor, setIsPremium } from "../../Store/Slices/ExpenseSlice";

const MyExpense = () => {
  const dispatch = useDispatch();
  const myExpenses = useSelector((state) => state.Expense.MyExpenses);
  const isPremium = useSelector((state) => state.Expense.isPremium);
  const [color, setColorValue] = useState("#ffffff");

  const totalExpense = useMemo(
    () => myExpenses.reduce((total, exp) => total + Number(exp.amount), 0),
    [myExpenses]
  );

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColorValue(selectedColor);
    dispatch(setColor(selectedColor));
  };

  const premiumHandler = async () => {
    try {
      await dispatch(setPremium(true)).unwrap();
      dispatch(setIsPremium(true));
      console.log("Premium activated.");
    } catch (err) {
      console.error("Error activating premium:", err);
    }
  };

  const downloadCSV = () => {
    const csvRows = [
      ["Date", "Amount", "Category", "Description"],
      ...myExpenses.map(({ date, amount, category, description }) => [
        date,
        amount,
        category,
        description,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchExpense()).unwrap();
        await dispatch(fetchPremiumStatus()).unwrap();
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (totalExpense < 100 && isPremium) {
      dispatch(setPremium(false));
      dispatch(setIsPremium(false));
    }
  }, [totalExpense, isPremium, dispatch]);

  return (
    <Card className="m-5 p-3">
      <div>
        <label className="mx-5 my-3 fs-3">My Expenses</label>

        {totalExpense > 100 && !isPremium && (
          <button onClick={premiumHandler}>Activate Premium</button>
        )}

        {isPremium && (
          <>
            <button onClick={downloadCSV}>Download CSV</button>
            <button className="ms-5 pb-2">
              Change color:
              <input
                className="ms-3 mt-1"
                type="color"
                value={color}
                onChange={handleColorChange}
              />
            </button>
          </>
        )}
      </div>

      <ul className={classes.li}>
        <Card className="mx-2 my-2 fw-bold fs-3">
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
