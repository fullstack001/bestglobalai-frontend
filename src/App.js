import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Landing from "./Page/Landing/Landing";
import Login from "./Page/Auth/Login";
import Signup from "./Page/Auth/Signup";
import ResetPassword from "./Page/Auth/ResetPassword";
import Payment from "./Page/Payment";
import ExtraPayment from "./Page/Payment/extraPayment";
import PlanPage from "./Page/Plan";
import CreatorDashboard from "./Page/Creator/CreatorDashboard";
import BookCreator from "./Page/Creator/BookCreator";
import EbookEditor from "./Page/Creator/EbookEditor";
import EbookViewer from "./Page/Creator/EbookViewer";
import MyBooks from "./Page/Creator/MyBooks";
import AdminUserManagement from "./Page/User/AdminUserManagement";
import ProfilePage from "./Page/User/ProfilePage";
import ChangePassword from "./Page/User/ChangePassword";
import ExploreBooks from "./Page/Books/ExploreBooks";
import BlogPage from "./Page/Landing/BlogPage";
import BlogDetail from "./Page/Landing/BlogDetail";
import Contact from "./Page/Landing/Contact";
import Service from "./Page/Landing/Service";
import Terms from "./Page/Landing/Terms";
import Privacy from "./Page/Landing/Privacy";
import Faq from "./Page/Landing/Faq";
import VideoCreatorPage from "./Page/Video/Create/index";
import VideoLibraryPage from "./Page/Video/library/index";
import VideoTranslatePage from "./Page/Video/translate";
import SocialProfilePage from "./Page/Social/Profile";
import SocialPostPage from "./Page/Social/Post";
import AnalyticsPage from "./Page/Social/Analytics";
import BlogDashboard from "./Page/Blog/BlogDashboard";
import BlogCreator from "./Page/Blog/BlogCreator";
import BlogEditor from "./Page/Blog/BlogEditor";
import BlogViewer from "./Page/Blog/BlogViewer";
import ExploreContact from "./Page/Contact/ExploreContacts";
import ContactViewer from "./Page/Contact/ContactView";
import ExploreServiceOrders from "./Page/Service/ExploreServiceOrders";
import ServiceOrderViewer from "./Page/Service/ServiceOrderView";
import BookReader from "./Page/Reader/BookReader";
import FollowersPage from "./Page/Follower";
import AboutUS from "./Page/AboutUs";
import Pricing from "./Page/Pricing";

// Components
import PrivateRoute from "./components/PrivateRoute";

// Route Configuration
const routes = [
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/terms-and-condition", element: <Terms /> },
  { path: "/privacy-policy", element: <Privacy /> },
  { path: "/faq", element: <Faq /> },
  { path: "/services", element: <Service /> },
  { path: "/about-us", element: <AboutUS /> },
  { path: "/pricing", element: <Pricing /> },

  // Admin Routes
  {
    path: "/user-management",
    element: <AdminUserManagement />,
    allowedRoles: ["superAdmin", "admin"],
  },
  {
    path: "/admin/blogs",
    element: <BlogDashboard />,
    allowedRoles: ["superAdmin", "admin"],
  },
  {
    path: "/admin/blogs/creator",
    element: <BlogCreator />,
    allowedRoles: ["superAdmin"],
  },
  {
    path: "/admin/contacts",
    element: <ExploreContact />,
    allowedRoles: ["superAdmin"],
  },
  {
    path: "/admin/contacts/:id",
    element: <ContactViewer />,
    allowedRoles: ["superAdmin"],
  },
  {
    path: "/admin/services",
    element: <ExploreServiceOrders />,
    allowedRoles: ["superAdmin"],
  },
  {
    path: "/admin/services/:id",
    element: <ServiceOrderViewer />,
    allowedRoles: ["superAdmin"],
  },
  {
    path: "/admin/blogs/editor/:id",
    element: <BlogEditor />,
    allowedRoles: ["superAdmin", "admin"],
  },
  {
    path: "/admin/blogs/viewer/:id",
    element: <BlogViewer />,
    allowedRoles: ["superAdmin", "admin"],
  },

  // Creator Routes
  {
    path: "/creator",
    element: <CreatorDashboard />,
    allowedRoles: ["superAdmin", "admin", "editor"],
  },
  {
    path: "/creator/create",
    element: <BookCreator />,
    allowedRoles: ["superAdmin", "admin", "editor"],
  },
  {
    path: "/creator/editor/:id",
    element: <EbookEditor />,
    allowedRoles: ["superAdmin", "admin", "editor"],
  },
  {
    path: "/creator/viewer/:id",
    element: <EbookViewer />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/myEbooks",
    element: <MyBooks />,
    allowedRoles: ["superAdmin", "admin", "editor"],
  },

  // User Routes
  {
    path: "/payment",
    element: <Payment />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/extra-payment",
    element: <ExtraPayment />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/plans",
    element: <PlanPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/explore-ebooks",
    element: <ExploreBooks />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },

  // Video Routes
  {
    path: "/video/create-video",
    element: <VideoCreatorPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/video/my-videos",
    element: <VideoLibraryPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/video/video-translation",
    element: <VideoTranslatePage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },

  // Social Routes
  {
    path: "/social/profile",
    element: <SocialProfilePage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/social/post",
    element: <SocialPostPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },
  {
    path: "/social/analytics",
    element: <AnalyticsPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },

  //Follower Routes
  {
    path: "/followers",
    element: <FollowersPage />,
    allowedRoles: ["superAdmin", "admin", "editor", "user"],
  },

  // Landing Pages
  { path: "/contact", element: <Contact /> },
  { path: "/blogs", element: <BlogPage /> },
  { path: "/blog/:id", element: <BlogDetail /> },

  // Reader Routes
  { path: "/reader", element: <BookReader /> },

  // Unauthorized Route
  { path: "/unauthorized", element: <h1>Access Denied</h1> },
];

const renderRoutes = () => {
  return routes.map((route, index) => {
    const { path, element, allowedRoles } = route;

    return (
      <Route
        key={index}
        path={path}
        element={
          allowedRoles ? (
            <PrivateRoute allowedRoles={allowedRoles}>{element}</PrivateRoute>
          ) : (
            element
          )
        }
      />
    );
  });
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>{renderRoutes()}</Routes>
      </Router>
    </Provider>
  );
}

export default App;
