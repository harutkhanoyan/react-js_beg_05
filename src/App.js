import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Redirect, Route, Switch } from "react-router-dom";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About}  exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
