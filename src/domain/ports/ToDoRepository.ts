import { ToDo } from "../entities/ToDo";

export interface ToDoRepository {
    findAll(): Promise<ToDo[]>;
    findById(id: string): Promise<ToDo | null>;
    create(toDo: ToDo): Promise<ToDo>;
    update(toDo: ToDo): Promise<ToDo>;
    delete(id: string): Promise<void>;
}