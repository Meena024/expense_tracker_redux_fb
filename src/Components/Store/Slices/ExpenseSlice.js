import { createSlice } from "@reduxjs/toolkit";
import {
  addExpense,
  editExpense,
  setPremium,
  fetchPremiumStatus,
  fetchExpense,
  deleteExpense,
} from "./ExpenseSliceThunk";

const initialState = {
  MyExpenses: [],
  expenseToEdit: null,
  isPremium: false,
  color: "#4a0908", //"#410230",
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    initializeMyExpense: (state, action) => {
      state.MyExpenses = action.payload;
    },
    initializeIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    setAddedExpense: (state, action) => {
      state.MyExpenses = [action.payload, ...state.MyExpenses];
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
    },
    setExpenseToEdit: (state, action) => {
      state.expenseToEdit = action.payload;
    },
    clearExpenseToEdit: (state) => {
      state.expenseToEdit = null;
    },
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, action) => {
        state.MyExpenses = [action.payload, ...state.MyExpenses];
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.MyExpenses = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.MyExpenses = state.MyExpenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      // .addCase(editExpense.fulfilled, (state, action) => {
      //   const { id, updatedData } = action.payload;
      //   state.MyExpenses = state.MyExpenses.map((expense) =>
      //     expense.id === id ? { ...updatedData, id } : expense
      //   );
      // })
      .addCase(editExpense.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        state.MyExpenses = state.MyExpenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedData } : expense
        );
      })
      .addCase(setPremium.fulfilled, (state, action) => {
        state.isPremium = true;
      })
      .addCase(fetchPremiumStatus.fulfilled, (state, action) => {
        state.isPremium = action.payload;
      })
      .addCase(addExpense.rejected, (state, action) => {
        console.error("Add failed:", action.payload);
      })
      .addCase(editExpense.rejected, (state, action) => {
        console.error("Edit failed:", action.payload);
      })
      .addCase(setPremium.rejected, (state, action) => {
        console.error("Set premium failed:", action.payload);
      })
      .addCase(fetchPremiumStatus.rejected, (state, action) => {
        console.error("Fetch premium status failed:", action.payload);
      });
  },
});

export const {
  initializeMyExpense,
  initializeIsPremium,
  setExpenseToEdit,
  clearExpenseToEdit,
  setAddedExpense,
  setDeleteExpense,
  setEditExpense,
  setIsPremium,
  setColor,
} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
