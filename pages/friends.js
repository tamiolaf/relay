import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import Interests from '../enums.js';
import { useEffect, useState } from "react";

export default function Friends({ friends }) {
    const [selectedInterest, setSelectedInterest] = useState("");
    const [filteredFriends, setFilteredFriends] = useState(friends);

    useEffect(() => {
      console.log(selectedInterest)
      
      if (friends) {
        setFilteredFriends(friends.filter((friend) => {
          if(friend.interests) {
            console.log(friend.interests)
            console.log(friend.interests.includes(selectedInterest));
            return friend.interests.includes(selectedInterest);
          }
            
          }, () => console.log(filteredFriends))
        )
        
      }
    }, [selectedInterest])
    return (
        <div>
            <h1>Friends List</h1>
            <p>
                <small>(According to me)</small>
            </p>
            <select select="date" id="interests" name="interests" onChange={e => setSelectedInterest(e.target.value)} >
              {Object.values(Interests).map((interest) => {
                return (
                  <option
                    key={interest} 
                    value={interest}>
                      {interest}
                  </option>
                )
              })}
            </select>
            <ul>
              {filteredFriends.map((friend) => (
                <li key={friend._id}>
                  <h2>
                    <Link href={"/friend/" + friend._id}>
                      {friend.firstName} {friend.lastName}
                    </Link>
                  </h2>
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