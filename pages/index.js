import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

// export const getServerSideProps = async ({ req, res }) => {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

const fetchMeetups = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://anhduy:GJd6EZym3ivEQMLK@cluster0.mbbcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return meetups.map(({ _id, title, image, address, description }) => ({
    id: _id.toString(),
    title,
    image,
    address,
    description,
  }));
};

export const getStaticProps = async () => {
  const meetups = await fetchMeetups();

  return {
    props: {
      meetups,
    },
    revalidate: 3600,
  };
};

export default HomePage;
