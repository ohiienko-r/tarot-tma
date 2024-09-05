export default {
  /**
   *
   * @param {number} uId - user's Telegram id;
   * @returns user's Magic Coins balance;
   */
  async getUserBalance(uId: number): Promise<number | undefined> {
    try {
      const response = await fetch(import.meta.env.VITE_GET_BALANCE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }

      const balance = await response.json();
      return balance;
    } catch (error) {
      console.error("Failed to get user's balance:", error);
      return undefined;
    }
  },
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
  /**
   * Sets initial balance for a new user;
   * @param {number} uId - user's Telegram id;
   * @returns new user's initial Magic Coins balance;
   */
  async setInitialBalance(uId: number): Promise<number | undefined> {
    try {
      const response = await fetch(import.meta.env.VITE_SET_BALANCE_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to set initial balance: ${response.statusText}`
        );
      }

      const balance = await response.json();
      return balance;
    } catch (error) {
      console.error("Failed to set user balance", error);
    }
  },
  /**
   * Transfers user's balance from Telegram's CloudStorage to a DB. (During POC stage user's balance used to be stored in CloudStorage
   * as long as it was quick and dirty solution. Function will be depricated next sprint).
   * @param {number} uId - user's Telegram id;
   * @param {number} cloudBalance - user's balance that used to be stored in Telegram Cloud Storage;
   */
  async migrateBalance(uId: number, cloudBalance: number) {
    try {
      const response = await fetch(import.meta.env.VITE_MIGRATE_BALANCE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uId: uId, balance: cloudBalance }),
      });

      if (!response.ok) {
        throw new Error(`Failed to migrate balance: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to migrate balance", error);
    }
  },
};
