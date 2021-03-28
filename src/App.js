import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Redirect, Route, Switch } from "react-router-dom";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";

const pages = [
  {
    path: "/",
    component: ToDo
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/task/:id",
    component: SingleTask
  },
  {
    path: "/404",
    component: NotFound
  }
]

function App() {
  const pageRoutes = pages.map((page, index) => {
    return (
      <Route
        key={index}
        path={page.path}
        component={page.component}
        exact
      />
    )
  })
  return (
    <div>
      <NavBar />
      <Switch>
       {pageRoutes}
       <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
