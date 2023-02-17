import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js";

const tasks = []

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            return res.end(JSON.stringify(tasks))            
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, decription } = req.body

            const task = {
                id: randomUUID(),
                title,
                decription,
                created_at: new Date()
            }
            tasks.push(task)
            return res.writeHead(201).end()
        }

    }
]