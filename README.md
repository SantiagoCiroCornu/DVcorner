# 💱 DVcorner - Gestor de Divisas y Ahorros

**DVcorner** es una aplicación Android desarrollada con **TypeScript** y **React Native (Expo)**, que permite convertir entre monedas de distintos países, gestionar tus ahorros en múltiples divisas y calcular su valor total en la moneda que prefieras.

El proyecto utiliza **Firebase** para la autenticación de usuarios y almacenamiento seguro de datos, junto con **APIs públicas de tipo de cambio** para mantener los valores actualizados.

---

## 🚀 Funcionalidades principales

- 🔄 Conversión de divisas: Transforma valores entre diferentes monedas usando tasas de cambio actualizadas.
- 💰 Gestión de ahorros: Registra tus ahorros en múltiples monedas y mantené el control de tu economía personal.
- 📊 Cálculo de total: Visualizá el total de tus ahorros convertido a la moneda que elijas.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React Native
- Expo
- TypeScript
- Firebase Authentication
- Firebase Firestore

### Backend
- APIs públicas de tasas de cambio [(ej: exchangerate.host)](https://api.frankfurter.app)
- API grok ia.

---

## ⚙️ Instalación y ejecución

1. Cloná el repositorio:

   git clone https://github.com/SantiagoCiroCornu/dvcorner.git
   cd dvcorner

2. Instalá las dependencias:

   npm install

3. Ejecutá la app:

   npx expo start

> El servidor de desarrollo se iniciará automáticamente en el puerto `8081`.

---

## 📱 Compatibilidad

- ✔️ Android (optimizado)
- ⚠️ iOS (no probado)

---

## 👨‍💻 Desarrollado por

**Santiago Ciro Cornu**  
GitHub: https://github.com/SantiagoCiroCornu

---

## 📌 Notas

- Asegurate de tener configurado Firebase con tus propias credenciales (`google-services.json`) si querés ejecutar esta app con autenticación completa.
- Si usás Google Sign-In, no olvides agregar tu SHA-1 en la consola de Firebase.

---

💼🌍 ¡Tu economía personal, ahora bajo control con DVcorner!
