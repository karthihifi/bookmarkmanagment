import logo from "./logo.svg";
import "./App.css";
import RootView from "./Components/RootView";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileView from "./Components/FileView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/file" element={<FileView />} />
      </Routes>
    </BrowserRouter>
  );
}

const MainView = () => {
  return (
    <div className="App">
      <header className="App-header">
        <RootView></RootView>
      </header>
    </div>
  );
};
export default App;
