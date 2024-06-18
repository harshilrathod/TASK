export interface UserI {
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile_number?: string;
    password?: string;
    _id?: any;
}

export interface TaskI {
    task_name?: String;
    description?: String;
    start_date?: Date;
    priority?: string;
    task_progress?: string;
    assignees?: [];
    task_owner? :any;

}
