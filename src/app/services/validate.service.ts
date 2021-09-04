import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  public MAILREGEX: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  public MOBILEREGEX: RegExp = /^0(6|7)\d{8}$/;
  public PSWREGEX: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  public LICENCENBREGEX: RegExp = /^\d{7}\w{1}$/;

  constructor() { }

  validateRegister(user: User) {
    if (
      user.lastname == undefined ||
      user.firstname == undefined ||
      user.mail == undefined ||
      user.psw == undefined ||
      user.lvl_id == undefined ||
      user.birthdate == undefined ||
      user.sex_id == undefined
      ) {
      return false;
    } else {
      return true;
    }
  }

   /**
    * Contrôle la validité de l'adresse mail
    * @param mail adresse mail
    */
   isMailValid(mail: string): boolean {
    return this.MAILREGEX.test(mail);
   }

   /**
    * Contrôle la validité du numéro de mobile
    * @param mobile numéro de mobile
    */
   isMobileValid(mobile: string): boolean {
    return this.MOBILEREGEX.test(mobile);
   }

   /**
    * Contrôle la validité du mot de passe
    * @param psw mot de passe
    */
   isPswValid(psw: string): boolean {
    return this.PSWREGEX.test(psw);
   }

   /**
    * Contrôle la validité du numéro de licence
    * @param licence_nb numéro de licence
    */
   isLicenceNbValid(licence_nb: string): boolean {
    return this.LICENCENBREGEX.test(licence_nb);
   }
}
