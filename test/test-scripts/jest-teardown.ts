module.exports = async () => {
  // @ts-ignore
  await global.__MONGOD__.stop();
};
