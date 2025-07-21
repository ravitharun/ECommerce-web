import Navbar from "./Components/Pages/Navbar";
import Login from "./Components/Auth/Login";
import Sigin from "./Components/Auth/Sigin";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Contact from "./Components/Pages/Contact";
import Home from "./Components/Pages/Home";
import UpdatePassword from "./Components/Auth/UpdatePassword";
// import UpdatePassword from "./Components/Auth/UpdatePassword"; // ✅ Keep this

function App() {
  return (
    <>
      <Navbar />
      <Login />
      <Sigin />
      <ForgetPassword />
      <Contact />
      <Home />
      <UpdatePassword /> {/* ✅ Render this as well */}
    </>
  );
}

export default App;
