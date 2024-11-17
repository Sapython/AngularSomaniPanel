import { Timestamp } from "@angular/fire/firestore";

export type Transaction = {
  id?:string;
  title?:string;
  receiver:string;
  date:any;
  type:'aeps'|'cableDth'|'fastTag'|'gas'|'recharge'|'expressPayout'|'dailyPayout';
  amount:number;
  description:string;
  balance:number;
  idempotencyKey:string;
  completed:boolean;
  status:'started'|'pending'|'success'|'error'|'unknown';
  error:string;
  extraData:any;
  successData?:any;
}