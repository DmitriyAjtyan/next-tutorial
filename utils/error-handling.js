export const logError = (error, place) => {
  console.log("\x1b[34m", `${new Date()}: `, "\x1b[32m", `${place}: `, "\x1b[31m", `${error}`);
};
