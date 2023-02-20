import { randomUUID } from "node:crypto"
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))            
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            
            const { title, description, completed_at, updated_at } = req.body

            if(title === "" || description === "") {
                return res.writeHead(500).end(JSON.stringify("Title or Description need be write"))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                completed_at,
                updated_at
            }
            database.insert('tasks', task)
            return res.writeHead(201).end()
        }

    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { title, description } = req.body
            const { id } = req.params

            if(title === "" || description === "") {
                return res.writeHead(500).end(JSON.stringify("Title or Description need be write"))
            }

            const rt = database.update('tasks', id, {
                title, 
                description, 
                updated_at: new Date()
            })

            if(rt){
                return res.writeHead(204).end()
            } else {
                return res.writeHead(500).end(JSON.stringify("record not exist"))
            }
        }        
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            
            const task = database.select("tasks", id)
            const { completed_at } = task
            database.update("tasks", id, {completed_at: !!completed_at ? null : new Date()})

            return res.writeHead(201).end(JSON.stringify("PATCH OK"))
            
        }        
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const rt = database.delete("tasks", id)

            if(rt){
                return res.writeHead(204).end()
            } else {
                return res.writeHead(500).end(JSON.stringify("record not exist"))
            }
        }
    }
]