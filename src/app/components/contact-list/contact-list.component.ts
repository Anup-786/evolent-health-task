import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatPaginator,
  MatDialog,
  MatTable,
  MatTableDataSource
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
    private readonly dialog: MatDialog
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
      if (result) {
        if (!result.data.status) {
          result.data.status = false;
        }
        if (result.event === CONSTANTS.ACTIONS.ADD) {
          this.addContact(result.data);
        } else if (result.event === CONSTANTS.ACTIONS.UPDATE) {
          this.updateContact(result.data);
        } else if (result.event === CONSTANTS.ACTIONS.DELETE) {
          this.deleteContact(result.data);
        }
      }
    });
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
  }
  private deleteContact(inputData: Contact): void {
    this.dataSource.data = this.dataSource.data.filter(value => {
      return value.id !== inputData.id;
    });
  }

  ngOnDestroy() {
    this.iSubscription.unsubscribe();
  }
}
