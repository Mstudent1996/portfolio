import React from "react";
import styles from "./about.module.css";
import { FaHtml5, FaCss3Alt, FaWordpress, FaJs, FaReact } from "react-icons/fa";

const skills = [
  { icon: <FaHtml5 />, label: "HTML" },
  { icon: <FaCss3Alt />, label: "CSS" },
  { icon: <FaWordpress />, label: "WordPress" },
  { icon: <FaJs />, label: "JavaScript" },
  { icon: <FaReact />, label: "React" },
];

const About = () => {
  return (
    <section className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>Om mig</h1>

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.education}>
            <h2 className={styles.sectionTitle}>Uddannelse</h2>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <p className={styles.timelineText}>
                  August 2024: Starter på Media College Denmark
                </p>
              </div>

              <div className={styles.timelineItem}>
                <p className={styles.timelineText}>
                  April 2026: Uddannet webudvikler
                </p>
              </div>
            </div>
          </div>

          <div className={styles.contact}>
            <h2 className={styles.sectionTitle}>Kontakt mig</h2>
            <p className={styles.contactSub}>
              Ved spørgsmål, kan jeg kontaktes her
            </p>

            <a
              className={styles.mailLink}
              href="mailto:mette-rasmussen@outlook.dk"
            >
              mette-rasmussen@outlook.dk
            </a>
          </div>
        </div>

        <aside className={styles.right}>
          <h2 className={styles.sectionTitle}>Færdigheder</h2>

          <div className={styles.skillStack}>
            {skills.map((skill) => (
              <div key={skill.label} className={styles.skillWrapper}>
                <div className={styles.skillIcon} aria-label={skill.label}>
                  {skill.icon}
                </div>
                <span className={styles.tooltip}>{skill.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
