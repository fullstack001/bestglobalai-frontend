import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Page/Landing/Landing";
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
import ChangePassword from "./Page/User/ChangePassword";
import ExploreBooks from "./Page/Books/ExploreBooks";
import Service from "./Page/Landing/Service";
import Contact from "./Page/Landing/Contact";

import BlogDashboard from "./Page/Blog/BlogDashboard";
import BlogCreator from "./Page/Blog/BlogCreator";
import BlogEditor from "./Page/Blog/BlogEditor";
import BlogViewer from "./Page/Blog/BlogViewer";

import BlogPage from "./Page/Landing/BlogPage";
import BlogDetail from "./Page/Landing/BlogDetail";

import ExploreContact from "./Page/Contact/ExploreContactss";
import ContactViewer from "./Page/Contact/ContactView";

function App() {
  return (
    <Provider store={store}>
      {/* <SocketProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user-management"
            element={
              <PrivateRoute allowedRoles={["superAdmin", "admin"]}>
                <AdminUserManagement />
              </PrivateRoute>
            }
          />

          <Route
            path="/creator"
            element={
              <PrivateRoute allowedRoles={["superAdmin", "admin", "editor"]}>
                <CreatorDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/myEbooks"
            element={
              <PrivateRoute allowedRoles={["superAdmin", "admin", "editor"]}>
                <MyBooks />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute
                allowedRoles={["superAdmin", "admin", "editor", "user"]}
              >
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="#chat"
            element={
              <PrivateRoute
                allowedRoles={["superAdmin", "admin", "editor", "user"]}
              >
                {/* <Chat /> */}
              </PrivateRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <PrivateRoute
                allowedRoles={["superAdmin", "admin", "editor", "user"]}
              >
                <ChangePassword />
              </PrivateRoute>
            }
          />

          <Route
            path="/explore-ebooks"
            element={
              <PrivateRoute
                allowedRoles={["superAdmin", "admin", "editor", "user"]}
              >
                <ExploreBooks />
              </PrivateRoute>
            }
          />

          <Route path="/creator/create" element={<BookCreator />} />
          <Route path="/creator/editor/:id" element={<EbookEditor />} />
          <Route path="/creator/viewer/:id" element={<EbookViewer />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          <Route
            path="/admin/blogs"
            element={
              <PrivateRoute allowedRoles={["superAdmin", "admin"]}>
                <BlogDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs/creator"
            element={
              <PrivateRoute allowedRoles={["superAdmin", "admin"]}>
                <BlogCreator />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/contacts"
            element={
              <PrivateRoute allowedRoles={["superAdmin"]}>
                <ExploreContact />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/contacts/:id"
            element={
              <PrivateRoute allowedRoles={["superAdmin"]}>
                <ContactViewer />
              </PrivateRoute>
            }
          />

          <Route path="/admin/blogs/editor/:id" element={<BlogEditor />} />
          <Route path="/admin/blogs/viewer/:id" element={<BlogViewer />} />

          <Route path="/reader" element={<BookReader />} />
          <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
          <Route path="/services" element={<Service />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
