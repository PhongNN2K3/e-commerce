import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="max-h-screen pb-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray scrollbar-rounded">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
