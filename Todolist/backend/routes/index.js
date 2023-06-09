import express from 'express'
import { todoList, addList, deleteList, changeDone, edit } from '../mongo.js'
const router = express.Router();

router.post('/edit', async(req, res) => {
    const { code } = await edit(req.body.id, req.body.name, req.body.creator, req.body.createDate, req.body.deadline)
    res.json({ code: code })
})

router.get('/todolist', async(req, res) => {
    const { data } = await todoList()
    res.json({ data: data })
})

router.post('/addlist', async(req, res) => {
    const { code } = await addList(req.body.id, req.body.name, req.body.creator, req.body.createDate, req.body.deadline, req.body.taskID)
    res.json({ code: code })
})

router.post('/deleteList', async(req, res) => {
    const { code } = await deleteList(req.body.id)
    res.json({ code: code })
})

router.post('/changeDone', async(req, res) => {
    const { code } = await changeDone(req.body.id)
    res.json({ code: code })
})

export default router;