import { useState } from "react";
import EventCard from "./EventCard";
import styles from "./EventList.module.css";

export default function EventList({ onSelectEvent }) {
  const eventos = [
    { id: 1, titulo: "Workshop React", data: "2026-04-10", local: "Toronto" },
    { id: 2, titulo: "Feira Tech", data: "2026-04-15", local: "Vancouver" },
    { id: 3, titulo: "Startup Day", data: "2026-04-20", local: "Montreal" }
  ];

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);

  if (loading) {
    setTimeout(() => {
      setLista(eventos);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Eventos</h2>

      {loading && <p className={styles.loading}>Carregando...</p>}

      {!loading &&
        lista.map(evento => (
          <EventCard
            key={evento.id}
            evento={evento}
            onSelect={onSelectEvent}
          />
        ))}
    </div>
  );
}