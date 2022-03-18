const util = require('util');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Manip {
 
  getNotes() {
    return readFileAsync('db/db.json', 'utf8').then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }


  addNote(note) {

    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note must include 'title' and 'text'!");
    }

    // create new note with generated id
    const newNote = { title, text, id: uuidv4() };

    //add new note to notes, overwrite with new note included
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => writeFileAsync('db/db.json', JSON.stringify(updatedNotes)))
  }


  deleteNote(id) {
    // filter() is actually a sieve: we keep all notes where note.id != id
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((sievedNotes) => writeFileAsync('db/db.json', JSON.stringify(sievedNotes)));
  }
  
}

module.exports = Manip;
