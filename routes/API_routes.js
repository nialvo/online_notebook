const router = require('express').Router();
const Manip = require('../db/manip');
const manip = new Manip();


// get all notes
router.get('/notes', (req, res) => {
    manip.getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});


// add a note
router.post('/notes', (req, res) => {
    manip.addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// delete a note
router.delete('/notes/:id', (req, res) => {
    manip.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;