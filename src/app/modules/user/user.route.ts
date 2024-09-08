import { Router } from 'express';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/vaildRequest';

const router = Router();

router.post(
    '/signup',
    validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createUser
)


export const UserRoutes = router;