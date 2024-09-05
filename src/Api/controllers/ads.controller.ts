export default {
  /**
   *  Sets a date in DB till which user won't be shown any ads neither before spread nor other kind of ads;
   * @param {number} uId - user's Telegram id;
   */
  async setAdsDisabledTill(uId: number) {
    try {
      const response = await fetch(import.meta.env.VITE_DISABLE_ADS_TILL_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to set ads disable till date: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Failed to set ads disabled till:", error);
    }
  },
  /**
   *
   * @param {number} uId - user's Telegram id;
   * @returns date till which ads are disabled or null if they're not disabled;
   */
  async getAdsDisabledTill(uId: number): Promise<Date | null | undefined> {
    try {
      const response = await fetch(
        import.meta.env.VITE_GET_ADS_DISABLED_TILL_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uId: uId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get ads disabled till date: ${response.statusText}`
        );
      }

      const endDate = await response.json();

      return endDate;
    } catch (error) {
      console.error("Failed to get ads disabled till:", error);
    }
  },
};
