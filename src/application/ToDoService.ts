import { ToDo } from "../domain/entities/ToDo";
import { ToDoRepository } from "../domain/ports/ToDoRepository";
import { v4 as uuidv4 } from "uuid";

export class ToDoService {
    constructor(private readonly toDoRepository: ToDoRepository) { }

    async getAllToDos(): Promise<ToDo[]> {
        return this.toDoRepository.findAll();
    }

    async getToDoById(id: string): Promise<ToDo | null> {
        return this.toDoRepository.findById(id);
    }

    async createToDo(toDo: { title: string; description?: string }) {
        const newToDo = {
            id: uuidv4(),
            title: toDo.title,
            description: toDo.description,
            completed: false,
        };
        return this.toDoRepository.create(newToDo);
    }

    async updateToDo(toDo: ToDo): Promise<ToDo> {
        return this.toDoRepository.update(toDo);
    }

    async deleteToDo(id: string): Promise<void> {
        return this.toDoRepository.delete(id);
    }
}