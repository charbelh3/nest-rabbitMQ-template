export default () => ({
  environment: process.env.NODE_ENV,
  database: {
    url: process.env.DB_URL,
  },
  server: {
    port: process.env.PORT,
  },
  token: {
    secret: process.env.SECRET,
  },
});
