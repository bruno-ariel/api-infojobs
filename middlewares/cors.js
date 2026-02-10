import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://midu.dev',
    'http://localhost:5173'
]
export const  corsMiddlewares = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>{
    return cors({
        origin: (origin, callback) => {
            if (!origin || acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }
            return callback(new Error('origen no permitido'))
        }
    })
}

