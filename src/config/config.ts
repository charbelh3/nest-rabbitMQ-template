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
    timeout: process.env.TIMEOUT || 15000,
  },
  rabbitMQ: {
    host: process.env.RABBIT_URL,
    messageExpiration: process.env.TIMEOUT || 15000,
    queues: {
      paymentsRequestQueue: 'paymentsRequestQueue',
      cyberSourceRequestQueue: 'cyberSourceRequestQueue',
      mpgsRequestQueue: 'mpgsRequestQueue',
    },
  },
});
