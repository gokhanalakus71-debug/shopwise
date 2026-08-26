import { firestore } from "./FirebaseAdmin.js";

const FREE_REVIEW_LIMIT = 5;

class ReviewUsageService {
  async getReviewCount(uid: string): Promise<number> {
    const ref = firestore.collection("users").doc(uid);
    const snapshot = await ref.get();

    if (!snapshot.exists) {
      return 0;
    }

    const data = snapshot.data();

    return Number(data?.usage?.reviewCount || 0);
  }

  async consumeFreeReview(uid: string): Promise<boolean> {
    const ref = firestore.collection("users").doc(uid);

    return firestore.runTransaction(
      async (transaction) => {
        const snapshot = await transaction.get(ref);

        const data = snapshot.exists
          ? snapshot.data()
          : undefined;

        const count = Number(
          data?.usage?.reviewCount || 0
        );

        if (count >= FREE_REVIEW_LIMIT) {
          return false;
        }

        transaction.set(
          ref,
          {
            usage: {
              reviewCount: count + 1,
            },
          },
          { merge: true }
        );

        return true;
      }
    );
  }
}

export default new ReviewUsageService();
