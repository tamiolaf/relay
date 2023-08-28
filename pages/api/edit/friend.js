import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
  if (req.method === "POST") {
    const updatedFriend = req.body;
    const client = await clientPromise;
    const db = client.db("relay");

    console.log(updatedFriend)

    const response = await db
      .collection("friends")
      .updateOne({_id: ObjectId(updatedFriend._id)}, 
        {
          $set: {...updatedFriend}
        }, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        })
    
      res.status(200).json(`${updatedFriend.firstName} ${updatedFriend.lastName} updated`)

    }
  } catch (e) {
    console.error(e);
  }
};

export const addFriend = async(friend) => {
  const client = await clientPromise;

  const db = client.db("relay");

  const response = await db
    .collection("friends")
    .insertOne(friend)

  return response.insertedId;
}