import { initDataRaw } from "@telegram-apps/sdk-react";
import { CardKey } from "@/types";

export type SendSpreadToUserBody = {
  uId: number;
  title: string;
  prompt?: string;
  cardsKeys: CardKey[];
  reading: string;
};

export default {
  /**
   * Validates user's Telegram init data to verify that user is the exact person;
   * @returns true if user's Telegram init data is valid, false if not;
   */
  async isInitDataValild(): Promise<{
    valid: boolean;
    error: string | null;
  }> {
    try {
      const response = await fetch(
        import.meta.env.VITE_INIT_DATA_VALIDATION_URL,
        {
          headers: {
            Authorization: `tma ${initDataRaw()}`,
          },
        }
      );
      const { isValid } = await response.json();

      return { valid: isValid, error: null };
    } catch (error) {
      console.error(error);
      return { valid: false, error: JSON.stringify(error) };
    }
  },
  /**
   *
   * @param {string} title - invoice title;
   * @param {string} description - invoice description;
   * @param {number} amount - invoice price to be charged;
   * @param {number} [coinsQty] - (Optional) Quantity of Magic Coins to be added to user's balance in case of successfull transaction
   * @returns Telegram's invoice presented as URL;
   */
  async getInvoiceLink(
    title: string,
    description: string,
    amount: number,
    coinsQty?: number
  ): Promise<string | undefined> {
    try {
      const invoiceTitle = coinsQty ? `${coinsQty} ${title}` : title;

      const response = await fetch(
        "https://tarot-bot-a2920463d6a1.herokuapp.com/create_invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: invoiceTitle,
            description: description,
            amount: amount,
            label: title,
          }),
        }
      );

      const invoiceLink = await response.json();

      return invoiceLink;
    } catch (error) {
      console.error(`An error occured: ${error}`);
    }
  },
  /**
   *  Sends a user's whole spread reading and cards keys to Bot API server where it's sent into a private chat with bot to a
   * respective user accirding to uId;
   * @param {SendSpreadToUserBody} body - object that contains user's Tg id, array of cards object keys, spread title,
   * user's prompt (if applicable) and LLM response Tarot readings string;
   */
  async sendSpreadToUser({
    uId,
    cardsKeys,
    title,
    prompt,
    reading,
  }: SendSpreadToUserBody) {
    try {
      await fetch(import.meta.env.VITE_SEND_SPREAD_TO_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uId: uId,
          cardsKeys: cardsKeys,
          prompt: prompt,
          title: title,
          reading: reading,
        }),
      });
    } catch (error) {
      console.error("Failed to send spread to user:", error);
    }
  },
  async sendRefNotification(ref_id: number, current_user_name: string) {
    try {
      await fetch("https://tarot-bot-a2920463d6a1.herokuapp.com/notify-ref", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref_id: ref_id,
          current_user_name: current_user_name,
        }),
      });
    } catch (error) {
      console.error("Failed to send ref notification", error);
    }
  },
};
