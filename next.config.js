/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingIncludes: {
    '/api/visits': ['./node_modules/uncrypto/dist/**/*'],
  },
};
