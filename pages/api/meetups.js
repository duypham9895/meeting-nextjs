// api/meetups

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      const client = await MongoClient.connect(
        "mongodb+srv://anhduy:GJd6EZym3ivEQMLK@cluster0.mbbcz.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const data = await meetupsCollection.find().toArray();
      client.close();

      const transformedData = data.map(
        ({ _id, title, image, address, description }) => ({
          id: _id.toString(),
          title,
          image,
          address,
          description,
        })
      );
      console.log({ transformedData });

      res.status(200).json({ meetups: transformedData });
    }

    default:
      return null;
  }
};

export default handler;
