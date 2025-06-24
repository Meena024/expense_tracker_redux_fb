import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MyExpenses: [],
  expenseToEdit: null,
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    initializeMyExpense: (state, action) => {
      state.MyExpenses = action.payload;
      console.log("initialize", state.MyExpenses);
    },
    setAddedExpense: (state, action) => {
      state.MyExpenses = [action.payload, ...state.MyExpenses];
      console.log("add expense", state.MyExpenses);
    },
    setDeleteExpense: (state, action) => {
      state.MyExpenses = state.MyExpenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    setEditExpense: (state, action) => {
      state.MyExpenses = state.MyExpenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      console.log("edit", state.MyExpenses);
    },
    setExpenseToEdit: (state, action) => {
      state.expenseToEdit = action.payload;
    },
    clearExpenseToEdit: (state) => {
      console.log("clear expense to edit");
      state.expenseToEdit = null;
    },
  },
});

export const {
  initializeMyExpense,
  setExpenseToEdit,
  clearExpenseToEdit,
  setAddedExpense,
  setDeleteExpense,
  setEditExpense,
} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
