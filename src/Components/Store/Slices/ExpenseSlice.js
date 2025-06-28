import { createSlice } from "@reduxjs/toolkit";
import {
  addExpense,
  editExpense,
  setPremium,
  fetchPremiumStatus,
  fetchExpense,
  deleteExpense,
} from "./ExpenseSliceThunk";

// ─────────────────────────────────────────────
// INITIAL STATE
const initialState = {
  MyExpenses: JSON.parse(localStorage.getItem("expenses")) || [],
  expenseToEdit: null,
  isPremium: JSON.parse(localStorage.getItem("isPremium")) || false,
  color: localStorage.getItem("themeColor") || "rgb(78,70,70)",
};

// ─────────────────────────────────────────────
// SLICE
const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    // Initialize Redux from localStorage or backup
    initializeMyExpense: (state, action) => {
      state.MyExpenses = action.payload || [];
      localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
    },
    initializeIsPremium: (state, action) => {
      state.isPremium = action.payload;
      localStorage.setItem("isPremium", JSON.stringify(action.payload));
    },

    // Local-only setters for offline/optimistic updates
    setAddedExpense: (state, action) => {
      state.MyExpenses = [action.payload, ...state.MyExpenses];
      localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
    },
    setDeleteExpense: (state, action) => {
      state.MyExpenses = state.MyExpenses.filter(
        (expense) => expense.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
    },
    setEditExpense: (state, action) => {
      state.MyExpenses = state.MyExpenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      localStorage.setItem("expenses", JSON.stringify(state.MyExpenses));
    },

    // Expense editor modal/panel state
    setExpenseToEdit: (state, action) => {
      state.expenseToEdit = action.payload;
    },
    clearExpenseToEdit: (state) => {
      state.expenseToEdit = null;
    },

    // Premium toggle from UI
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
      localStorage.setItem("isPremium", JSON.stringify(action.payload));
    },

    // UI Theme color
    setColor: (state, action) => {
      state.color = action.payload;
      localStorage.setItem("themeColor", action.payload);
    },
  },

  // ─────────────────────────────────────────────
  // Async Thunk Handlers (Backend Sync)
  extraReducers: (builder) => {
    builder
      // ─── EXPENSE CRUD ───────────────────────
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

      // ─── PREMIUM STATUS ─────────────────────
      .addCase(setPremium.fulfilled, (state) => {
        state.isPremium = true;
        localStorage.setItem("isPremium", "true");
      })
      .addCase(fetchPremiumStatus.fulfilled, (state, action) => {
        state.isPremium = action.payload;
        localStorage.setItem("isPremium", JSON.stringify(action.payload));
      })

      // ─── ERROR LOGGING (OPTIONAL) ───────────
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

// ─────────────────────────────────────────────
// EXPORTS
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
