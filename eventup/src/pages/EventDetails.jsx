import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EventDetails.module.css";

function EventDetails() {
  const navigate = useNavigate();

  const location = useLocation();

  const evento = location.state?.evento;

  if (!evento) {
    return (
      <div className={styles.notFound}>
        <h2>Evento não encontrado</h2>

        <button
          className={styles.button}
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => navigate("/")}
      >
        ← Voltar
      </button>

      <div className={styles.card}>
        {evento.imagem && (
          <img
            src={evento.imagem}
            alt={evento.titulo}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>
            {evento.titulo}
          </h2>

          <div className={styles.infoContainer}>
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>
                📅 Data:
              </span>{" "}
              {evento.data}
            </p>

            <p className={styles.infoText}>
              <span className={styles.infoLabel}>
                📍 Local:
              </span>{" "}
              {evento.local}
            </p>

            {evento.descricao && (
              <p className={styles.description}>
                {evento.descricao}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;