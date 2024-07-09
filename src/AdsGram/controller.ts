//@ts-expect-error types required;
const AdController = window.Adsgram.init({
  // blockId: "586",
  blockId: "600",
});

export const showAd = async () => {
  AdController.show()
    .then(() => {
      console.log("Reward granted");
    })
    .catch(() => {
      console.log("Closed add to early");
    });
};
