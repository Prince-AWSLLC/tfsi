import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work" element={<Navigate to="/donate#where-gifts-go" replace />} />
        <Route path="/people" element={<Navigate to="/about#people" replace />} />
        <Route path="/people/*" element={<Navigate to="/about#people" replace />} />
        <Route path="/judea-samaria" element={<Navigate to="/about#judea-samaria" replace />} />
        <Route path="/events" element={<Navigate to="/media#events" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
