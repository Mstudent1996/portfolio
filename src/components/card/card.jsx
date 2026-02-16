import styles from "./card.module.css";

const Card = ({
  icon,
  isFlipped,
  onClick,
  frontColor = "#7776BC",
  backColor = "#70A288",
}) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={onClick}
      style={{ backgroundColor: isFlipped ? backColor : frontColor }}
    >
      <div className={styles.cardContent}>
        {!isFlipped && (
          <img
            src="/assets/cardCharacter.png"
            alt="Card Front"
            className={styles.frontImage}
          />
        )}

        {isFlipped && icon && <span className={styles.icon}>{icon}</span>}
      </div>
    </div>
  );
};

export default Card;
