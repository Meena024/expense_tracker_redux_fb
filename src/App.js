import Main from "./Components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./Components/Store/store";

function App() {
  return (
    <Provider store={store}>
      <h1 className="m-5 text-light">Welcome to EXPENSE TRACKER!</h1>
      <Main />
    </Provider>
  );
}

export default App;
