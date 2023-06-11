import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import FileDetailsPage from "./pages/FileDetails";
import { Recent } from "./pages/Recent";
import { Favorites } from "./pages/Favorites";
import { Trash } from "./pages/Trash";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { MostView } from "./pages/MostView";
import { Shared } from "./pages/Shared";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/recent" element={<Recent/>}/>
       <Route exact path="/favorites" element={<Favorites/>}/>
       <Route exact path="/view" element={<MostView/>}/>
       <Route exact path="/trash" element={<Trash/>}/>
       <Route exact path="/signup" element={<Register/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/shared" element={<Shared/>}/>
       <Route path="/file/:id" element={<FileDetailsPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
