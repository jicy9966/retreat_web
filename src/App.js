import "./App.scss"
import "./DarkMode.scss" 
import { Footer } from "./components/components";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <div class="desktop">
        <HomePage/>
      </div>
      <Footer />
    </>
  );
}
export default App;
