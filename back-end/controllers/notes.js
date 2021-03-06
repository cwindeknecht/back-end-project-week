const Note = require('../models/note');
const User = require('../models/user');

//Errors I've Checked:
//Invalid ID results in 'User Not Logged In'
//Invalid Token results in 'Failed to Verify Token'
//Defaults are set up so an empty note with no information can be created
const createNote = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const { userId } = req.params;
    const newNote = new Note({ ...req.body, user: userId });

    User.findById(userId).then((user) => {
      newNote
        .save()
        .then((savedNote) => {
          res.status(201).json({ message: 'New Note Created', savedNote });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Creating Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

//Errors I've Checked:
//Invalid ID results in 'User Not Logged In'
//Invalid Token results in 'Failed to Verify Token'
const getNotes = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const { userId } = req.params;
    User.findById(userId).then((user) => {
      Note.find({ user: userId })
        .then((foundNotes) => {
          res.status(200).json({ message: 'Your Notes', foundNotes });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Retrieving Notes', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

//Errors I've Checked:
//Invalid ID results in 'User Not Logged In'
//Invalid Note ID results in 'Note Does Not Exist'
//Invalid Token results in 'Failed to Verify Token'
const getNote = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const { userId, noteId } = req.params;
    User.findById(userId).then((user) => {
      Note.findById(noteId)
        .then((foundNote) => {
          if (foundNote === null) {
            return res.status(422).json({ message: 'Note Does Not Exist' });
          } else {
            res.status(200).json({ message: 'The Note You Requested', foundNote });
          }
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Retrieving Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

//Errors I've Checked:
//Invalid ID results in 'User Not Logged In'
//Invalid Note ID results in 'Note Does Not Exist'
//Invalid Token results in 'Failed to Verify Token'
const updateNote = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const { userId, noteId } = req.params;
    const updates = req.body;
    User.findById(userId).then((user) => {
      Note.findByIdAndUpdate(noteId, updates, { new: true })
        .then((updatedNote) => {
          if (updatedNote === null) {
            return res.status(422).json({ message: 'Note Does Not Exist' });
          } else {
            res.status(200).json({ message: 'Note Has Been Updated', updatedNote });
          }
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Updating Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

//Errors I've Checked:
//Invalid ID results in 'User Not Logged In'
//Invalid Note ID results in 'Note Does Not Exist'
//Invalid Token results in 'Failed to Verify Token'
const deleteNote = (req, res) => {
  if (req.decoded.userId === req.params.userId) {
    const { userId, noteId } = req.params;
    User.findById(userId).then((user) => {
      Note.findByIdAndRemove(noteId)
        .then((deletedNote) => {
          if (deletedNote === null) {
            return res.status(422).json({ message: 'Note Does Not Exist' });
          } else {
            return res.status(200).json({ message: 'Note Has Been Deleted', deletedNote });
          }
        })
        .catch((error) => {
          res.status(422).json({ message: 'Error Deleting Note', error });
        });
    });
  } else {
    res.status(422).json({ message: 'User Not Logged In' });
  }
};

module.exports = {
  createNote,
  getNote,
  getNotes,
  updateNote,
  deleteNote,
};
