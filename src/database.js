import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    select(table) {
        const data = this.#database[table]
        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()

        return data

    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1) {
            const { created_at, completed_at } = this.#database[table][rowIndex]
            const { title, description, updated_at } = data
            const changeData = {
                id,
                title,
                description, 
                created_at,
                completed_at,
                updated_at
            }
            this.#database[table][rowIndex] = { id, ...changeData}
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
}