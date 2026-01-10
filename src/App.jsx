
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests"
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TC from "./Components/TC";
import RefundPolicy from "./Components/RefundPolicy";
import Premium from "./Components/Premium";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TC />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="/premium" element={<Premium />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
