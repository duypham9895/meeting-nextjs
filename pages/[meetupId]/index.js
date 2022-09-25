import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = ({ meetup: { image, title, address, description } }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
};

const fetchMeetupIds = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://anhduy:GJd6EZym3ivEQMLK@cluster0.mbbcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return meetupIds;
};

export const getStaticPaths = async () => {
  const meetupIds = await fetchMeetupIds();

  return {
    fallback: "blocking",
    paths: meetupIds.map(({ _id }) => ({
      params: { meetupId: _id.toString() },
    })),
  };
};

const fetchMeetupById = async (id) => {
  const client = await MongoClient.connect(
    "mongodb+srv://anhduy:GJd6EZym3ivEQMLK@cluster0.mbbcz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const { title, image, address, description } =
    await meetupsCollection.findOne({ _id: new ObjectId(id) });
  client.close();

  return {
    id,
    title,
    image,
    address,
    description,
  };
};

export const getStaticProps = async ({ params: { meetupId } }) => {
  const fetchedMeetup = await fetchMeetupById(meetupId);

  return {
    props: {
      meetup: fetchedMeetup,
    },
  };
};

export default MeetupDetails;
