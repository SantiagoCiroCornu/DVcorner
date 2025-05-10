import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import NavBar from "./NavBar"; 
import DVmanager from "./DVmanager/DVmanager";
import DVmanagerAhorros from "./DVcornerAhorros/DVmanagerAhorros";
import CambiarContraseña from "./cambiarContraseña";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState("DVmanager");

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      
      <StatusBar barStyle="dark-content" backgroundColor="#1976D2" />

      <NavBar navigate={handleNavigation} />
      <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
        {currentScreen === "DVmanager" ? (
          <DVmanager />
        ) : currentScreen === "DVmanagerAhorros" ? (
          <DVmanagerAhorros />
        ) : currentScreen === "CambiarContraseña" ? (
          <CambiarContraseña />
        ) : (
          <Text>No hay pantalla seleccionada</Text>
        )}
      </View>
    </View>
  );
};

export default Home;
