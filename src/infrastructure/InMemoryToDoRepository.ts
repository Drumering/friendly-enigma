import { log } from "console";
import { ToDo } from "../domain/entities/ToDo";
import { ToDoRepository } from "../domain/ports/ToDoRepository";

export class InMemoryToDoRepository implements ToDoRepository {
    private toDos: ToDo[] = [];

    async findAll(): Promise<ToDo[]> {
        return this.toDos;
    }

    async findById(id: string): Promise<ToDo | null> {
        const toDo = this.toDos.find(toDo => toDo.id === id);
        return toDo ?? null;
    }

    async create(toDo: ToDo): Promise<ToDo> {
        this.toDos.push(toDo);
        log(`ToDo with id ${toDo.id} created`);
        return toDo;
    }

    async update(toDo: ToDo): Promise<ToDo> {
        const index = this.toDos.findIndex(existingToDo => existingToDo.id === toDo.id);
        if (index === -1) {
            throw new Error("ToDo not found");
        }
        this.toDos[index] = toDo;
        log(`ToDo with id ${toDo.id} updated`);
        return toDo;
    }

    async delete(id: string): Promise<void> {
        this.toDos = this.toDos.filter(toDo => toDo.id !== id);
        log(`ToDo with id ${id} deleted`);
    }
}