import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController{


    async index(req, res){
        const checkUserProvider = await User.findOne({
            where: { id:req.userId, provider:true},
        });

        if(checkUserProvider){

            const { date } = req.query;

            const appointments = await Appointment.findAll({
                where: { date:date  }
            })

            res.json(appointments);
        }else{
            return res.status(401).json({ error: 'User is not a povider'})
        }

    }


}


export default new ScheduleController();