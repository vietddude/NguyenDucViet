import express from 'express';
import config from './../config/config';
import transactionRoute from './transaction.route';
import healthcheckRoute from './healthCheck.route';
import docsRoute from './docs.route';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/health-check',
    route: healthcheckRoute,
  },
  {
    path: '/transactions',
    route: transactionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
