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
  MyExpenses: JSON.parse(localStorage.getItem("expenses")) || [],
  expenseToEdit: null,
  isPremium: JSON.parse(localStorage.getItem("isPremium")) || false,
  color: localStorage.getItem("themeColor") || "rgb(78,70,70)",
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    setEditExpense: (state, action) => {
      state.MyExpenses = state.MyExpenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
    },

    setExpenseToEdit: (state, action) => {
      state.expenseToEdit = action.payload;
    },
    clearExpenseToEdit: (state) => {
      state.expenseToEdit = null;
    },

    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
      localStorage.setItem("isPremium", JSON.stringify(action.payload));
    },

    setColor: (state, action) => {
      state.color = action.payload;
      localStorage.setItem("themeColor", action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, action) => {
        state.MyExpenses = [action.payload, ...state.MyExpenses];
        localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.MyExpenses = action.payload;
        localStorage.setItem("expenses", JSON.stringify(action.payload));
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.MyExpenses = state.MyExpenses.filter(
          (expense) => expense.id !== action.payload
        );
        localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        state.MyExpenses = state.MyExpenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedData } : expense
        );
        localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
      })

      .addCase(setPremium.fulfilled, (state) => {
        state.isPremium = true;
        localStorage.setItem("isPremium", "true");
      })
      .addCase(fetchPremiumStatus.fulfilled, (state, action) => {
        state.isPremium = action.payload;
        localStorage.setItem("isPremium", JSON.stringify(action.payload));
      })

      .addCase(addExpense.rejected, (_, action) => {
        console.error("Add failed:", action.payload);
      })
      .addCase(editExpense.rejected, (_, action) => {
        console.error("Edit failed:", action.payload);
      })
      .addCase(setPremium.rejected, (_, action) => {
        console.error("Set premium failed:", action.payload);
      })
      .addCase(fetchPremiumStatus.rejected, (_, action) => {
        console.error("Fetch premium status failed:", action.payload);
      });
  },
});

export const {
  setExpenseToEdit,
  clearExpenseToEdit,
  setEditExpense,
  setIsPremium,
  setColor,
} = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
