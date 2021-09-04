import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from "src/app/common/global-constants";
import sexesList from '../../../assets/lists/sexesList.json'
import { ListInput } from 'src/app/interfaces/list-input';
import { RegisterService } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';
import resources from "../../../assets/resources.json";
import { MasksService } from 'src/app/services/masks.service';
import { emailValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  getLevels$: Subscription;

  /* Default avatar */
  imgSrc: string;

  sexesList: ListInput[];

  levels: [];
  rsc: any;

  maskMobile;
  maskLicenceNb;

  registerForm: FormGroup;
  showPassword: boolean = false;
  showconfirmPassword: boolean = false;

  // inputFile: HTMLInputElement = new HTMLInputElement();

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private registerService: RegisterService,
    private maskService: MasksService,
    private router: Router,
    private GLOBAL: GlobalConstants,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getLevels$ = this.registerService.getLevels().subscribe(
      res => {
          console.log(res);
          
        if (res.success) {
          this.levels = res.levels;
        } else {
          this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 2000});
        }
      }
    );
    
    this.sexesList = sexesList;
    this.imgSrc = this.GLOBAL.DEFAULT_AVATAR;
    this.rsc = resources;
    this.createForm();
    this.maskMobile = this.maskService.GetMobile;
    this.maskLicenceNb = this.maskService.GetLicenceNb;
  }

  ngOnDestroy() {
    this.getLevels$.unsubscribe();
  }

  
  public get validator() : ValidateService {
      return this.validateService;
  }
  

  onRegisterSubmit() {
    console.log(this.registerForm.value);

    // Required fields
    if (!this.validateService.validateRegister(this.registerForm.value)) {
      this.flashMessages.show('Veuillez renseigner tous les champs obligatoires !', {cssClass: 'alert-danger', timeout: 3000});
      this.registerForm.invalid;
      return false;
    }

    // Validate email
    if(!this.validateService.isMailValid(this.registerForm.value.email)) {
      this.flashMessages.show('Veuillez renseigner un email valide !', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.registerService.registerUser(this.registerForm.value)
    .subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Votre compte est bien crée !', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Une erreur est survenue !', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

  createForm() {
    this.registerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      avatar: [''],
      email: ['', [Validators.required, Validators.pattern(this.validateService.MAILREGEX)]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      rank: ['', Validators.required],
      licence_nb: ['', [Validators.required, Validators.pattern(this.validateService.LICENCENBREGEX)]],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.pattern(this.validateService.MOBILEREGEX)],
      sex: ['', Validators.required]
    });
  }

  // triggerFileInput() {
  //   this.inputFile
  // }

}
