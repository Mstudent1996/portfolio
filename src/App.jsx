import { Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Sidebar from "./components/sidebar/sidebar";
import Frontpage from "./pages/frontpage/frontpage";
import Projects from "./pages/projects/projects";
import ProjectSingle from "./pages/projectSingle/projectSingle";
import About from "./pages/about/about";

export default function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectSingle />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

