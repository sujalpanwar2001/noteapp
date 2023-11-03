import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  notes: any[] = [];
  maxNotesToShow = 10;

  constructor(private service: ServicesService , private router: Router) {}

  ngOnInit(): void {
    this.loadRecentNotes();
  }
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

  loadRecentNotes(): void {
    this.service.getLatestNotes().subscribe(
      (data: any) => {
        this.notes = Array.isArray(data) ? data.slice(0, this.maxNotesToShow) : [];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteNote(id: any): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.service.deleteNote(id).subscribe({
        next: () => {
          // Find the index of the note with the given id
          const index = this.notes.findIndex((note) => note.id === id);
          
          if (index !== -1) {
            // Remove the deleted note from the array
            this.notes.splice(index, 1);
          }
  
          // Check if there are fewer notes than the maximum count
          if (this.notes.length < this.maxNotesToShow) {
            // Fetch the latest note from the database
            this.loadRecentNotes(); // Call the method to reload data
          }
        },
        error: (err) => {
          console.log('Error deleting note:', err);
        }
      });
    }
  }
}