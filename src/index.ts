import express from 'express'
import { InMemoryToDoRepository } from './infrastructure/InMemoryToDoRepository'
import { ToDoService } from './application/ToDoService'
import { createToDoRouter } from './interfaces/ToDoController'

const app = express()
app.use(express.json())

const toDoRepository = new InMemoryToDoRepository()
const toDoService = new ToDoService(toDoRepository)
const toDoRouter = createToDoRouter(toDoService)

app.use('/todos', toDoRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})