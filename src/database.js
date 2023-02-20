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

    select(table, id) {
        let rowIndex = undefined
        let data = undefined
        if(id) {
            rowIndex = this.#database[table].findIndex(row => row.id === id)
        } else {
            return data = this.#database[table]
        }
        if(rowIndex > -1) {
            return data = this.#database[table][rowIndex]
        }
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
        console.log("data: ", data)
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1) {
            const row = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = { id, ...row, ...data}
            this.#persist()
            return true
        } else {
            return false            
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
            return true
        } else {
            return false
        }
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
}