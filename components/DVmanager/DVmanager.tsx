import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useCurrencySymbols from "../../useApi/useCurrencySymbols";
import DVshower from "./DVshower";

const DVmanager = () => {
  const { symbols, loading, error } = useCurrencySymbols();
  const [baseMoneda, setBaseMoneda] = useState<string>("USD");
  const [segundaMoneda, setSegundaMoneda] = useState<string>("EUR");

  const pickerItems = Object.entries(symbols).map(([key, value]) => ({
    label: `${key} - ${value.description}`,
    value: key,
  }));

  const pickerItemsSegunda = Object.entries(symbols)
    .filter(([key]) => key !== baseMoneda)
    .map(([key, value]) => ({
      label: `${key} - ${value.description}`,
      value: key,
    }));

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error al cargar las monedas: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona las monedas:</Text>

      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setBaseMoneda(value)}
          items={pickerItems}
          value={baseMoneda}
          placeholder={{ label: "Selecciona una moneda...", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.passText}>Pasar a</Text>

        <RNPickerSelect
          onValueChange={(value) => setSegundaMoneda(value)}
          items={pickerItemsSegunda}
          value={segundaMoneda}
          placeholder={{ label: "Selecciona una moneda...", value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <DVshower monedaBase={baseMoneda} segundaMoneda={segundaMoneda} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  passText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1, 
    borderBottomWidth: 1,  
    borderColor: "#d3d3d3",  
    borderRadius: 0, 
    color: "black",  
    backgroundColor: "transparent", 
    marginBottom: 16,
    width: 120, 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: "#d3d3d3", 
    borderRadius: 0, 
    color: "black", 
    backgroundColor: "transparent",  
    marginBottom: 16,
    width: 120,  
  },
});

export default DVmanager;
