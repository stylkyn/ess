export interface IUser {
    Id?: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    status?: string;
    hidden?: number;
    createdAtDate?: Date;
    correctedAtDate?: Date;
    title?: string;
    email: string;
    sendEmail?: string;
    department_Id?: number;
    role_Id: number;
    fb_Id?: string;
    google_Id?: string;
}
