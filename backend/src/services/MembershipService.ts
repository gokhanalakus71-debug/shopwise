import { Firestore } from "firebase-admin/firestore";

const FREE_REVIEW_LIMIT = 5;

class MembershipService {
  constructor(private readonly db: Firestore) {}

  async getMembership(uid: string) {
    const ref = this.db.collection("users").doc(uid);
    const snapshot = await ref.get();

    const data = snapshot.exists
      ? snapshot.data()
      : undefined;

    return {
      plan: data?.membership?.plan || "free",
      reviewCount:
        data?.usage?.reviewCount || 0,
    };
  }

  async canReview(uid: string): Promise<boolean> {
    const membership = await this.getMembership(uid);

    if (membership.plan === "premium") {
      return true;
    }

    return membership.reviewCount < FREE_REVIEW_LIMIT;
  }

  async recordReview(uid: string): Promise<void> {
    const ref = this.db.collection("users").doc(uid);

    await this.db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);

      const data = snapshot.exists
        ? snapshot.data()
        : undefined;

      const plan =
        data?.membership?.plan || "free";

      const reviewCount =
        data?.usage?.reviewCount || 0;

      if (
        plan !== "premium" &&
        reviewCount >= FREE_REVIEW_LIMIT
      ) {
        throw new Error(
          "FREE_REVIEW_LIMIT_REACHED"
        );
      }

      transaction.set(
        ref,
        {
          usage: {
            reviewCount: reviewCount + 1,
          },
        },
        { merge: true }
      );
    });
  }
}

export default MembershipService;
