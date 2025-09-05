// src/firebase.ts
import admin from "firebase-admin";

import serviceAccount from "../config/campersShopServiceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
