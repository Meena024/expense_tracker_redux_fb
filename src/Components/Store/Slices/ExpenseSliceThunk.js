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
import { createAsyncThunk } from "@reduxjs/toolkit";

const database = getDatabase(firebaseApp);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (exp, { rejectWithValue }) => {
    const exp_id = Date.now();
    const user_id = localStorage.getItem("uid");

    if (!user_id) return rejectWithValue("User is not authenticated");

    const expense = { ...exp, id: exp_id, userId: user_id };
    try {
      await set(ref(database, `expenses/${user_id}/${exp_id}`), expense);
      return expense;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (_, { rejectWithValue }) => {
    const user_id = localStorage.getItem("uid");
    if (!user_id) return rejectWithValue("User is not authenticated");

    try {
      const snapshot = await get(child(ref(database), `expenses/${user_id}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data);
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, { rejectWithValue }) => {
    const user_id = localStorage.getItem("uid");
    if (!user_id) return rejectWithValue("User is not authenticated");

    try {
      await remove(ref(database, `expenses/${user_id}/${expenseId}`));
      return expenseId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async ({ id, exp }, { rejectWithValue }) => {
    const user_id = localStorage.getItem("uid");
    if (!user_id) return rejectWithValue("User is not authenticated");

    try {
      await update(ref(database, `expenses/${user_id}/${id}`), exp);
      return { id, updatedData: exp };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const setPremium = createAsyncThunk(
  "expense/setPremium",
  async (val, { rejectWithValue }) => {
    const user_id = localStorage.getItem("uid");
    if (!user_id) return rejectWithValue("User is not authenticated");

    try {
      await set(ref(database, `premium/${user_id}/isPremium`), val);
      return val;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPremiumStatus = createAsyncThunk(
  "expense/fetchPremiumStatus",
  async (_, { rejectWithValue }) => {
    const user_id = localStorage.getItem("uid");
    if (!user_id) return rejectWithValue("User is not authenticated");

    try {
      const snapshot = await get(ref(database, `premium/${user_id}/isPremium`));
      return snapshot.exists() ? snapshot.val() : false;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
