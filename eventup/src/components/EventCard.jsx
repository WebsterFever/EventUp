import styles from "./EventCard.module.css";

function EventCard({ evento, onSelect }) {
  return (
    <div className={styles.card} onClick={() => onSelect(evento)}>
      <h3 className={styles.title}>{evento.titulo}</h3>
      <p className={styles.text}>Data: {evento.data}</p>
      <p className={styles.text}>Local: {evento.local}</p>
    </div>
  );
}

export default EventCard;