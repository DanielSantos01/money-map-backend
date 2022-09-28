/* eslint-disable global-require */

if (process.env.DEV_ENV === 'true') {
  require('@babel/register')({
    extensions: ['.js', '.ts'],
  });

  require('./src/app');
} else {
  // TODO: require('./lib/app');
}
