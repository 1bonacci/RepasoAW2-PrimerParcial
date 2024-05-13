/*
No utilizar computadora propia ni celular
No iniciar whatsapp web

CONSIGNAS

- El la carpeta del proyecto crear un archivo "servidor.mjs"
- Uso obligatorio de los modulos http, fs o fs/promises, path
- Creacion de servidor y escuchar en el puerto 3000

- Agrupar las peticiones que atiendan los métodos (verbos) GET y POST, capturar 
las peticiones que no vengan con ninguno de esos verbos.

- Crear funciones para desacoplar el código y gestionar las peticiones
Cada función manejará las resspuestas al servidor (comentar el objetivo de la función)
- Crear un módulo que contenga todas las funcionalidades y poder importarlas
al archivo de inicio "servidor.mjs"
- En GET: 
---- Crear una ruta de petición estática en la raíz / que devuelva un index.html 
---- Crear una ruta de petición dinámica (construir la ruta del sistema operativo con la ruta de petición) para atender la carga del archivo css
- En POST:
---- Crear una ruta de petición que cree y escriba un archivo .json en la carpeta "saludos" con el contenido:

{
    "saludos" : [
        "Buenos días",
        "Buenas tardes",
        "Buenas noches"
    ]
}



*/

import { createServer } from 'node:http'
import { getIndex, getCSS, getSaludos } from './modulos.mjs'

const puerto = 3000

const server = createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            getIndex(res)
        } else {
            getCSS(req, res)
        }
    }  else if (req.method === 'POST'){
        if (req.url === '/json') {
            getSaludos(res)
        }
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Method not allowed')
    }
})

server.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`)
})