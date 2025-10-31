import express from 'express'
import vehiculeRouter from '../features/vehicule'
import UserRouter from '../features/users'

const app = express()

app.use(express.json())
app.use('/vehicule', vehiculeRouter)
app.use('/user', UserRouter)

export default app;




