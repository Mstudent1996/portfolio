import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../../data/projects.json";
import Card from "../card/card.jsx";
import styles from "./memoryGame.module.css";

const initialCards = []; // Array til at holde par af kort
projects.forEach((project, index) => { // Opret to kort for hvert projekt
  initialCards.push({ // Første kort
    id: index * 2 + 1, // Unikt ID for kortet
    value: project.title, // Værdi for at matche kort
    icon: project.icon, // Ikon for kortet
    project, // Referencen til projektet
    isFlipped: false, // Om kortet er vendt
    isMatched: false, // Om kortet er matchet
  });
  initialCards.push({ // Andet kort
    id: index * 2 + 2,
    value: project.title,
    icon: project.icon,
    project,
    isFlipped: false,
    isMatched: false,
  });
});

const shuffleArray = (array) => { // Funktion til at blande kortene
  for (let i = array.length - 1; i > 0; i--) {
    // Fisher-Yates shuffle algoritme. Fisher-Yates shuffle er en algoritme til at blande en endelig sekvens.
    const j = Math.floor(Math.random() * (i + 1)); // Vælg et tilfældigt indeks
    [array[i], array[j]] = [array[j], array[i]]; // Byt elementerne
  }
  return array;
};

const STORAGE_KEY = "memoryGameState"; // Nøgle til lokal lagring

const MemoryGame = () => { // Hovedkomponenten for vendespillet
  const navigate = useNavigate(); // Hook til navigation mellem sider
  const [cards, setCards] = useState(() => { // Initialiser kortene med gemt tilstand eller blandede kort
    const savedState = localStorage.getItem(STORAGE_KEY); // Hent gemt tilstand fra lokal lagring
    if (savedState) { // Hvis der er en gemt tilstand
      try {
        const parsedState = JSON.parse(savedState); // Prøv at parse den gemte tilstand
        return parsedState; // Returner den parsed tilstand
      } catch (e) { // Hvis parsing fejler
        console.error("Failed to parse saved state:", e); // Log fejlen
        return shuffleArray([...initialCards]); // Returner blandede kort
      }
    }
    return shuffleArray([...initialCards]); // Hvis ingen gemt tilstand, returner blandede kort
  });
  const [flippedCards, setFlippedCards] = useState([]); // Hold styr på vendte kort
  const [isChecking, setIsChecking] = useState(false); // Om vi tjekker for match
  const [showPopup, setShowPopup] = useState(false); // Om popup skal vises
  const [selectedProject, setSelectedProject] = useState(null); // Det valgte projekt

  useEffect(() => { // Gem korttilstanden i lokal lagring, når den ændres
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards)); // Gem korttilstanden som JSON-streng
  }, [cards]); // Kør når kortene ændres

  const handleCardClick = (index) => { // Håndter klik på et kort
    if (cards[index].isMatched) { // Hvis kortet allerede er matchet
      setSelectedProject(cards[index].project); // Sæt det valgte projekt
      setShowPopup(true); // Vis popup
      return;
    }
    if (isChecking || cards[index].isFlipped) return; // Hvis vi tjekker eller kortet allerede er vendt, gør intet
    const newCards = [...cards]; // Lav en kopi af kortene
    newCards[index].isFlipped = true; // Vend kortet
    const newFlippedCards = [...flippedCards, index]; // Tilføj kortet til de vendte kort
    setCards(newCards); // Opdater kortene
    setFlippedCards(newFlippedCards); // Opdater de vendte kort
    if (newFlippedCards.length === 2) { // Hvis to kort er vendt
      setIsChecking(true); // Sæt isChecking til true
      setTimeout(() => checkForMatch(newFlippedCards), 1000); // Tjek for match efter 1 sekund
    }
  };
  const checkForMatch = ([firstIndex, secondIndex]) => { // Tjek om de to vendte kort matcher
    const newCards = [...cards]; // Lav en kopi af kortene
    if (newCards[firstIndex].value === newCards[secondIndex].value) { // Hvis værdierne matcher
      newCards[firstIndex].isMatched = true; // Marker kortene som matchede
      newCards[secondIndex].isMatched = true;
      setSelectedProject(newCards[firstIndex].project); // Sæt det valgte projekt
      setShowPopup(true); // Vis popup
    } else {
      newCards[firstIndex].isFlipped = false; // Vend kortene tilbage
      newCards[secondIndex].isFlipped = false;
    }
    setCards(newCards); // Opdater kortene
    setFlippedCards([]); // Nulstil de vendte kort
    setIsChecking(false); // Sæt isChecking til false
  };

  const resetGame = () => { // Nulstil spillet
    setCards(shuffleArray([...initialCards])); // Bland kortene igen
    setFlippedCards([]); // Nulstil de vendte kort
    setIsChecking(false); // Sæt isChecking til false
    setShowPopup(false); // Skjul popup
    setSelectedProject(null); // Nulstil det valgte projekt
    localStorage.removeItem(STORAGE_KEY); // Fjern gemt tilstand fra lokal lagring
  };

  return (
    <div className={styles.memoryGame}>
      <p className={styles.gameInfo}>
        Prøv dit held med vendespillet, og få direkte adgang til et projekt
      </p>
      <button className={styles.resetButton} onClick={resetGame}>
        Start spil forfra
      </button>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => ( // Render hvert kort
          <Card
            key={card.id}
            value={card.value}
            icon={card.icon}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      {showPopup && selectedProject && ( // Vis popup hvis et projekt er valgt
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Du har låst op for {selectedProject.title}</h2>
            <img
              src={selectedProject.mainImage}
              alt={selectedProject.title}
              className={styles.popupImage}
            />
            <button
              onClick={() => navigate(`/project/${selectedProject.id}`)}
              className={styles.projectButton}
            >
              Gå til projekt
            </button>
            <button
              onClick={() => setShowPopup(false)} // Luk popup
              className={styles.closeButton}
            >
              Tilbage til spillet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
