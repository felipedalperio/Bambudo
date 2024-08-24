import firebase from '../../config/firebaseconfig'


export default async function likePost(item, id, value) {
  try {
    if (value) {
      await firebase.firestore().collection("posts").doc(item.id).update({
        likes: item.likes + 1,
        whoLiked: firebase.firestore.FieldValue.arrayUnion(id)
      });
      await firebase.firestore().collection("users").doc(id).update({
        postsLiked: firebase.firestore.FieldValue.arrayUnion(item.id)
      });
    } else {
      await firebase.firestore().collection("posts").doc(item.id).update({
        likes: item.likes === 0 ? 0 : item.likes - 1,
        whoLiked: firebase.firestore.FieldValue.arrayRemove(id)
      });
      await firebase.firestore().collection("users").doc(id).update({
        postsLiked: firebase.firestore.FieldValue.arrayRemove(item.id)
      });
    }
  } catch (err) {
    console.error("Erro na função likePost:", err);
  }
}

