import logo from "./logo.svg";
import "./App.css";
import RootView from "./Components/RootView";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileView from "./Components/FileView";
import FileViewSingle from "./Components/FileViewSingle";
import FileViewEdit from "./Components/FileViewEdit";
import FileAdd from "./Components/FileAdd";
import SignInPage from "./Components/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/file/:id/:folder" element={<FileView />} />
        <Route path="/file/:id/:folder/refresh" element={<FileView />}></Route>
        <Route
          path="/file/:id/:folder/:fileid/:file"
          element={<FileViewSingle />}
        ></Route>

        <Route
          path="/file/:id/:folder/:fileid/:file/edit"
          element={<FileViewEdit />}
        ></Route>
        <Route path="/fileadd" element={<FileAdd />}></Route>
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
