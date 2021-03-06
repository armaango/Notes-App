const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleRestriction = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyRestriction = {
  describe: 'Body of the note',
  demand: true,
  alias:'b'
};

const argv = yargs
.command('add','Add a new note', {
  title: titleRestriction,
  body: bodyRestriction
})
.command('list','List all notes')
.command('read','Read a note',{
  title: titleRestriction
})
.command('remove','Remove a note', {
  title: titleRestriction
})
.help()
.argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note) {
    console.log('Note Created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }

} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if(note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note with given title not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note was not found' ;
  console.log(message);
} else {
  console.log('Command not recognised');
}
