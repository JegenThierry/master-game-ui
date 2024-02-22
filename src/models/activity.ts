import { TeamId } from "./enums";
import { Task } from "./task";

export class Activity {
    public task: Task;
    public username:string;
    public profileUrl:string;
    public completionDate:Date;
    public teamId: TeamId

    constructor(task:Task, username:string, profileUrl:string, teamId:TeamId){
        this.task = task;
        this.username = username;
        this.profileUrl = profileUrl;
        this.completionDate = new Date();
        this.teamId = teamId;
    }
}