import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoutes } from "@routes/routes";
import "@styles/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <Router>
        <PublicRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
  );
}

export default App;
