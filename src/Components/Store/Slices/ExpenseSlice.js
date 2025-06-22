import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MyExpenses: [],
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    initializeMyExpense: (state, action) => {
      state.MyExpenses = action.payload;
      // console.log(state.MyExpenses);
    },
  },
});

export const { initializeMyExpense } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
