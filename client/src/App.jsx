import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./features/Authentication/Login";
import User from "./features/Authentication/User";
import RequireAuth from "./features/Authentication/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
