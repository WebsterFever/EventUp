import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";

function App() {
  const [page, setPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelect(evento) {
    setSelectedEvent(evento);
    setPage("details");
  }

  return (
    <div>
      <Navbar onNavigate={setPage} />

      {page === "home" && <Home onSelectEvent={handleSelect} />}

      {page === "details" && (
        <EventDetails
          evento={selectedEvent}
          onBack={() => setPage("home")}
        />
      )}
    </div>
  );
}

export default App;