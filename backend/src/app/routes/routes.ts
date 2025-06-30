import express, { Router } from 'express';
import path from 'path';


import notFound from '../middlewares/notFound,';
import globalErrorHandler from '../middlewares/globalErrorsHandler';




const router = express.Router();
const moduleRoutes = [
   {
       path: '/',
       route: ""
    }

]



moduleRoutes.forEach(route => {
    router.use(route.path, express.static(path.join(__dirname, route.route)))
})

router.use(globalErrorHandler);
router.use(notFound);

export default router;