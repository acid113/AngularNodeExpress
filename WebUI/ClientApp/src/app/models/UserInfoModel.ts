export class UserInfoModel {
    ID: string;
    GUID: string;
    FirstName: string;
    LastName: string;
    Email: string;

    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}
