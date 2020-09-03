import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface

    const createAppointment = new CreateAppointmentService( // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id'); /// Espero que tenha um id
    expect(appointment.provider_id).toBe('123123');
  });

  /**
   * SEGUNDO TESTE
   */

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface

    const createAppointment = new CreateAppointmentService( // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments
      fakeAppointmentsRepository,
    );
    // Ano / mes / dia / horario
    const appointmentDate = new Date(2020, 4, 10, 11); // 0 = janeiro / 1 = fevereiro

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError); // Que a resposta seja reject com Error
  });
});
