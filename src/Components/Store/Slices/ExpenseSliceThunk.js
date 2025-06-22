import firebaseApp from "../../Firebase/initialize";
import { getDatabase, ref, set, child, get } from "firebase/database";

const database = getDatabase(firebaseApp);

export const addExpense = async (exp) => {
  const exp_id = Date.now();
  const user_id = localStorage.getItem("uid");

  if (!user_id) {
    throw new Error("User is not authenticated");
  }

  await set(ref(database, `expenses/${user_id}/${exp_id}`), {
    ...exp,
    id: exp_id,
    userId: user_id,
  });

  return exp_id;
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
