// api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { method, body } = req;
  switch (method) {
    case "POST": {
      const { title, image, address, description } = body;
      const client = await MongoClient.connect(
        "mongodb+srv://anhduy:GJd6EZym3ivEQMLK@cluster0.mbbcz.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne({
        title,
        image,
        address,
        description,
      });
      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    }

    default:
      return null;
  }
};

export default handler;
