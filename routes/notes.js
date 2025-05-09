const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a new note
router.post('/', async (req, res) => {
  const newNote = new Note(req.body);
  const savedNote = await newNote.save();
  res.json(savedNote);
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const result = await Note.findByIdAndDelete(req.params.id);
  res.json({ success: !!result });
});

module.exports = router;
