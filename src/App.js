import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import { store } from "./Components/Store/store";
import AuthInitializer from "./Components/AuthInitializer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer />
        <h1 className="m-5 text-light">Welcome to EXPENSE TRACKER!</h1>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
