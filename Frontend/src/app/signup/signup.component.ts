import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  msg: any;
  user = new User();
  registrationSuccessful: boolean = false;
  userExistsError: boolean = false;

  constructor(
    private service: ServicesService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  ngOnInit(): void {}

  // Method to register a new user
  registerUser() {
    this.service.registerUser(this.user).subscribe({
      next: (data) => {
        console.log("Success!");
        this.registrationSuccessful = true;
        this.service.setUser(data);
        this.service.isLoggedIn = true;
        this.router.navigate(['login'], { queryParams: { registered: true }});
      },
      error: (err) => {
        console.log("Error!");
        if (err.status === 500) {
          this.userExistsError = true;
          this.msg = "User with the same email already exists.";

          // Show a snackbar alert
          this.snackBar.open('User with the same email already exists', 'Dismiss', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        } else {
          this.msg = "Please Check Your Email | Password";
        }
      }
    });
  }
}
