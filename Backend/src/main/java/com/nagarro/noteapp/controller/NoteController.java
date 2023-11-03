package com.nagarro.noteapp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.noteapp.entity.*;
import com.nagarro.noteapp.repo.NotesRepository;
import com.nagarro.noteapp.repo.UserRepository;
import com.nagarro.noteapp.services.NoteService;

@RestController
@RequestMapping("/user/notes") // Updated base path to /user/notes
public class NoteController {

    @Autowired
    private NotesRepository noteRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NoteService noteService;


    @CrossOrigin("*")
    @GetMapping("/latest")
    public ResponseEntity<List<Notes>> getLatestNotes(Principal principal) {
        User user = getUserByEmail(principal.getName());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<Notes> latestNotes = noteService.getLatestNotesForUser(user);
        return ResponseEntity.ok(latestNotes);
    }


    
    @CrossOrigin("*")
    @PostMapping("/createNote") // Updated endpoint to /user/notes/create
    public Notes createNote(Principal principal, @RequestBody Notes note) {
        User user = getUserByEmail(principal.getName());
        note.setUser(user);
        return noteRepository.save(note);
    }
    

 
    @CrossOrigin("*")
    @DeleteMapping("/delete/{id}") // Updated endpoint to /user/notes/{id}
    public ResponseEntity<?> deleteNote(Principal principal, @PathVariable Integer id) {
        User user = getUserByEmail(principal.getName());
//        Optional<Notes> optionalNote = noteRepository.findById(id);
        Optional<Notes> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent() && optionalNote.get().getUser().equals(user)) {
            noteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }
    
 

    

    // Custom method to get a user by email
    private User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }
}


