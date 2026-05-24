import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../service/firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;