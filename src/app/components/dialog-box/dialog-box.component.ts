import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '@models/contact';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { CONSTANTS } from 'app/shared/constant';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  public inputData: Contact;
  public action: string;
  public addContactForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Contact,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.inputData = { ...this.data };
    this.action = this.inputData.action;
    this.addContactForm = this.formBuilder.group({
      firstName: new FormControl(this.inputData.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.inputData.lastName, [Validators.required]),
      email: new FormControl(this.inputData.email, [
        Validators.required,
        Validators.pattern(CONSTANTS.EMAIL_VALIDATOR)
      ]),
      phoneNumber: new FormControl(this.inputData.phoneNumber, [
        Validators.required
      ]),
      status: new FormControl(this.inputData.status)
    });
  }

  public onChange(toggle): void {
    this.inputData.status = toggle.checked;
  }

  public doAction(): void {
    this.inputData.id
      ? (this.inputData = {
          ...this.addContactForm.value,
          id: this.inputData.id
        })
      : (this.inputData = { ...this.addContactForm.value });

    this.dialogRef.close({
      event: this.action,
      data: this.inputData
    });
  }

  public closeDialog(): void {
    this.dialogRef.close({ event: CONSTANTS.ACTIONS.CANCEL });
  }
}
