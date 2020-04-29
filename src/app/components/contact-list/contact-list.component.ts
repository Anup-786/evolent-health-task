import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatPaginator,
  MatDialog,
  MatTable,
  MatTableDataSource,
  MatSnackBar
} from '@angular/material';

import { ContactService } from '@services/contact/contact.service';
import { Contact } from '@models/contact';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';
import { CONSTANTS } from 'app/shared/constant';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private iSubscription = new Subscription();
  public dataSource;
  public displayedColumns = CONSTANTS.DISPLAYED_COLUMNS;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private readonly contactService: ContactService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = [];
    this.getContacts();
  }

  private getContacts(): void {
    this.iSubscription.add(
      this.contactService.getContactList().subscribe((contacts: Contact[]) => {
        if (contacts) {
          this.dataSource = new MatTableDataSource<Contact>(contacts);
          this.dataSource.paginator = this.paginator;
        }
      })
    );
  }

  public openDialog(action: string, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.processingResponse(result, dialogRef) : dialogRef.close();
    });
  }

  private processingResponse(result, dialogRef): void {
    if (result.data && !result.data.status) {
      result.data.status = false;
    }
    result.event === CONSTANTS.ACTIONS.ADD
      ? this.addContact(result.data)
      : result.event === CONSTANTS.ACTIONS.UPDATE
      ? this.updateContact(result.data)
      : result.event === CONSTANTS.ACTIONS.DELETE
      ? this.deleteContact(result.data)
      : dialogRef.close();
  }

  private addContact(inputData: Contact): void {
    if (inputData) {
      const nextIndex = this.dataSource.data.length + 1;
      this.dataSource.data.push({
        id: nextIndex,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        phoneNumber: inputData.phoneNumber,
        status: inputData.status,
        email: inputData.email
      });
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
      this.openSnackBar(CONSTANTS.ACTIONS.ADD);
    }
  }
  private updateContact(inputData: Contact): void {
    this.dataSource.data = this.dataSource.data.filter(value => {
      if (value.id === inputData.id) {
        value.firstName = inputData.firstName;
        value.lastName = inputData.lastName;
        value.email = inputData.email;
        value.phoneNumber = inputData.phoneNumber;
        value.status = inputData.status;
      }
      return true;
    });
    this.openSnackBar(CONSTANTS.ACTIONS.UPDATE);
  }
  private deleteContact(inputData: Contact): void {
    this.dataSource.data = this.dataSource.data.filter(value => {
      return value.id !== inputData.id;
    });
    this.openSnackBar(CONSTANTS.ACTIONS.DELETE);
  }

  private openSnackBar(action): void {
    action === CONSTANTS.ACTIONS.ADD
      ? this.snackBar.open(CONSTANTS.MESSAGES.CONTACT_ADDED, '', {
          duration: CONSTANTS.DURATION_IN_SECONDS
        })
      : action === CONSTANTS.ACTIONS.UPDATE
      ? this.snackBar.open(CONSTANTS.MESSAGES.CONTACT_UPDATED, '', {
          duration: CONSTANTS.DURATION_IN_SECONDS
        })
      : action === CONSTANTS.ACTIONS.DELETE
      ? this.snackBar.open(CONSTANTS.MESSAGES.CONTACT_DELETED, '', {
          duration: CONSTANTS.DURATION_IN_SECONDS
        })
      : null;
  }

  ngOnDestroy() {
    this.iSubscription.unsubscribe();
  }
}
