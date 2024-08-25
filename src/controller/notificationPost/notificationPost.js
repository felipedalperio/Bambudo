import firebase from '../../config/firebaseconfig'

const getMessageNotification = async (type, userRedux, post) =>{
    if(type == 1){ //Comentou
        return userRedux.name + " comentou em sua postagem '" + post.title + "'"
    }else {
      return userRedux.name + " curtiu sua postagem '" + post.title + "'"
    }
  }

export default async function notification(type, userRedux, post){
    try {

      if(userRedux.id == post.idUser){ 
           return;
      }

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
      // Aguarde o resultado da função getMessageNotification
      let message = await getMessageNotification(type, userRedux, post);
  
      let data = {
        idUser: userRedux.id,
        picture: userRedux.picture,
        name: userRedux.name,
        message: message,  // Agora, message contém a string retornada
        fSeen: false,
        date: date,
        type: type,
        idPost: post.id
      };
  
      const userDocRef = firebase.firestore().collection("notification").doc(post.idUser);
      const doc = await userDocRef.get();
  
      if (doc.exists) {
        // Verifique se a notificação já existe
        const notificationList = doc.data().notificationList || [];
        const notificationExists = notificationList.some(
          (notification) =>
            notification.message === data.message &&
            notification.date === data.date &&
            notification.idUser === data.idUser &&
            notification.type === data.type
        );
  
        if (!notificationExists) { // Notificação já existente, não será salva novamente.
          // Se a notificação não existir, adicione-a
          await userDocRef.update({
            notificationList: firebase.firestore.FieldValue.arrayUnion(data),
            newNotification: true
          });
        } 
      } else {
        // Crie um novo documento e a coleção se necessário
        await userDocRef.set({
          idUser: post.idUser,
          notificationList: [data],  // Inicia o array com o objeto data
          newNotification: true
        });
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar a notificação: ", error);
    }
  };
