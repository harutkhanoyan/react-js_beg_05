import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Redirect, Route, Switch } from "react-router-dom";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About}  exact />
        <Route path="/404" component={NotFound} exact />
        <Route path="/task/:id" component={SingleTask} exact />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
