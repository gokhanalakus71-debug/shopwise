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

  async canUseFreeReview(
    uid: string
  ): Promise<boolean> {
    const count =
      await this.getReviewCount(uid);

    return count < FREE_REVIEW_LIMIT;
  }

  async recordReview(uid: string): Promise<void> {
    const ref = firestore.collection("users").doc(uid);

    await firestore.runTransaction(
      async (transaction) => {
        const snapshot =
          await transaction.get(ref);

        const data = snapshot.exists
          ? snapshot.data()
          : undefined;

        const count =
          Number(
            data?.usage?.reviewCount || 0
          );

        transaction.set(
          ref,
          {
            usage: {
              reviewCount: count + 1,
            },
          },
          { merge: true }
        );
      }
    );
  }
}

export default new ReviewUsageService();
