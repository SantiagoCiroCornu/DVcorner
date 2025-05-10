import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const MonedaItem = ({
  moneda,
  cantidad,
  descripcion,
  onUpdate,
  onDelete,
  exchangeRate,
  mainMoneda,
}: {
  moneda: string;
  cantidad: number;
  descripcion?: string;
  onUpdate: (moneda: string, nuevaCantidad: number) => void;
  onDelete: (moneda: string) => void;
  exchangeRate: number;
  mainMoneda: string;
}) => {
  const [input, setInput] = useState("");

  const modificarCantidad = (tipo: "sumar" | "restar") => {
    const numero = parseFloat(input);
    if (isNaN(numero)) {
      Alert.alert("Cantidad inválida");
      return;
    }

    const nuevaCantidad = tipo === "sumar" ? cantidad + numero : cantidad - numero;
    onUpdate(moneda, nuevaCantidad);
    setInput("");
  };

  const eliminarCantidad = () => {
    onUpdate(moneda, 0);
    setInput("");
  };

  const eliminarMoneda = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Deseas eliminar la moneda ${moneda}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            onDelete(moneda);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const cantidadEnMainMoneda = moneda !== mainMoneda ? cantidad * exchangeRate : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{moneda} - {descripcion}</Text>
      <Text style={styles.subtext}>Actual: {cantidad.toFixed(2)}</Text>

      {moneda !== mainMoneda && exchangeRate ? (
        <>
          <Text style={styles.subtext}>
            Equivalente en {mainMoneda}: {cantidadEnMainMoneda.toFixed(2)}
          </Text>
          <Text style={styles.info}>
            1 {moneda} = {exchangeRate.toFixed(4)} {mainMoneda}
          </Text>
        </>
      ) : (
        <Text style={styles.info}>Moneda base</Text>
      )}

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Cantidad"
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <View style={styles.signButtons}>
          <Button title="+" onPress={() => modificarCantidad("sumar")} color="#007AFF" />
          <Button title="-" onPress={() => modificarCantidad("restar")} color="#007AFF" />
        </View>
      </View>

      <View style={styles.rowButtons}>
        <View style={styles.flexButton}>
          <Button title="Eliminar cantidad" onPress={eliminarCantidad} color="#007AFF" />
        </View>
        <View style={styles.flexButton}>
          <Button title="Eliminar moneda" onPress={eliminarMoneda} color="red" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtext: {
    marginTop: 4,
    fontSize: 16,
  },
  info: {
    fontStyle: "italic",
    color: "gray",
    fontSize: 14,
    marginTop: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  signButtons: {
    flexDirection: "row",
    marginLeft: 8,
    gap: 4,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  flexButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default MonedaItem;
