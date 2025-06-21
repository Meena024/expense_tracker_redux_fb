import firebaseApp from "../../Firebase/initialize";
import { getDatabase, ref, set } from "firebase/database";

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
