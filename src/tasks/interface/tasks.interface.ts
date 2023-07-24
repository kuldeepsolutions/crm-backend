export interface TaskInterface{
    title: String;
    description: String;
    dueDate: Date;
    priority: String;
    status: String;
    remainders: String;
    attachments: String[];
    comments: String;
    activityLog: String[];
    followUp: String;
    tags: String[];
    isCompleted: Boolean;
}