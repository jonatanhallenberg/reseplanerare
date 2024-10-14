import "./App.css";
import { TravelPlanner } from "./components/TravelPlanner";

const apiUrl = import.meta.env.VITE_API_URL;

const App = () => (
  <>
    <TravelPlanner />
  </>
);

export default App;
