module.exports = {
  apps: [
    {
      name: "accountApp",
      script: ".output/server/index.mjs",
      cwd: "/home/xver/accountApp",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
