import { Link } from "react-router-dom";
import projects from "../../data/projects.json";
import styles from "./projects.module.css";

const Projects = () => {
  return (
    <div className={styles.projectsContainer}>
      <h1 className={styles.projectsTitle}>Mine Projekter</h1>
      <div className={styles.projectsGrid}>

        {/* Mapper projekter til kort */}
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className={styles.projectCard}
          >
            <img
              src={project.mainImage}
              alt={project.title}
              className={styles.projectImage}
            />
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectType}>{project.type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Projects;
