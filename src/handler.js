import notes from './notes.js'
import { v4 as uuidv4 } from 'uuid'

const getNotes = (req, res, next) => {
    const params = req.params
    res.status(200).json({
        status: "success",
        data: { notes }
    })
}

const getNoteById = (req, res, next) => {
    const { id } = req.params

    const note = notes.find(element => element.id === id)

    if (!note) {
        return res.status(404).json({
            status: 'fail',
            message: 'Catatan tidak ditemukan'
        })
    }

    res.status(200).json({
        status: "success",
        data: { note }
    })
}

const createNote = (req, res, next) => {
    const { title, tags, body } = req;
    const noteId = uuidv4()

    let duplicateid = false;

    if (notes.length > 0) {
        duplicateid = notes.find(element => element.id == noteId)
    }

    if (duplicateid) {
        return res.status(500).json({
            status: "error",
            message: "Catatan gagal untuk ditambahkan"
        })
    }

    notes.push({
        id: noteId,
        title: title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: tags,
        body: body
    })

    return res.status(201).json({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
            noteId: noteId
        }
    })
}

const editNote = (req, res, next) => {
    const { title, tags, body } = req;

    const { id } = req.params

    const indexNote = notes.findIndex(element => element.id === id)

    if (indexNote === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Gagal memperbarui catatan. Id catatan tidak ditemukan"
        })
    }

    const oldNote = notes[indexNote]

    notes[indexNote] = {
        id: oldNote.id,
        title: title,
        createdAt: oldNote.createdAt,
        updatedAt: new Date().toISOString(),
        tags: tags,
        body: body
    }

    return res.status(200).json({
        status: "success",
        message: "Catatan berhasil diperbaharui"
    })
}

const deleteNote = (req, res, next) => {
    const { id } = req.params

    const indexNote = notes.findIndex(element => element.id === id)

    if (indexNote === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Catatan gagal dihapus. Id catatan tidak ditemukan"
        })
    }

    notes.splice(indexNote, 1)

    return res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil dihapus'
    })
}

const handler = {
    getNotes,
    createNote,
    getNoteById,
    editNote,
    deleteNote
}

export default handler