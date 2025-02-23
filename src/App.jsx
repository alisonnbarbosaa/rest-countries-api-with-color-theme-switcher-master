import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import { FaMoon } from "react-icons/fa";

function App() {
  return (
    <div>
      <header className="h-16 flex flex-col justify-around">
        <div className="flex justify-between px-12">
          <h1 className="font-bold text-2xl">Where in the world?</h1>
          <button className="font-bold cursor-pointer flex gap-2 items-center">
            <FaMoon />
            Dark Mode
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
