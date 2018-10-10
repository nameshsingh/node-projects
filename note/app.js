const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./note.js');

const argv = yargs
    .command('add', 'Add a new note',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        },
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all node')
    .command('read', 'Read a note',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .command('delete', 'Delete a note',{
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't'
        }
    })
    .help()
    .argv;

var command = argv._[0];

if(command == 'add') {
    var note = notes.addNote(argv.title,argv.body);
    if(note) {
        console.log('Note created');
        notes.logNote(note);
    }
    else {
        console.log('Note title already exist');
    }
}   else if(command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(element => {
        notes.logNote(element);
    });
}   else if(command == 'read') {
    var note = notes.getNote(argv.title);
    if(note) {
        console.log('Note found');
        notes.logNote(note);        
    }
    else {
        console.log('Note not found');
    }
}   else if(command == 'delete') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was Removed' : 'Note not found';
    console.log(message);
}
else {
    console.log('command not recognized');
}