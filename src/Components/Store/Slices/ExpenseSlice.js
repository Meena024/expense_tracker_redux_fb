import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MyExpenses: [],
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.MyExpenses = [action.payload, ...state.MyExpenses];
      //   console.log("MyExpenses", state.MyExpenses);
    },
  },
});

export const { setExpense } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
