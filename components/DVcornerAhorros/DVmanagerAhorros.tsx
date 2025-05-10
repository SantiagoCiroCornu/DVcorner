import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, Button, Modal, TouchableOpacity, StyleSheet
} from "react-native";
import { auth, db } from "../../firebase/Firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import useCurrencySymbols from "../../useApi/useCurrencySymbols";
import useCurrencyRates from "../../useApi/useExchange";
import MonedaItem from "./MonedaItem";
import DVcornerAhorrosMainMoneda from "./DVcornerAhorrosMainMoneda";
import Picker from "react-native-picker-select";

const DVmanagerAhorros = () => {
  const user = auth.currentUser;
  const [userMonedas, setUserMonedas] = useState<{ [key: string]: number }>({});
  const [mainMoneda, setMainMoneda] = useState<string | null>(null);
  const [newMoneda, setNewMoneda] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { symbols, loading: loadingSymbols, error: errorSymbols } = useCurrencySymbols();
  const { rates, loading: loadingRates, error: errorRates } = useCurrencyRates(mainMoneda);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserMonedas(data.monedas || {});
        setMainMoneda(data.mainMoneda || null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleMainMonedaChange = async (nuevaMoneda: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { mainMoneda: nuevaMoneda });
  };

  const handleAddMoneda = async () => {
    if (!user || !newMoneda) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`monedas.${newMoneda}`]: 0,
    });
    setNewMoneda(null);
  };

  const availableMonedas = Object.keys(symbols).filter(
    (key) => !(key in userMonedas)
  );

  const pickerItems = availableMonedas.map((key) => ({
    label: `${key} - ${symbols[key].description}`,
    value: key,
  }));

  if (loadingSymbols || loadingRates || !mainMoneda || !rates) {
    return <Text>Cargando monedas...</Text>;
  }

  if (errorSymbols || errorRates) {
    return <Text>Error al cargar monedas</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
     

      {mainMoneda && (
        <View style={{ marginBottom: 16 }}>
          
          <DVcornerAhorrosMainMoneda
            mainMoneda={mainMoneda}
            monedas={userMonedas}
            onMainMonedaChange={handleMainMonedaChange}
          />
        </View>
      )}

      {Object.keys(userMonedas).length > 0 ? (
        Object.entries(userMonedas).map(([moneda, cantidad]) => {
          const rate = moneda !== mainMoneda ? rates[moneda] : 1;
          return (
            <MonedaItem
              key={moneda}
              moneda={moneda}
              cantidad={cantidad}
              descripcion={symbols[moneda]?.description}
              exchangeRate={rate}
              mainMoneda={mainMoneda}
              onUpdate={async (moneda, nuevaCantidad) => {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                  [`monedas.${moneda}`]: nuevaCantidad,
                });
              }}
              onDelete={async (moneda) => {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) return;

                const data = userSnap.data();
                const nuevasMonedas = { ...data.monedas };
                delete nuevasMonedas[moneda];

                await updateDoc(userRef, { monedas: nuevasMonedas });
              }}
            />
          );
        })
      ) : (
        <Text>No tienes monedas guardadas.</Text>
      )}

      <View style={{ marginTop: 24, marginBottom: 16 }}>
        
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.plusText}>+ Agregar moneda</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 12 }}>
              Selecciona una moneda:
            </Text>
            <Picker
              onValueChange={(value) => setNewMoneda(value)}
              items={pickerItems}
              placeholder={{ label: "Selecciona una moneda...", value: null }}
              value={newMoneda}
            />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
              <View style={{ width: 10 }} />
              <Button
                title="Añadir"
                onPress={async () => {
                  await handleAddMoneda();
                  setIsModalVisible(false);
                }}
                disabled={!newMoneda}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  plusText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
});

export default DVmanagerAhorros;
