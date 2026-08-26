const REVENUECAT_API_URL = "https://api.revenuecat.com/v2";
const PREMIUM_ENTITLEMENT_ID = "shopwise_premium";

class RevenueCatService {
  async isPremium(uid: string): Promise<boolean> {
    const apiKey =
      process.env.REVENUECAT_SECRET_API_KEY;

    const projectId =
      process.env.REVENUECAT_PROJECT_ID;

    if (!apiKey || !projectId) {
      throw new Error(
        "RevenueCat server configuration is missing."
      );
    }

    const response = await fetch(
      `${REVENUECAT_API_URL}/projects/${projectId}/customers/${encodeURIComponent(
        uid
      )}/active_entitlements`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const body = await response.text();

      throw new Error(
        `RevenueCat API error ${response.status}: ${body}`
      );
    }

    const data = await response.json();

    return Array.isArray(data.items)
      ? data.items.some(
          (item: { entitlement_id?: string }) =>
            item.entitlement_id ===
            PREMIUM_ENTITLEMENT_ID
        )
      : false;
  }
}

export default new RevenueCatService();
