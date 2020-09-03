import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);

// DTO - Data Transfer Object

// Rotas: Receber a requisição, chamar outro arquivo, devolver uma resposta

/*

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

*/

export default appointmentsRouter;
