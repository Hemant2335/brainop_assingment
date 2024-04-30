import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";

function App() {


  return (
    <>
      <CookiesProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
}

export default App;
