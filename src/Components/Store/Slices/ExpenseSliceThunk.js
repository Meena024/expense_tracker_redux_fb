import firebaseApp from "../../Firebase/initialize";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  remove,
  update,
} from "firebase/database";
import {
  setAddedExpense,
  setDeleteExpense,
  setEditExpense,
} from "./ExpenseSlice";

const database = getDatabase(firebaseApp);

export const addExpense = (exp) => {
  return async (dispatch) => {
    const exp_id = Date.now();
    const user_id = localStorage.getItem("uid");

    if (!user_id) {
      throw new Error("User is not authenticated");
    }
    const expense = { ...exp, id: exp_id, userId: user_id };
    await set(ref(database, `expenses/${user_id}/${exp_id}`), expense);

    console.log("expense added successfully!");

    dispatch(setAddedExpense(expense));

    return exp_id;
  };
};

export const fetchExpense = async () => {
  const user_id = localStorage.getItem("uid");

  if (!user_id) {
    throw new Error("User is not authenticated");
  }

  try {
    const snapshot = await get(child(ref(database), `expenses/${user_id}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convert object of expenses to array
      const expenses = Object.values(data);
      // console.log(expenses);
      return expenses;
    } else {
      return []; // no data found
    }
  } catch (err) {
    console.error("Error fetching expenses: ", err);
    throw err;
  }
};

export const deleteExpense = (expenseId) => {
  return async (dispatch) => {
    const user_id = localStorage.getItem("uid");

    if (!user_id) {
      throw new Error("User is not authenticated");
    }

    try {
      await remove(ref(database, `expenses/${user_id}/${expenseId}`));
      console.log(`Expense with ID ${expenseId} deleted`);
      dispatch(setDeleteExpense(expenseId)); // update store
    } catch (err) {
      console.error("Error deleting expense:", err);
      throw err;
    }
  };
};

export const editExpense = (expenseId, updatedData) => {
  return async (dispatch) => {
    const user_id = localStorage.getItem("uid");

    if (!user_id) {
      throw new Error("User is not authenticated");
    }

    try {
      await update(
        ref(database, `expenses/${user_id}/${expenseId}`),
        updatedData
      );
      console.log(`Expense with ID ${expenseId} edited`);
    } catch (err) {
      console.error("Error editing expense:", err);
      throw err;
    }
    dispatch(setEditExpense({ ...updatedData, id: expenseId }));
  };
};
