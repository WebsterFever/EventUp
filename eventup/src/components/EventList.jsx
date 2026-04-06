import { useState } from "react";
import EventCard from "./EventCard";
import styles from "./EventList.module.css";

export default function EventList({ onSelectEvent }) {
 const eventos = [
  {
    id: 1,
    titulo: "Workshop React",
    data: "2026-04-10",
    local: "Toronto",
    imagem: "https://images.unsplash.com/photo-1550439062-609e1531270e"
  },
  {
    id: 2,
    titulo: "Feira Tech",
    data: "2026-04-15",
    local: "Vancouver",
    imagem: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    id: 3,
    titulo: "Startup Day",
    data: "2026-04-20",
    local: "Montreal",
    imagem: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
  }
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
      <h2 className={styles.title}>Events</h2>

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