import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns'; // FUnção para ver se duas datas são iguais

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

// SOLID

class AppointmentsRepository implements IAppointmentsRepository {
  // Array de appointments
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    /* Outra maneira
    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    */

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
