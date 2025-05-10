import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import useExchangeRates from "../../useApi/useExchange";

interface DVshowerProps {
  monedaBase: string;
  segundaMoneda: string;
}

const DVshower: React.FC<DVshowerProps> = ({ monedaBase, segundaMoneda }) => {
  const [cantidad, setCantidad] = useState<string>("1");
  const { rates, loading, error } = useExchangeRates(monedaBase);

  const cantidadNumerica = parseFloat(cantidad);
  const tasa = rates[segundaMoneda];
  const resultado =
    !isNaN(cantidadNumerica) && tasa ? (cantidadNumerica * tasa).toFixed(2) : "";

  if (loading) return <Text>Cargando tasas de cambio...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cantidad en {monedaBase}:</Text>

      <TextInput
        style={styles.input} 
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Ingresá un monto"
      />

      <Text style={styles.resultado}>
        {cantidad} {monedaBase} = {resultado} {segundaMoneda}
      </Text>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    alignItems: "center", 
    justifyContent: "center",  
  },
  label: { fontSize: 16, marginBottom: 4 },
  input: {
    padding: 8,
    borderWidth: 0, 
    borderBottomWidth: 1, 
    borderTopWidth:1,
    borderColor: "black", 
    marginBottom: 12,
    backgroundColor: "#E5E5E",
    width: 200,  
  },
  resultado: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  button: {
    borderTopWidth: 1, 
    borderBottomWidth: 1,  
    borderColor: "#1976D2", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 4,  
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "center",
  },
});

export default DVshower;
