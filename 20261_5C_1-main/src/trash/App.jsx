import { useState } from "react";
import Button from "./components/Button";
import "./components/components-styles.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Button
          text="Cerrar sesión"
          action={() => {
            alert("Cerrando sesión");
            setIsLoggedIn(false);
          }}
          type="primary"
        />
      ) : (
        <Button
          text="Iniciar sesión"
          action={() => {
            alert("Iniciando sesión");
            setIsLoggedIn(true);
          }}
          type="primary"
        />
      )}

      {
        isLoggedIn && (
          <>
            <p>Bienvenido al sistema</p>
            <Button />
          </>
        )
      }
    </>
  );
}

export default App;
