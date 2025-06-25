import { deleteExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { setExpenseToEdit } from "../../Store/Slices/ExpenseSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import classes from "../../Styles.module.css";

const ExpenseListing = ({ exp }) => {
  console.log(exp, "exp");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className={classes.li}>
      {console.log(exp)}${exp.amount}- {exp.category} - {exp.description}
      {"   "}
      <button onClick={() => editHandler(exp)}>Edit</button>
      {"   "}
      <button onClick={() => deleteHandler(exp.id)}>Delete</button>
    </div>
  );
};

export default ExpenseListing;
