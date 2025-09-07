import express, { Router } from 'express';



import notFound from '../middlewares/notFound,';
import globalErrorHandler from '../middlewares/globalErrorsHandler';
import { UserRoutes } from '../modules/users/users.routes';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductRoutes } from '../modules/products/products.routes';
import { CartRoutes } from '../modules/cart/cart.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { paymentRoutes } from '../modules/payment/stripe/payment.stripe.route';




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
    {
        path: '/products',
        route: ProductRoutes
    },
    {
        path: '/cart',
        route: CartRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/orders',
        route: OrderRoutes
    },
    {
        path:'/payment',
        route:paymentRoutes
    }

]






moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})

router.use(globalErrorHandler);
router.use(notFound);

export default router;