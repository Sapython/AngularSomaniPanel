export type UserData = {
  userId:string;
  displayName:string;
  email:string;
  phoneNumber?:string;
  dob:any;
  photoURL:string;
  gender:'male' | 'female' | 'other' | 'not-specified';
  emailVerified:boolean;
  access:UserAccess;
  status:UserStatus;
  nickName?:string;
  state?:string;
  city?:string;
  pincode?:string;
  address:string;
  aadhaarNumber:string;
  tutorialCompleted:boolean;
  panCardNumber:string;
  qrCode:string;
  onboardingDone:boolean;
  payoutDetailsCompleted:boolean;
  primaryPayoutAccount:FundAccount | null;
  payoutFundAccount:FundAccount[];
  selfieImage:string;
  shopImage:string;
  memberAssigned:boolean;
  kycStatus:'pending' | 'approved' | 'rejected' | 'incomplete';
  onboardingSteps:{
      phoneDobDone:boolean;
      panDone:boolean;
      locationDone:boolean;
      aadhaarDone:boolean;
      photosDone:boolean;
  },
  messageToken?:string;
}
export type FundAccount = {
  name:string;
  email:string;
  contact:string;
  accountId:string;
  accountType:'bank_account'|'vpa'|'card';
  bankAccountName?:string;
  accountNumber?:string;
  ifsc?:string;
  vpa?:string;
  cardNumber?:string;
  cardName?:string;
}
export type UserStatus = {
  isOnline: boolean;
  access: 'active' | 'inactive' | 'blocked' | 'deleted';
};
export type UserAccess = {
  access:
    | 'admin'
    | 'superDistributor'
    | 'masterDistributor'
    | 'distributor'
    | 'retailer'
    | 'guest';
};
