import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async (req, res) => {
  const {id} = req.query
 
  const friend = await getFriend(id);

  if (!friend) {
    res.status(404).json("Friend not found :/")
  }
  res.status(200).json({ friend })
}

export const getFriend = async(id) => {
  const client = await clientPromise;
  const db = client.db("relay");

  const friend = await db
    .collection("friends")
    .findOne({_id: new ObjectId(id)})

  return friend;
}