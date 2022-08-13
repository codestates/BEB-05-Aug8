import { writeNftData, readAllNftData } from '../models/Firestore.js';

const controller = {
  metadata: {
    get: async (req, res) => {
      try{
        const result = await readAllNftData();
        return res.status(200).send(result);
      } catch (e) {
        console.error(e);
        return res.status(500).send('Server ERROR!');
      }
    },
    post: async (req, res) => {
      const { tokenId, name, imageUrl, description, owner } = req.body;
      try{
        await writeNftData(tokenId, name, imageUrl, description, owner);
        return res.status(200).send("🌊Write DONE");
      } catch (e) {
        console.error(e);
        return res.status(500).send("⚠️Server ERROR!");
      }
    }
  },
  // TODO!
  minting: {
    post: async (req, res) => {
      
    },
  }
};

export { controller };
