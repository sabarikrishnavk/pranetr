module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5433),
        database: env('DATABASE_NAME', 'yugabyte'),
        username: env('DATABASE_USERNAME', 'yugabyte'),
        password: env('DATABASE_PASSWORD', 'yugabyte'),
        schema: env('DATABASE_SCHEMA', 'siteadmin'), // Not Required
        ssl: false
        // {
        //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        // },
      },
      options: {},
    },
  },
});
 