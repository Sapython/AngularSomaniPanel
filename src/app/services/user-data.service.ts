import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Firestore,
  DocumentReference,
  CollectionReference,
  collection,
  setDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { UserData } from '../structures/user.structure';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  usersDoc: CollectionReference;
  userDoc: DocumentReference | undefined;
  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider 
  ) {
    this.usersDoc = collection(this.firestore, 'users');
  }
  public async setUserData(user: User,username?:string) {
    if (!(await getDoc(doc(this.firestore, 'users/' + user.uid))).exists()) {
      this.dataProvider.pageSetting.blur = true;
      this.dataProvider.pageSetting.lastRedirect = '';
      let data: UserData = {
        userId: user.uid,
        email: user.email || '',
        displayName: username || user.displayName || '',
        photoURL: user.photoURL || this.getRandomImage(),
        phoneNumber: '',
        dob: new Date(),
        access: {
          access: 'guest',
        },
        status: { access: 'active', isOnline: true },
        aadhaarNumber: '',
        gender:'not-specified',
        address:'',
        emailVerified:false,
        tutorialCompleted:false,
        city:'',
        nickName:'',
        pincode:'',
        state:'',
        panCardNumber:'',
        onboardingDone:false,
        selfieImage: '',
        shopImage: '',
        kycStatus:'incomplete',
        qrCode:'',
        memberAssigned:false,
        onboardingSteps: {
          phoneDobDone: false,
          panDone: false,
          locationDone: false,
          aadhaarDone: false,
          photosDone: false,
        },
        payoutDetailsCompleted:false,
        primaryPayoutAccount:null,
        payoutFundAccount:[],
      };
      this.userDoc = doc(this.firestore, 'users/' + user.uid);
      await setDoc(this.userDoc, data).then(() => {
        this.alertify.presentToast('Welcome ' + username || user.displayName + ' to SSSPay Admin Panel 😁');
        this.router.navigate(['after-auth/home']);
      });
      this.dataProvider.pageSetting.blur = false;
    } else {
      this.alertify.presentToast('Welcome back ' + user.displayName + ' to SSSPay Admin Panel 😁');
      this.router.navigate(['after-auth/home']);
      this.dataProvider.pageSetting.blur = false;
    }
  }
  getRandomImage(): string {
    return (
      'https://avatars.dicebear.com/api/gridy/' +
      (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)) +
      '.svg'
    );
  }
}
