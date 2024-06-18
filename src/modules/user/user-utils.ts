import { Constants } from "../../helpers/constants";
import { UserI } from "../../helpers/interfaces";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Task from "../../models/task.model";

export class UserUtils {
    
    public signUp = async (user:UserI) => {
        try{
            console.log('request');
            const existingUser = await User.findOne({ email : user.email });
            console.log(existingUser);
            
            if (existingUser) {
              return {code : Constants.FOUND, msg : 'Email already registered'};
            }
    
            user.password = await bcrypt.hash(user.password, 10);
    
            const newUser = new User(user);
            const saveUser = await newUser.save();
    
            if(saveUser){
                return ResponseBuilder.data(newUser,Constants.MESSAGE.USER_REGISTER_SUCCESS);
            }
    
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }
        catch(err){
            console.log(err);
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }

    }


    public login = async (user:UserI) => {
        try{

            const checkUser = await User.findOne({ email : user.email });
            
            if(!checkUser){
                return {code : Constants.NOT_FOUND_CODE, msg : 'Please sign up first'};
            }
    
            const checkPassword = await bcrypt.compare(user.password, checkUser.password);
    
            if(!checkPassword){
                return {code : Constants.FOUND, msg : 'Invalid Password'};
            }
    
            const payload = {
                _id : checkUser._id
            };
    
            const token = sign(payload, process.env.JWT_SECRET,{ expiresIn: '1d' });
    
            const result = {
                first_name : checkUser.first_name,
                last_name : checkUser.last_name,
                email : checkUser.email,
                token,
                login : true 
            };

            const taskData = await Task.find({ task_owner : checkUser._id}).sort({ due_date : 1}).lean();
            console.log(JSON.stringify(taskData));
            
            return ResponseBuilder.data({...result, allTask : taskData },Constants.MESSAGE.USER_LOGIN_SUCCESS);
        }
        catch(err){
            console.log(err);
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }
    }


}