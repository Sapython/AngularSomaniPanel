import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';

@Injectable()
export class DataProvider{
    public data:any;
    public pageSetting:PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public localData:any;
    public userData:UserData | undefined;
    public wallet:any;
    public userDataLoaded:boolean=false;
    public loggedIn:boolean = false;
    public ingredientsCopy:any;
    public gettingUserData:boolean = true;
    public userID:string | undefined;
    public userInstance:User|undefined;
    public page:string = 'user';
    public verifyEmail:boolean | undefined;
    public reloadPage:boolean = false;
    public checkoutData:any;
    public shippingData:any;
    public dataOne:any;
    public dataTwo:any;
    public dataThree:any;
    public dataFour:any;
    public siteData:any = {};
    public webWorkerSupported:boolean = false;
    constructor(){
        if (typeof(Worker) !== "undefined") {
            this.webWorkerSupported = true
        } else {
            this.webWorkerSupported = false
        }
    }
}