export default () => ({
  environment: process.env.NODE_ENV,
  database: {
    url: process.env.DB_URL,
  },
});
