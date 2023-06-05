import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './User';
import { UserService } from './user.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public users: User[] = [];
  public editUser!: User;
  public deleteUser!: User;

  constructor(private userservices: UserService) {}
  ngOnInit() {
    this.getAllUser();
  }

  public onAddUser(addForm: NgForm): void {
    const closeForm = document.getElementById('add-employee-form');
    if (closeForm) {
      closeForm.click();
      this.userservices.addUser(addForm.value).subscribe(
        (response: User) => {
          console.log(response);
          this.getAllUser();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
  }
  public onUpdateUser(user: User): void {
    this.userservices.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getAllUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  public getAllUser(): void {
    this.userservices.getAllUser().subscribe(
      (respose: User[]) => {
        this.users = respose;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteUser(userId: number): void {
    this.userservices.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.address.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getAllUser();
    }
  }
  
  public onOpenModal(user: User | null, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if (mode === 'edit') {
        if (user) {
          this.editUser = user;
        }
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if (mode === 'Delete') {
        if (user) {
          this.deleteUser = user;
        }
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container.appendChild(button);
      button.click();
    }
  }
  


}
