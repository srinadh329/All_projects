export interface SIGNUP {
    [x: string]: any;
    firstName: string,
    lastName: string,
    userName: string,
    propertyIdList?: any[],
    passWord: string,
    loginEmail: string,
    address: string,
    city: string,
    state: string,
    country: string,
    zipcode: string
}

export interface CREATE_REWARD {
    [x: string]: any;
    firstName: string,
    lastName: string,
    email:string;
    residentId:string;
    propertyId?:number;
    rewardAmount:number;
}

