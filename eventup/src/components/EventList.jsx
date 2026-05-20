import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./EventList.module.css";

export default function EventList({ onSelectEvent }) {
  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?city=Toronto&classificationName=music&size=12&apikey=${
            import.meta.env.VITE_TICKETMASTER_API_KEY
          }`
        );

        const data = await response.json();

        const eventos =
          data?._embedded?.events?.map((event) => ({
            id: event.id,
            titulo: event.name,
            data: event.dates?.start?.localDate,
            local: event._embedded?.venues?.[0]?.city?.name,
            imagem:
              event.images?.[0]?.url ||
              "https://via.placeholder.com/300",
          })) || [];

        setLista(eventos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Real Events</h2>

      {loading && (
        <p className={styles.loading}>Loading...</p>
      )}

      {!loading &&
        lista.map((evento) => (
          <EventCard
            key={evento.id}
            evento={evento}
            onSelect={onSelectEvent}
          />
        ))}
    </div>
  );
}