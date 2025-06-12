import { Request, Response, Router } from "express";
import { ToDoService } from "../application/ToDoService";

export function createToDoRouter(toDoService: ToDoService): Router {
    const router = Router()

    router.get('/', async (_req: Request, res: Response) => {
        const toDos = await toDoService.getAllToDos()
        res.json(toDos)
    })

    // @ts-expect-error Express 5 async handler type issue
    router.get('/:id', async (req: Request, res: Response) => {
        const toDo = await toDoService.getToDoById(req.params.id)
        if (!toDo) return res.status(404).send('ToDo Not Found')
        return res.json(toDo)
    })

    // @ts-expect-error Express 5 async handler type issue
    router.post('/', async (req: Request, res: Response) => {
        const { title, description } = req.body
        const toDo = await toDoService.createToDo({ title, description })
        return res.status(201).json(toDo)
    })

    // @ts-expect-error Express 5 async handler type issue
    router.put('/:id', async (req: Request, res: Response) => {
        const { title, description, completed } = req.body
        const toDo = await toDoService.getToDoById(req.params.id)
        if (!toDo) return res.status(404).send('ToDo Not Found')
        const updateToDo = {
            ...toDo,
            title,
            description,
            completed
        }
        const result = await toDoService.updateToDo(updateToDo)
        return res.json()
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        await toDoService.deleteToDo(req.params.id)
        res.status(204).send()
    })

    return router
}