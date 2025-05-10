import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useExchangeRates from "../../useApi/useExchange";

const DVcornerAhorrosMainMoneda = ({
  mainMoneda,
  monedas,
  onMainMonedaChange,
}: {
  mainMoneda: string;
  monedas: Record<string, number>;
  onMainMonedaChange: (nuevaMoneda: string) => void;
}) => {
  const [selectedMoneda, setSelectedMoneda] = useState(mainMoneda);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { rates, loading, error: fetchError } = useExchangeRates(selectedMoneda);

  useEffect(() => {
    const calcularTotal = () => {
      if (loading || fetchError) return;

      try {
        let suma = 0;
        for (const [moneda, cantidad] of Object.entries(monedas)) {
          if (typeof cantidad !== "number") continue;

          if (moneda === selectedMoneda) {
            suma += cantidad;
          } else if (rates[moneda]) {
            suma += cantidad / rates[moneda];
          } else {
            console.warn(`No se encontró tasa para ${moneda}`);
          }
        }
        setTotal(suma);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al calcular el total");
      }
    };

    calcularTotal();
  }, [monedas, selectedMoneda, rates, loading, fetchError]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Moneda principal:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedMoneda}
          onValueChange={(itemValue) => {
            setSelectedMoneda(itemValue);
            onMainMonedaChange(itemValue);
          }}
          style={styles.picker}
          dropdownIconColor="black"
        >
          {Object.keys(monedas).map((moneda) => (
            <Picker.Item key={moneda} label={moneda} value={moneda} />
          ))}
        </Picker>
      </View>

      {error || fetchError ? (
        <Text style={styles.error}>{error || fetchError}</Text>
      ) : total === null || loading ? (
        <Text style={styles.loading}>Calculando total...</Text>
      ) : (
        <Text style={styles.total}>
          Total de tus ahorros en {selectedMoneda}: {total.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor: "#dcdcdc",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "transparent",
  },
  error: {
    color: "red",
  },
  loading: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DVcornerAhorrosMainMoneda;
