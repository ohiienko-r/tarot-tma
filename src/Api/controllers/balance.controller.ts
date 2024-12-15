export default {
  /**
   * Updates user's Magic Coins balance
   * @param {number} uId - user's Telegram id;
   * @param {number} value - balance update value either positive or a negative number;
   */
  async updateUserBalance(uId: number, value: number): Promise<void> {
    try {
      const response = await fetch(import.meta.env.VITE_UPD_BALANCE_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId, value: value }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to update user balance", error);
    }
  },
};
