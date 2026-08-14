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

const DEFAULT_USER_DATA: UserData = {
  profiles: [
    "Me",
    "Child 1",
    "Husband",
  ],

  healthConsiderations: [
    "Pregnancy",
    "Gluten Intolerance",
  ],

  selectedProfiles: [
    "Me",
  ],

  selectedHealth: [
    "Pregnancy",
  ],
};

class UserDataService {
  private getUserDocument() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      throw new Error("No authenticated user.");
    }

    return doc(
      firestore,
      "users",
      user.uid
    );
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

  async initializeUserData(): Promise<UserData> {
    const existing =
      await this.loadUserData();

    if (existing) {
      return existing;
    }

    await setDoc(
      this.getUserDocument(),
      DEFAULT_USER_DATA
    );

    return DEFAULT_USER_DATA;
  }

  async saveUserData(
    data: UserData
  ): Promise<void> {
    await setDoc(
      this.getUserDocument(),
      data,
      { merge: true }
    );
  }
}

export default new UserDataService();