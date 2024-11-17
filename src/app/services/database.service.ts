import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  deleteBill(id: any) {
    return deleteDoc(doc(this.fs,"transactions",id))
  }
  getPackages() {
    return getDocs(collection(this.fs,"packages"))
  }

  getServices(){
    return getDocs(collection(this.fs,"servicesAdmin"))
  }

  deleteService(id: string) {
    return deleteDoc(doc(this.fs, '/servicesAdmin/' + id))
  }
  
  addService(value: any) {
    return addDoc(collection(this.fs,"servicesAdmin"),value)
  }

  updateService(id: string, value: any) {
    return updateDoc(doc(this.fs, '/servicesAdmin/' + id), value)
  }
  
  addPackage(value: any) {
    return addDoc(collection(this.fs,"packages"),value)
  }

  getCategories(){
    return getDocs(collection(this.fs,"categories"))
  }

  addCategory(value: any) {
    return addDoc(collection(this.fs,"categories"),value)
  }

  deleteCategory(id: string) {
    return deleteDoc(doc(this.fs, '/categories/' + id))
  }

  updateCategory(id: string, value: any) {
    return updateDoc(doc(this.fs, '/categories/' + id), value)
  }
  
  addTransaction(data:any){
    return addDoc(collection(this.fs,"transactions"),data)
  }

  updateTransaction(data:any, id:string){
    return updateDoc(doc(this.fs,"transactions",id),data)
  }
  
  getTransactions(){
    return getDocs(collection(this.fs,"transactions"))
  }
  
  getEmployees(){
    return getDocs(collection(this.fs,"employee"))
  }

  addEmployee(value: any) {
    return addDoc(collection(this.fs,"employee"),value)
  }

  deleteEmployee(id: string) {
    return deleteDoc(doc(this.fs, '/employee/' + id))
  }

  updateEmployee(id: string, value: any) {
    return updateDoc(doc(this.fs, '/employee/' + id), value)
  }

  getCustomers(){
    return getDocs(collection(this.fs,"customers"))
  }

  addCustomer(value: any) {
    return addDoc(collection(this.fs,"customers"),value)
  }

  deleteCustomer(id: string) {
    return deleteDoc(doc(this.fs, '/customers/' + id))
  }

  updateCustomer(id: string, value: any) {
    return updateDoc(doc(this.fs, '/customers/' + id), value)
  }

  addAttendance(data:any, employeeId:string){
    return addDoc(collection(this.fs,"employee",employeeId,'attendance'),data)
  }

  updateAttendance(data:any, employeeId:string, attendanceId:string){
    return updateDoc(doc(this.fs,"employee",employeeId,'attendance',attendanceId),data)
  }

  constructor(private fs:Firestore) { }
}
