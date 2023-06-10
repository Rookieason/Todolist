import express from 'express'
import { todoList, addList, deleteList, changeDone, edit, historyList, deleteHistory } from '../mongo.js'
const router = express.Router();

router.post('/edit', async(req, res) => {
    const { code } = await edit(req.body.id, req.body.name, req.body.creator, req.body.createDate, req.body.deadline)
    res.json({ code: code })
})

router.get('/historylist', async(req, res) => {
    const { history, code } = await historyList(req.query.name)
    res.json({ history: history, code: code })
})

router.post('/deleteHistory', async(req, res) => {
    const { code } = await deleteHistory(req.body.username, req.body.name, req.body.creator, req.body.id)
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