module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6385efbd10170e12f3ce428232453714'),
    },
    url: '/dashboard',
  },
});
