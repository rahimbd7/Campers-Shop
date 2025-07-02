import express, { Router } from 'express';



import notFound from '../middlewares/notFound,';
import globalErrorHandler from '../middlewares/globalErrorsHandler';
import { UserRoutes } from '../modules/users/users.routes';
import { CategoryRoutes } from '../modules/category/category.route';




const router = express.Router();
const moduleRoutes = [
   {
       path: '/users',
       route: UserRoutes
    },
   {
       path: '/category',
       route: CategoryRoutes
    },

]






moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})

router.use(globalErrorHandler);
router.use(notFound);

export default router;