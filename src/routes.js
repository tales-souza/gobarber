import Router from 'express';
import UserController from './app/controllers/UserController'
import ScheduleController from './app/controllers/ScheduleController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import AppointmentController from './app/controllers/AppointmentController'
import multer from 'multer';
import multerConfig  from './config/multer';
import authMiddleware from './app/middlewares/auth';
import Appointment from './app/models/Appointment';
const routes = new Router();
const upload = multer(multerConfig);




routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/update', UserController.update);
routes.post('/files',upload.single('file'),  FileController.store);
routes.get('/providers', ProviderController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedules', ScheduleController.index);

export default routes;