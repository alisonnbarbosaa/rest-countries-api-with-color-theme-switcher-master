import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import { FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 dark:text-slate-200">
      <header className="h-16 flex flex-col justify-around dark:bg-slate-800 bg-slate-200">
        <div className="flex justify-between px-12">
          <h1 className="font-bold text-2xl">Where in the world?</h1>
          <button
            className="font-bold cursor-pointer flex gap-2 items-center"
            onClick={toggleTheme}
          >
             {theme === "dark" ? <FaMoon/> : <FaSun/>}
            {theme === "dark" ? "Dark Mode" : "light Mode"}
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
