import express from 'express';
import handler from './handler.js';

const router = express.Router()

router.get('/notes', handler.getNotes)

router.get('/notes/:id', handler.getNoteById)

router.post('/notes', handler.createNote)

router.put('/notes/:id', handler.editNote)

router.delete('/notes/:id', handler.deleteNote)

export default router

