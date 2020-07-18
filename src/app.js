const path = require('path')
const express = require('express')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.post('/setEnv/:process/:key/:value', async(req, res) => {
    try {
        const process = req.params.process
        const key = req.params.key
        const value = req.params.value
        
        
       const data = {
           [key]: value
       }

        await fs.writeFile(`${process}.env`, JSON.stringify(data), (error) => {
            if(error) {
                return res.send(error)
            }
            const dataBuffer = fs.readFileSync(`${process}.env`)
            const dataJSON = dataBuffer.toString()
            res.send(JSON.parse(dataJSON))
        })
    }
    catch(e) {
        res.send(e)
    }
})

app.get('/getEnv/:process', async(req, res) => {
    const process = req.params.process
    try {
        if(fs.existsSync(`${process}.env`)) {
            const dataBuffer = fs.readFileSync(`${process}.env`)
            const dataJSON = dataBuffer.toString()
            res.send(JSON.parse(dataJSON))
        } else {
            res.send({
                error: 'No such process environment exists.'
            })
        }
    } catch(err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


