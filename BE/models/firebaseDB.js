import { set, ref, child, get } from '@firebase/database';
import { db } from './firebase.js';

function writeNftData (tokenId, name, imageUrl, description) {
  set(ref(db, 'nfts/' + tokenId), {
    tokenId: tokenId,
    name: name,
    imageUrl: imageUrl,
    description: description
  });
}

function readNftData (tokenId) {
  const dbRef = ref(db);
  get(child(dbRef, `nfts/${tokenId}`)).then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val());
    } else {
      console.log("No data");
    }
  }).catch((err) => {
    console.error(err);
  });
}

export { writeNftData, readNftData };