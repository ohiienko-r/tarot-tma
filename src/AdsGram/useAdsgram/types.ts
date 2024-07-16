import { ShowPromiseResult } from "../adsgram";

export type UseAdsgramProptypes = {
  blockId: string;
  onReward?: () => void;
  onError?: (result: ShowPromiseResult) => void;
};
