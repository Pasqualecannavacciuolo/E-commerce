import { Course } from "./Course";

export interface Cart {
    id: any,
    items: Course[],
    total: number
}