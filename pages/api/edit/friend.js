import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
  if (req.method === "POST") {
    const updatedFriend = req.body;
    const client = await clientPromise;
    const db = client.db("relay");

    console.log(typeof(updatedFriend._id))

    const filter = { _id: new ObjectId(updatedFriend._id) }//{_id: new ObjectId(updatedFriend._id)}

    const options = { upsert: true }

    const updateDoc = {
      $set: {
        firstName: updatedFriend.firstName,
        lastName: updatedFriend.lastName,
        job: updatedFriend.job,
        location: updatedFriend.location,
        birthday: updatedFriend.birthday,
        interests: updatedFriend.interests,
      },
    };


    const response = await db
      .collection("friends")
      .updateOne(
        filter, 
        updateDoc,
        function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          console.log(res);
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