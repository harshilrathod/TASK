import { Constants } from "../../helpers/constants";
import { TaskUtils } from "./task-utils";


export class TaskController {

    private taskUtils = new TaskUtils();

    public createTask = async (req: any, res: any) => {
        const { user } = req;
        const { task_name,due_date,description,start_date,priority,task_progress,assignees } = req.body;

        const taskData = {
            task_name,due_date,description,start_date,priority,task_progress,assignees:assignees.split(',')
        };  

        console.log(taskData);
        

        const result:any = await this.taskUtils.createTask(user,taskData);

        if(result.code == Constants.SUCCESS_CODE){
            console.log(result);
            res.render('dashboard.ejs',{ message : result.msg, data : result.result });
        }
        else{
            res.render('createTask.ejs',{ message : result.msg, data : result.result });
        }
        // return res.status(result.code).json(result);

    }

    public updateTask = async (req: any, res: any) => {
        const { user } = req;
        const { task_name,due_date,description,start_date,priority,task_progress,assignees } = req.body;
        const task_id = req.query.task_id;

        const taskData = {
            task_name,due_date,description,start_date,priority,task_progress,assignees:assignees.split(',')
        };  

        console.log(taskData);
        

        const result:any = await this.taskUtils.updateTask(user,taskData,task_id);

        if(result.code == Constants.SUCCESS_CODE){
            console.log(result);
            res.render('dashboard.ejs',{ message : result.msg, data : result.result });
        }
        else{
            res.render('createTask.ejs',{ message : result.msg, data : result.result });
        }

    }

    public getTask = async (req: any, res: any) => {
        const { user } = req;
        const search = req.query?.search;
        const result:any = await this.taskUtils.getTasks(user,search);
        if(result.code == Constants.SUCCESS_CODE){
            console.log(result);
            // return { message : result.msg, allTask : result.result.allTask };
            return res.render('dashboard.ejs',{ message : result.msg,data : {}, allTask : result.result.allTask });
        }
        else{
            return res.render('dashboard.ejs',{ message : 'No task Found',});
        }
    }
    
}