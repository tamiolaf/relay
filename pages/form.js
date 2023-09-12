import { Interests } from '../enums.js';

export default function Form() {
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
        <label htmlFor="firstName">First Name</label>
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
