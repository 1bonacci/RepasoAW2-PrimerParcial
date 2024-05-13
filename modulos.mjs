import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { readFile } from 'node:fs'

const raizHTML = 'publica'

const getIndex = (res) => {
    const ruta = join(raizHTML, 'index.html')
    readFile(ruta, (err, data) => {
        if (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain')
            res.end('Error interno')
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        }
    })
}

const getCSS = (req, res) => {
    const ruta = join(raizHTML, req.url)
    readFile(ruta, (err, data) => {
        if (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'text/plain')
            res.end('Ruta no encontrada')
        } else {
            res.statusCode = 200
            res.end(data)
        }
    })
}

const saludos = `{
    "saludos" : [
        "Buenos días",
        "Buenas tardes",
        "Buenas noches"
    ]
}`

const getSaludos = async(res) => {
    try {
        await writeFile('./saludos/saludos.json', saludos)
        console.log("Archivo creado con exito.")
        res.end("Archivo creado con exito.")
    } 
    catch{
        console.log("Error al crear el archivo.")
        res.end("Error al crear el archivo.")
    }
}

export{ getIndex, getCSS, getSaludos}