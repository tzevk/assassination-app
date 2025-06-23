import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables')
}

if (process.env.NODE_ENV === 'development') {
  // Reuse connection in dev mode (hot reload safe)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // New client in production
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise