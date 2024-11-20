import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";

import Login from "./Page/Auth/Login";
import Signup from "./Page/Auth/Signup";

import CreatorDashboard from "./Page/Creator/CreatorDashboard";
import BookCreator from "./Page/Creator/BookCreator";
import EbookEditor from "./Page/Creator/EbookEditor";
import EbookViewer from "./Page/Creator/EbookViewer";
import BookReader from "./Page/Reader/BookReader";
import MyBooks from "./Page/Creator/MyBooks";
import AdminUserManagement from "./Page/User/AdminUserManagement";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./Page/User/ProfilePage";
import Chat from "./Page/Chat/Chat";

function App() {
  return (
    <Provider store={store}>
      {/* <SocketProvider> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/user-management"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminUserManagement />
                </PrivateRoute>
              }
            />

            <Route
              path="/creator"
              element={
                <PrivateRoute allowedRoles={["admin", "editor"]}>
                  <CreatorDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/myEbooks"
              element={
                <PrivateRoute allowedRoles={["admin", "editor"]}>
                  <MyBooks />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute allowedRoles={["admin", "editor", "user"]}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            <Route
              path="#chat"
              element={
                <PrivateRoute allowedRoles={["admin", "editor", "user"]}>
                  {/* <Chat /> */}
                </PrivateRoute>
              }
            />

            <Route path="/creator/create" element={<BookCreator />} />
            <Route path="/creator/editor/:id" element={<EbookEditor />} />
            <Route path="/creator/viewer/:id" element={<EbookViewer />} />

            <Route path="/reader" element={<BookReader />} />
            <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
          </Routes>
        </Router>
      {/* </SocketProvider> */}
    </Provider>
  );
}

export default App;
