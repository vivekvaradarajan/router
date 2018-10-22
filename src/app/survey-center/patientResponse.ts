export class PatientResponse
{
    IsSuccess:boolean;
    ErrorMessage:string;
    UserData:number;

    constructor( IsSuccess:boolean,ErrorMessage:string, UserData:number){
            this.IsSuccess = IsSuccess;
            this.ErrorMessage = ErrorMessage;
            this.UserData = UserData;
        }
}