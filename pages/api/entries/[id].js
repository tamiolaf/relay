import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async (req, res) => {
  const {id} = req.query
 
  const entries = await getFriendEntries(id);

  if (!entries) {
    res.status(404).json("Entries not found :/")
  }
  res.status(200).json({ entries })
}

export const getFriendEntries = async(id) => {
  const client = await clientPromise;
  const db = client.db("relay");

  try {
    const entries = await db
    .collection("entries")
    .find({friendId: new ObjectId(id)})
    .toArray()

    return entries;
  }
  catch(err) {
    return err
  }
}