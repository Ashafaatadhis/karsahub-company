module.exports = {
  apps: [
    {
      name: "karsahub",
      script: "dist/server/entry.mjs",
      env: {
        HOST: "0.0.0.0",
        PORT: 4321,
      },
    },
  ],
};
