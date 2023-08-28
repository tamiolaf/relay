import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("relay");

    const friends = await db
    .collection("friends")
    .find({})
    .toArray();

    res.json(friends);
  } else if (req.method === "POST") {
    const insertedId = await addFriend(req.body)
    res.status(200).json(insertedId)
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