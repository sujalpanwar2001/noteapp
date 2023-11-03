import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  noteData = { title: '', description: '' };
  specialCharactersInvalid = false;

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {}

    // Method to check if a user is logged in
    loggedIn() {
      return this.service.isLogIn();
    }
  
    // Method to log out the user and navigate to the home page
    logout() {
      this.service.logout();
      this.router.navigate(['home']);
    }
  
    // Method to get the current user
    currentUser() {
      return this.service.getUser();
    }
  
   
  

  ngAfterViewInit() {
    const descriptionTextarea = document.getElementById('description') as HTMLTextAreaElement;
    
    descriptionTextarea.addEventListener('input', () => {
      // Check for special characters in real-time
      const containsSpecialCharacters = /[^\w@;&*+\- ]/.test(this.noteData.description);
      
      if (containsSpecialCharacters) {
        this.specialCharactersInvalid = true;
      } else {
        this.specialCharactersInvalid = false;
      }
    });
  }

  createNote(addPostForm: NgForm) {
    if (addPostForm.invalid || this.noteData.description.length > 500 || this.specialCharactersInvalid) {
      return;
    }

    let newPost = {
      title: this.noteData.title,
      description: this.noteData.description,
      id: this.service.getUser().id
    };

    this.service.createNote(newPost).subscribe(
      () => {
        console.log('Note created successfully:', this.noteData);

        addPostForm.resetForm();
        this.noteData.description = ''; // Clear the textarea

        this.specialCharactersInvalid = false; // Reset the special character warning
      },
      (error) => {
        console.error('Error creating note:', error);
        // Handle error or show an error message to the user
      }
    );
  }
}
