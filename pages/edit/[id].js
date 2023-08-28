import Interests from '../../enums.js';

export default function EditFriend() {
  return (
    <div >
      <form 
        style={{
          display:"flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        action="/api/friends"
        method="post">
        <label htmlFor="roll">First Name</label>
        <input type="text" id="firstName" name="firstName" required/>

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="job">Job</label>
        <input type="text" id="job" name="job" required />

        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" required />

        <label htmlFor="birthday">Birthday</label>
        <input type="date" id="birthday" name="birthday" required />

        <label htmlFor="interests">Interests</label>
        <select select="date" id="interests" name="interests" multiple required>

        {Object.values(Interests).map((interest) => {
          return (
            <option value={interest}>{interest}</option>
          )
        })}
        </select>

        <button type="submit">Submit</button>
      </form>
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