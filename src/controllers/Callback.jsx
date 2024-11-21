import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      localStorage.setItem("spotifyToken", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  return <div>Cargando...</div>;
}

export default Callback;
