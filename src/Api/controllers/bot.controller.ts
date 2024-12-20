import { initDataRaw } from "@telegram-apps/sdk-react";
import {
  FeedbackBody,
  SendSpreadToUserBody,
  ValidationResponse,
  UserData,
} from "@/types";

export default {
  /**
   * Validates user's Telegram init data to verify that user is the exact person;
   * @returns true if user's Telegram init data is valid, false if not;
   */
  async validateInitData(): Promise<boolean> {
    try {
      const response = await fetch(
        import.meta.env.VITE_INIT_DATA_VALIDATION_URL,
        {
          method: "POST",
          headers: {
            Authorization: `tma ${initDataRaw()}`,
          },
        }
      );

      const data: ValidationResponse = await response.json();

      return data.success;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  async setNewUser({
    uId,
    firstName,
    userName,
    languageCode,
    referrerId,
  }: UserData) {
    try {
      const response = await fetch(
        "https://tarot-bot-18921c9756be.herokuapp.com/new-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uId: uId,
            firstName: firstName,
            userName: userName,
            languageCode: languageCode,
            referrerId: referrerId,
          }),
        }
      );

      if (!response.ok) {
        console.error(`Failed to set new user`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  async getUserData(uId: number) {
    try {
      const response = await fetch(
        "https://tarot-bot-18921c9756be.herokuapp.com/get-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uId: uId,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to get user data");
      }

      const user = await response.json();
      return user;
    } catch (error) {
      throw new Error(
        `Failed to retreive user data for the provided uId: ${error}`
      );
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
        "https://tarot-bot-18921c9756be.herokuapp.com/create_invoice",
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
   * Sends a user's feedback to Bot api server where it's sent to a DB and to admin's personal chat with Bot;
   * @param {FeedbackBody} body - object that contains user's Tg id, first name, rating of app from 1 to 5 and feedback string;
   */
  async sendFeedback(body: FeedbackBody) {
    try {
      await fetch(import.meta.env.VITE_SEND_FEEDBACK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Failed to send feedback to server:", error);
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
};
