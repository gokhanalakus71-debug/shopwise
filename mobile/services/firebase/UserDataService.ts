import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { firestore } from "./firebaseConfig";
import AuthService from "../AuthService";

export interface UserData {
  profiles: string[];
  healthConsiderations: string[];
  selectedProfiles: string[];
  selectedHealth: string[];
}

class UserDataService {
  private getUserDocument() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      throw new Error("No authenticated user.");
    }

    return doc(firestore, "users", user.uid);
  }

  async loadUserData(): Promise<UserData | null> {
    const snapshot = await getDoc(
      this.getUserDocument()
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as UserData;
  }

  async saveUserData(data: UserData): Promise<void> {
    await setDoc(
      this.getUserDocument(),
      data,
      { merge: true }
    );
  }
}

export default new UserDataService();
