import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import { startOfHour, parseISO, isBefore } from 'date-fns'

class AppointmentController {

    async index(req, res){
        const { page = 1 } = req.query;
        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order:['date'],
            attributes:['id', 'date'],
            limit:20,
            offset: (page - 1 ) * 20,
            include: [
                
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include:['id','name'],
                    include:[
                        {
                            model: File,
                            as:'avatar',
                            attributes:['id','path','url'],

                        },
                    ],
                },
            ],
        });
        console.log("teste" + req.userId);
        return res.json(appointments);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = req.body;

        const checkIsProvider = await User.findOne({where: { id: provider_id, provider:true},
        });

        if(!checkIsProvider){
            return res.status(401).json({ error: 'Você não pode criar um agendamento com usuário de provedor de serviços' })
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())){
        return res.status(400).json( { error: 'Não é permitido uma data anterior a atual' });
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at:null,
                date: hourStart,
            },
        });

        if (checkAvailability){
            return res.status(400).json( { error: 'Data de agendamento não permitida, por favor, escolha uma outra data'} )
        }

        const appointment = await Appointment.create({
            user_id : req.userId,
            provider_id,
            date,

        });
        console.log("testes" + req.userId)

        return res.json(appointment);





    }

}

export default new AppointmentController;