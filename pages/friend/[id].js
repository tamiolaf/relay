import { getFriend } from "../api/friend/[id]";

export default function Friend({ friend }) {
  return (
    <div>
       <h1>Single Item (friend) Page</h1>
       {friend ? (
        <div>
          <h2>{friend.firstName} {friend.lastName}</h2>
          <h3>{friend.location}</h3>
          <p>{friend.job}</p>
          <p>{friend.interests ? friend.interests.join(',') : "no interests listed"}</p>
        </div>
       ): 
       (<div></div>)}

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