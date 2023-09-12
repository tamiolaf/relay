import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("relay");

    const entries = await db
    .collection("entries")
    .find({})
    .toArray();

    res.json(entries);
  } else if (req.method === "POST") {
    
    const insertedEntry = await addEntry(req.body)
    res.status(200).json(`Entry ${insertedEntry} sent!`)
  }
  
  } catch (e) {
    console.error(e);
  }
};

export const addEntry = async(entry) => {
  const client = await clientPromise;

  const db = client.db("relay");

  entry.createdAt = new Date().toISOString();
  entry.friendId = new ObjectId(entry.friendId);

  const response = await db
    .collection("entries")
    .insertOne(entry)

  return response.insertedId;
}