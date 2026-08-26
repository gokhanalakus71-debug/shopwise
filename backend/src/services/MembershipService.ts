import {
  Firestore,
  FieldValue,
} from "firebase-admin/firestore";

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

    await ref.set(
      {
        usage: {
          reviewCount: FieldValue.increment(1),
        },
      },
      { merge: true }
    );
  }
}

export default MembershipService;
