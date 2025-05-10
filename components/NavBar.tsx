import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const NavBar = ({ navigate }: { navigate: (screen: string) => void }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("Login");
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleDeleteAccount = () => {
  Alert.alert(
    "¿Estás seguro?",
    "¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUser(auth.currentUser);
            Alert.alert("Cuenta eliminada");
            navigate("Login");
          } catch (error: any) {
            Alert.alert("Error al eliminar cuenta", error.message);
          }
        },
      },
    ],
    { cancelable: true }
  );
};


  

  return (
    <View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.button} onPress={() => setShowOptions(!showOptions)}>
          <Text style={styles.buttonText}>Opciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigate("DVmanager")}>
          <Text style={styles.buttonText}>Precio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigate("DVmanagerAhorros")}>
          <Text style={styles.buttonText}>Ahorros</Text>
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View style={styles.floatingMenu}>
          <TouchableOpacity style={styles.floatingItem} onPress={handleLogout}>
            <Text style={styles.dropdownText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingItem} onPress={handleDeleteAccount}>
            <Text style={styles.dropdownText}>Eliminar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingItem} onPress={()=> navigate("CambiarContraseña")}>
            <Text style={styles.dropdownText}>Cambiar contraseña</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#1976D2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#0D47A1",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  floatingMenu: {
    position: "absolute",
    top: 60,
    left: 10,
    backgroundColor: "#1976D2",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#0D47A1",
    borderRadius: 6,
    zIndex: 5,
    paddingVertical: 4,
    paddingHorizontal: 0,
    width: 160,
  },
  floatingItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default NavBar;
