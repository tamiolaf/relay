import { getFriend } from "../api/friend/[id]";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Interests from '../../enums.js';

export default function Friend({ friend }) {
  useEffect(() => {
    if (friend) {
      setFirstName(friend.firstName)
      setLastName(friend.lastName)
      setJob(friend.job)
      setLocation(friend.location)
      setBirthday(friend.birthday)
      setInterests(friend.interests)
    }
  }, [friend])
  const [isEditMode, setIsEditMode] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');
  const [interests, setInterests] = useState([]);

  //useEffect(() => {

  //},[isEditMode])

  const editFriendView = (friend) => {
    return (
      <div>
        <div>
          <form 
            style={{
              display:"flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
            action="/api/edit/friend"
            method="post">
            <label htmlFor="firstName">First Name</label>
            <input value={firstName} onChange={e => {
              setFirstName(e.target.value)
            }} type="text" id="firstName" name="firstName" required/>

            <label htmlFor="lastName">Last Name</label>
            <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" id="lastName" name="lastName" required />

            <label htmlFor="job">Job</label>
            <input value={job} onChange={e => setJob(e.target.value)} type="text" id="job" name="job" required />

            <label htmlFor="location">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" name="location" required />

            <label htmlFor="birthday">Birthday</label>
            <input value={birthday} onChange={e => setBirthday(e.target.value)} type="date" id="birthday" name="birthday" required />

            <label htmlFor="interests">Interests</label>
            <select value={interests} onChange={e => {
              const interest = e.target.value;
              const tempInterests = interests ? [...interests] : [];

              if (tempInterests.includes(interest)) {
                const interestIndex = interests.indexOf(interest) //remove it
              
                console.log(tempInterests.splice(interestIndex, 1));
                setInterests(tempInterests);
              } else {
                interests ? setInterests([...interests, interest]) : setInterests([interest]);
              }
            }} select="date" id="interests" name="interests" multiple required>
              {Object.values(Interests).map((interest) => {
                return (
                  <option key={interest} value={interest}>{interest}</option>
                )
              })}
            </select>

            <label htmlFor="id">Id</label>
            <input id="id" value={friend._id} name="_id" disabled/>

            <button type="submit">Save</button>
          </form>
        </div>
        <button onClick={e => setIsEditMode(false)}>
          Cancel
        </button>
      </div>
    )
  }

  const displayFriendView = (friend) => {
    return (
      <div>
        <h1>Single Item (friend) Page</h1>
        {friend ? (
          <div>
            <div>
              <h2>{friend.firstName} {friend.lastName}</h2>
              <h3>{friend.location}</h3>
              <p>{friend.job}</p>
              <p>{friend.interests ? friend.interests.join(', ') : "no interests listed"}</p>
            </div>

            <button onClick={e => setIsEditMode(true)}> {/*href={"/edit/" + friend._id}>*/}
              Edit
            </button>
          </div>
        ): 
       (<div></div>)}
      </div>
    )
  }
  return (
    <div>
       {isEditMode ? editFriendView(friend) : displayFriendView(friend)}
    </div>
  )
}

export async function getStaticProps(context) {
  const params = context.params;

  try {
      const friend = await getFriend(params.id)
      console.log(friend)
      return {
          props: { friend: JSON.parse(JSON.stringify(friend)) },
      };
  } catch (e) {
      console.error(e);
      return {props: {friend: {}}}
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'next',
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  }
}