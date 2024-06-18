import mongoose from 'mongoose';
import { Constants } from '../helpers/constants';

const TaskSchema = new mongoose.Schema(
    {
        task_name: {
            type: String,
        },
        due_date: {
            type: Date,
        },
        task_owner : {
            type: mongoose.Schema.Types.ObjectId,
            ref: Constants.TABLES.USER
        },
        description: {
            type: String,
        },
        start_date: {
            type: Date,
        },
        priority: {
            type: String,
            enum : ['low','high','medium']
        },
        task_progress : {
            type: String,
            enum: ['inprogress', 'completed'],
        },
        assignees: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model(Constants.TABLES.TASK, TaskSchema);

export default Task;