import app from './src/app/server'
const secret = process.env.JWT_SECRET

app.listen(3000, () => {
    console.log(`serveur sur écoute au port 3000 ${secret}`)
})