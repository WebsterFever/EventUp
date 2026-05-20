import styles from "./EventDetails.module.css";

export default function EventDetails({ evento, onBack }) {
  if (!evento) return null;

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onBack}>
        ← Voltar
      </button>

      {evento.imagem && (
        <img 
          src={evento.imagem} 
          alt={evento.titulo}
          className={styles.image}
        />
      )}

      <h2 className={styles.title}>{evento.titulo}</h2>
      
      <div className={styles.infoContainer}>
        <p className={styles.infoText}>
          <span className={styles.infoLabel}>📅 Data:</span> {evento.data}
        </p>
        <p className={styles.infoText}>
          <span className={styles.infoLabel}>📍 Local:</span> {evento.local}
        </p>
      </div>
    </div>
  );
}