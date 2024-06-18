import { Constants } from "../../helpers/constants";
import { TaskI, UserI } from "../../helpers/interfaces";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Task from "../../models/task.model";

export class TaskUtils {
    
    public createTask = async (user:UserI,taskData:TaskI) => {
        try{
            console.log('request');
            taskData.task_owner = user._id;

            console.log(taskData);

            const task = new Task(taskData);
            const saveTask = await task.save();
            
            if(saveTask){
                const all_task = await Task.find({task_owner : user._id}).sort({due_date : 1});
                return ResponseBuilder.data({taskData:task,allTask : all_task },'Task Created Successfullt')
            }
            return ResponseBuilder.errorMessage('Failed');
        }
        catch(err){
            console.log(err);
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }

    }


    public updateTask = async (user:UserI,taskData:TaskI,task_id:any) => {
        try{
            console.log('request');
            taskData.task_owner = user._id;

            console.log(taskData);
            const updateTaskData = await Task.updateOne({_id : task_id},taskData);
            
            if(updateTaskData){
                const all_task = await Task.find({task_owner : user._id}).sort({due_date : 1});
                return ResponseBuilder.data({ taskData,allTask : all_task },'Task Updated Successfullt')
            }
            return ResponseBuilder.errorMessage('Failed');
        }
        catch(err){
            console.log(err);
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }

    }

    public getTasks = async (user:UserI,search:string,page?:number,limit?:number) => {
        try{

            const match:any = {
                task_owner : user._id
            };

            if(search){
                match['task_name'] = { $regex : new RegExp(search) };
            }

            const pipeline:any = [
                {
                    $match : match
                },
                {
                    $sort : {
                        due_date : 1
                    }
                },               
            ]

            if(page && limit){
                pipeline.push(
                    {
                        $skip : (page-1)*limit
                    },
                    {
                        $limit : limit
                    }
                );
            }
            console.log(pipeline);
            
            const tasks = await Task.aggregate(pipeline);
            return ResponseBuilder.data({ allTask : tasks },'Task Data');
        }
        catch(err){
            console.log(err);
            return ResponseBuilder.errorMessage(Constants.MESSAGE.INTERNAL_SERVER_ERROR);
        }
    }


}