import { db } from "../../Firebase/initialize";
import { ref, set, child, get, remove, update } from "firebase/database";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUID = () => localStorage.getItem("uid");

const ensureAuth = (rejectWithValue) => {
  const uid = getUID();
  if (!uid) return rejectWithValue("User is not authenticated");
  return uid;
};

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (exp, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    const exp_id = Date.now();
    const expense = { ...exp, id: exp_id, userId: uid };

    try {
      await set(ref(db, `expenses/${uid}/${exp_id}`), expense);
      return expense;
    } catch (err) {
      console.error("Add expense failed:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (_, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    try {
      const snap = await get(child(ref(db), `expenses/${uid}`));
      return snap.exists() ? Object.values(snap.val()) : [];
    } catch (err) {
      console.error("Fetch expense failed:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    try {
      await remove(ref(db, `expenses/${uid}/${expenseId}`));
      return expenseId;
    } catch (err) {
      console.error("Delete expense failed:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async ({ id, exp }, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    try {
      const updated = { ...exp, id };
      await update(ref(db, `expenses/${uid}/${id}`), updated);
      return { id, updatedData: exp };
    } catch (err) {
      console.error("Edit expense failed:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const setPremium = createAsyncThunk(
  "expense/setPremium",
  async (val, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    try {
      await set(ref(db, `premium/${uid}/isPremium`), val);
      return val;
    } catch (err) {
      console.error("Set premium failed:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPremiumStatus = createAsyncThunk(
  "expense/fetchPremiumStatus",
  async (_, { rejectWithValue }) => {
    const uid = ensureAuth(rejectWithValue);
    if (!uid) return;

    try {
      const snap = await get(ref(db, `premium/${uid}/isPremium`));
      return snap.exists() ? snap.val() : false;
    } catch (err) {
      console.error("Fetch premium status failed:", err);
      return rejectWithValue(err.message);
    }
  }
);
