import "./App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-forms/ProfileForm";
import ExperienceForm from "./components/profile-forms/ExperienceForm";
import EducationForm from "./components/profile-forms/EducationForm";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";
// redux
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="edit-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="experience"
              element={<PrivateRoute component={ExperienceForm} />}
            />
            <Route
              path="education"
              element={<PrivateRoute component={EducationForm} />}
            />
            <Route path="posts" element={<PrivateRoute component={Posts} />} />
            <Route
              path="posts/:id"
              element={<PrivateRoute component={Post} />}
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
