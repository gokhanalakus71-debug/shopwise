import RevenueCatService from "./RevenueCatService.js";

const FREE_REVIEW_LIMIT = 5;

class MembershipService {
  async isPremium(uid: string): Promise<boolean> {
    return RevenueCatService.isPremium(uid);
  }

  async canReview(uid: string): Promise<boolean> {
    const premium = await this.isPremium(uid);

    if (premium) {
      return true;
    }

    // Free-review usage is stored separately.
    // The review route will enforce the limit atomically.
    return true;
  }

  async recordReview(uid: string): Promise<void> {
    // Temporary implementation removed from here.
    // Review usage will be handled by the usage service.
  }
}

export default new MembershipService();
