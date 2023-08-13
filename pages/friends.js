import clientPromise from "../lib/mongodb";

export default function Friends({ friends }) {
    return (
        <div>
            <h1>Friends List</h1>
            <p>
                <small>(According to me)</small>
            </p>
            <ul>
              {friends.map((friend) => (
                <li>
                  <h2>{friend.firstName} {friend.lastName}</h2>
                  <h3>{friend.location}</h3>
                  <p>{friend.job}</p>
                </li>
              ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("relay");

    const friends = await db
      .collection("friends")
      .find({})
      .toArray();

    return {
      props: { friends: JSON.parse(JSON.stringify(friends)) },
    };
  } catch (e) {
    console.error(e);
  }
}