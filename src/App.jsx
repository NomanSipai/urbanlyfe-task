import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import { Toaster } from "react-hot-toast";
import CreateOrEditPage from "./pages/CreateOrEditUser";
import ViewUser from "./pages/ViewUser";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/users/create" element={<CreateOrEditPage />} />
        <Route path="/users/edit/:id" element={<CreateOrEditPage />} />
        <Route path="/users/view/:id" element={<ViewUser />} />
      </Routes>
    </Router>
  );
};

export default App;
