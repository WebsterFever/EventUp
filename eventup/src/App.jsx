import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CadastroUsuario from "./pages/CadastroUsuario";
import LoginUsuario from "./pages/LoginUsuario";
import { auth } from "./service/firebase";

function App() {
  const [page, setPage] = useState("cadastro");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // TEMPORARY FOR CYPRESS TESTING
  useEffect(() => {
    signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);

      if (currentUser && page === "login") {
        setPage("home");
      }

      if (!currentUser && page !== "login" && page !== "cadastro") {
        setPage("login");
      }
    });

    return () => unsubscribe();
  }, [page]);

  const handleSelectEvent = (evento) => {
    setSelectedEvent(evento);
    setPage("event");
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();

    setSelectedEvent(null);
    setPage("login");
  };

  const handleLoginSuccess = () => {
    setPage("home");
  };

  const handleRegisterSuccess = () => {
    setPage("login");
  };

  const handleNavigate = (targetPage) => {
    setPage(targetPage);
  };

  const handleBackHome = () => {
    setPage("home");
  };

  if (loadingAuth) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      {user && (
        <Navbar
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      {page === "home" && user && (
        <Home onSelectEvent={handleSelectEvent} />
      )}

      {page === "event" && user && (
        <EventDetails
          evento={selectedEvent}
          onBack={handleBackHome}
        />
      )}

      {page === "login" && (
        <LoginUsuario
          onLoginSuccess={handleLoginSuccess}
          onRegister={() => setPage("cadastro")}
        />
      )}

      {page === "cadastro" && (
        <CadastroUsuario
          onRegisterSuccess={handleRegisterSuccess}
          onLogin={() => setPage("login")}
        />
      )}
    </div>
  );
}

export default App;
