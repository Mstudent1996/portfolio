import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projects from "../../data/projects.json";
import styles from "./projectSingle.module.css";

const isVideo = (src = "") => /\.(mp4|webm|ogg)$/i.test(src); // Check for video extensions

// Bygger et galleri med billeder og videoer
const buildGallery = (project) => {
  if (!project) return [];

  const possible = [
    project.mainImage,
    project.video,
    project.imageOne,
    project.imageTwo,
    project.imageThree,
    project.imageFour,
  ].filter(Boolean); // Fjener undefined eller null værdier

  const unique = Array.from(new Set(possible)); // Fjener dubletter

  // Mapper hver kilde til et objekt med src og type
  return unique.map((src) => ({
    src,
    kind: isVideo(src) ? "video" : "image",
  }));
};

// Lightbox komponent til visning af billeder og videoer i større format
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey); // Tilføjer tastaturgenveje
    return () => window.removeEventListener("keydown", onKey); // Rydder op ved afmontering
  }, [onClose, onPrev, onNext]);

  const item = items[index]; // Henter det aktuelle element baseret på index
  if (!item) return null; // Hvis der ikke er noget element, returneres null

  return (
    // Overlay til lightbox
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}> {/* Stopper klik fra at lukke lightbox */}
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Navigationsknapper til lightbox */}
        {items.length > 1 && (
          <>
            <button
              className={styles.navLeft}
              onClick={onPrev}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className={styles.navRight}
              onClick={onNext}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}

        {/* Lightbox visning*/}
        <div className={styles.viewer}>
          {item.kind === "video" ? (
            <video className={styles.viewerMedia} controls src={item.src} />
          ) : (
            <img className={styles.viewerMedia} src={item.src} alt="" />
          )}
        </div>

        <div className={styles.counter}> {/* Tæller og viser det aktuelle indeks og det samlede antal elementer */}
          {index + 1} / {items.length} {/* Kigger på det aktuelle indeks og det samlede antal elementer */}
        </div>
      </div>
    </div>
  );
}

export default function ProjectSingle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = useMemo(() => {
    return projects.find((p) => String(p.id) === String(id) || p.slug === id);
  }, [id]);

  const gallery = useMemo(() => buildGallery(project), [project]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = (i) => {
    setActiveIndex(i);
    setLightboxOpen(true);
  };

  const close = () => setLightboxOpen(false);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActiveIndex((i) => (i + 1) % gallery.length);

  const mainItem = gallery[0];
  const thumbs = gallery.slice(1, 4);

  if (!project) {
    return (
      <section className={styles.projectArea}>
        <h1 className={styles.title}>Projekt ikke fundet</h1>
        <div className={styles.bottomBar}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            Tilbage
          </button>
        </div>
      </section>
    );
  }

  const stackText = project.stack || "kodesprog";
  const typeText = project.type || "projekttype, hvad det er";

  const descriptionText = Array.isArray(project.description)
    ? project.description.join("\n\n")
    : project.description || "";

  const learnedList = Array.isArray(project.learned)
    ? project.learned
    : [project.learnedOne, project.learnedTwo].filter(Boolean);

  return (
    <section className={styles.projectArea}>
      <h1 className={styles.title}>{project.title || "Projekt navn"}</h1>

      <div className={styles.contentGrid}>
        <div className={styles.mediaCol}>
          <button
            className={styles.mainFrameBtn}
            onClick={() => openAt(0)}
            aria-label="Open main media"
            disabled={!mainItem}
          >
            <div className={styles.mainFrame}>
              {mainItem ? (
                mainItem.kind === "video" ? (
                  <div className={styles.videoThumb}>
                    <video src={mainItem.src} muted playsInline />
                    <span className={styles.playBadge}>▶</span>
                  </div>
                ) : (
                  <img className={styles.mainMedia} src={mainItem.src} alt="" />
                )
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
          </button>

          <div className={styles.thumbRow}>
            {thumbs.length > 0 ? (
              thumbs.map((item, idx) => {
                const absoluteIndex = idx + 1;
                return (
                  <button
                    key={item.src}
                    className={styles.thumbBtn}
                    onClick={() => openAt(absoluteIndex)}
                    aria-label={`Open media ${absoluteIndex + 1}`}
                  >
                    <div className={styles.thumbFrame}>
                      {item.kind === "video" ? (
                        <div className={styles.videoThumb}>
                          <video src={item.src} muted playsInline />
                          <span className={styles.playBadge}>▶</span>
                        </div>
                      ) : (
                        <img
                          className={styles.thumbImg}
                          src={item.src}
                          alt=""
                        />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <>
                <div className={styles.thumbFrame}>
                  <div className={styles.placeholder} />
                </div>
                <div className={styles.thumbFrame}>
                  <div className={styles.placeholder} />
                </div>
                <div className={styles.thumbFrame}>
                  <div className={styles.placeholder} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.infoCol}>
          <div className={styles.meta}>
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>Stack:</span> {stackText}
            </div>
            <div className={styles.metaLine}>
              <span className={styles.metaLabel}>Type:</span> {typeText}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Beskrivelse:</h2>
            {descriptionText ? (
              <p className={styles.paragraph}>{descriptionText}</p>
            ) : (
              <p className={styles.paragraph} />
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Hvad jeg lærte:</h2>
            <ul className={styles.list}>
              {(learnedList.length
                ? learnedList
                : ["indsæt her", "indsæt her"]
              ).map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        {project.githubUrl ? (
          <a
            className={styles.githubBtn}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Find på github
          </a>
        ) : (
          <button className={styles.githubBtn} type="button">
            Find på github
          </button>
        )}

        {project.demoUrl ? (
          <a
            className={styles.demoBtn}
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live demo
          </a>
        ) : (
          <button className={styles.demoBtn} type="button">
            Live demo
          </button>
        )}

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          Tilbage
        </button>
      </div>

      {lightboxOpen && (
        <Lightbox
          items={gallery}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
