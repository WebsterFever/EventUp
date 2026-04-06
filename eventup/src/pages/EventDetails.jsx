import styles from "./EventDetails.module.css";

export default function EventDetails({ evento, onBack }) {
  if (!evento) return null;

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onBack}>
        Voltar
      </button>

      <h2 className={styles.title}>{evento.titulo}</h2>
      <p>Data: {evento.data}</p>
      <p>Local: {evento.local}</p>
    </div>
  );
}