import EventList from "../components/EventList";
import styles from "./Home.module.css";

export default function Home({ onSelectEvent }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EventUp</h1>
      <EventList onSelectEvent={onSelectEvent} />
    </div>
  );
}