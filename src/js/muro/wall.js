const create = 'Publicar';
const update = 'Guardar';
let modo = create;
let editPost = {
  idPost: '',
  post: '',
  privacyEdit: '',
  like: '',
}
//Cerrando sesion
window.logoutwall = (callback) => {
  firebase.auth().signOut().then(() => {
    callback()
  }).catch((error) => {
  });

}

window.showPostHtml = (userWithPost) => {
  const userId = firebase.auth().currentUser.uid;
  postcontainer.innerHTML = '';
  for (const i in userWithPost) {
    if(userWithPost[i].privacy === 'Publico' && userId === userWithPost[i].uid) {
      postcontainer.innerHTML += ` 
      <div class="col-11 postwall" id="${userWithPost[i].id}">
        <div id="headerpost-container">
          <input type="button" class="col-2" hidden/>
          <img src="${userWithPost[i].photoUser}" class="initial">
          <div id="infoPost" class="col-8">
            <h1 class="creatorName">${userWithPost[i].name}</h1>
            <p id="datePost" class="col-8">${userWithPost[i].timeData}</p>
            <img src="img/icon.png" alt="private icon" id="privateIcon">
          </div>
          <div id="dropdown-container" class="show">
            <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="img/more.png" alt="more icon" id="moreIcon">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownPost">
              <a class="dropdown-item dropdown-text" href="#" onclick="postEdit('${userWithPost[i].id}','${userWithPost[i].post}','${userWithPost[i].privacy}','${userWithPost[i].likes}')">Editar</a>
              <a class="dropdown-item dropdown-text" href="#" onclick="postDelete('${userWithPost[i].id}')">Eliminar</a>
              <a class="dropdown-item dropdown-text" href="#">Guardar</a>
              <a class="dropdown-item dropdown-text" href="#">Cancelar</a>
          </div>
        </div>  
        <section id="postSection">
          <p id="postTextSection" class="col-12">${userWithPost[i].post}</p>
          <p id="postImageSection" class="col-12">Foto</p>      
        </section> 
        <div id="like-container">
          <input type="button" onclick="clickPost('${userWithPost[i].id}','${userWithPost[i].likes}','${userWithPost[i].uid}')" class="likeIconImg imgDisLike" id="${'li'+userWithPost[i].id}"/>
          <p id="likeText"> ${userWithPost[i].likes} Me gusta</p>
        </div> 
      </div> 
      `;
    } else if(userWithPost[i].privacy === 'Publico') {
      postcontainer.innerHTML += ` 
      <div class="col-11 postwall" id="${userWithPost[i].id}">
        <div id="headerpost-container">
          <input type="button" class="col-2" hidden/>
          <img src="${userWithPost[i].photoUser}" class="initial">
          <div id="infoPost" class="col-8">
            <h1 class="creatorName">${userWithPost[i].name}</h1>
            <p id="datePost" class="col-8">${userWithPost[i].timeData}</p>
            <img src="img/icon.png" alt="private icon" id="privateIcon">
          </div>
          <div id="dropdown-container" class="show">
            <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="img/more.png" alt="more icon" id="moreIcon">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownPost">
              <a class="dropdown-item dropdown-text" href="#">Guardar</a>
              <a class="dropdown-item dropdown-text" href="#">Cancelar</a>
          </div>
        </div>  
        <section id="postSection">
          <p id="postTextSection" class="col-12">${userWithPost[i].post}</p>
          <p id="postImageSection" class="col-12">Foto</p>      
        </section> 
        <div id="like-container">
          <input type="button" onclick="clickPost('${userWithPost[i].id}','${userWithPost[i].likes}','${userWithPost[i].uid}')" class="likeIconImg imgDisLike" id="${'li'+userWithPost[i].id}"/>
          <p id="likeText"> ${userWithPost[i].likes} Me gusta</p>
        </div> 
      </div> 
      `;
    }
  }
}
window.postDelete = (idpost) => {
  const userId = firebase.auth().currentUser.uid;
  firebase.database().ref().child('/user-posts/' + userId + '/' + idpost).remove();
  firebase.database().ref().child('posts/' + idpost).remove();
}
window.postEdit = (idPost, post, privacyEdit, like) => {
  document.getElementById('post').classList.replace('none', 'inherit');
  document.getElementById('postcontainer').classList.replace('inherit', 'none');
  document.getElementById('posting').classList.replace('inherit', 'none');
  btnEnviar.value = update;
  modo = update;
  editPost.idPost = idPost;
  editPost.post = post;
  editPost.privacyEdit = privacyEdit;
  editPost.like = like;
  postEditNow(post,privacyEdit)
}

window.postEditNow = (post, privacy) => {
  textPost.value = post;
  privacityPost.value = privacy;
}

window.showPost  = (callback) =>{
  callback();
  firebase.database().ref().child('users').on('value', snap => {
    const datos = snap.val();
    firebase.database().ref().child('posts').on('value', post => {
      const arrayPostUser = [];
      const posts = post.val();
      for (const i in posts) {
        for (const key in datos) {
          if(posts[i].idUser === key){
            let date =  posts[i].timeData;
            console.log(date);
            
            // let d = Date.parse(date);
            // console.log(Date.parse(date));
            var newd = new Date(date)
            console.log(newd.toLocaleString());
            const stats = {
              id: i,
              uid: posts[i].idUser,
              name: datos[key].username,
              photoUser: datos[key].photoURL, 
              post: posts[i].post,
              likes:posts[i].likes,
              timeData: newd.toLocaleString(),
              privacy: posts[i].privacy,
            }
            arrayPostUser.push(stats);
          }
        }
      }
      console.log(arrayPostUser);
      showPostHtml(arrayPostUser);
    });
  });
}

window.showProfile  = (currentUser) =>{
  userPostcontainer.innerHTML = '';
  profilecontainer.innerHTML = '';
  profilecontainer.innerHTML = `
    <div class="userInfo col-12">
      <input type="button" class="initial col-12" hidden/>
      <img src="${currentUser.photoURL}" class="initial" id="userButton">
      <h1 class="creatorName col-12" id="profileName">${currentUser.displayName}</h1>
      <table  class="col-7" id="tableInfo">
        <thead id="tablever">
          <tr>
            <th scope="col">Post</th>
            <th scope="col">Siguiendo</th>
            <th scope="col">Seguidores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-12" role="group"  id="menuProfile">
      <button type="button" class="dropdown-toggle col-6 menuButton" data-toggle="dropdown" >
         <img class="iconsProfile" id="inspirationIconProfile" src="img/dust-on.png" alt="inspiration icon">
          Inspiración
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="marketIconProfile" src="img/cart-on.png" alt="sell/buy icon"> Market</a>
        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="menuIconProfile" src="img/menu-on.png" alt="recepy icon"> Recetas</a>
        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="questionIconProfile" src="img/question-on.png" alt="doubts icon"> Dudas</a>
      </div>
      <button type="button" class="col-5 menuButton"> <img class="iconsProfile" src="img/star.png" alt="fav icon">Favoritos</button>
    </div>
    `;
  firebase.database().ref().child('user-posts/' + currentUser.uid).on('value', snap => {
    const datos = snap.val();
    userPostcontainer.innerHTML = '';
    for (const key in datos) {
      userPostcontainer.innerHTML += ` 
      <div class="col-11 postwall" id="${key}" >
        <div id="headerpost-container">
          <input type="button" class="initial" hidden/>
          <img src="${currentUser.photoURL}" class="initial">
          <div id="infoPost" class="col-8">
            <h1 class="creatorName">${currentUser.displayName}</h1>
            <p id="datePost" class="col-8">${datos[key].timeData}</p>
            <img src="img/icon.png" alt="private icon" id="privateIcon">
          </div>
          <div id="dropdown-container" class="show">
            <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="img/more.png" alt="more icon" id="moreIcon">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownPost">
              <a class="dropdown-item dropdown-text" href="#" onclick="postEdit('${key}','${datos[key].post}','${datos[key].privacy}','${datos[key].likes}')">Editar</a>
              <a class="dropdown-item dropdown-text" href="#" onclick="postDelete('${key}')">Eliminar</a>
              <a class="dropdown-item dropdown-text" href="#">Guardar</a>
              <a class="dropdown-item dropdown-text" href="#">Cancelar</a>
            </div>
          </div>  
        </div>
        <section id="postSection">
          <p id="postTextSection" class="col-12">${datos[key].post}</p>
          <p id="postImageSection" class="col-12">Foto</p>      
        </section> 
        <div id="like-container">
        <input type="button" onclick="clickPost('${key}','${datos[key].likes}','${datos[key].idUser}')" class="likeIconImg imgDisLike" id="${'li'+ key}"/>
        <p id="likeText"> ${datos[key].likes} Me gusta</p>
        </div> 
      </div> 
      `;
    }
  });
}
window.sendPostFirebase = (callback,currentUser,textPost,privacy) => {
  switch (modo) {
    case create:
      const userId = currentUser.uid;
      let postData = {
          idUser: userId,
          post: textPost.value,
          privacy: privacy.value,
          likes: 0,
          likeUser: {},
          type: 'receta',
          timeData: firebase.database.ServerValue.TIMESTAMP,
      };
      //para tener una nueva llave en la colección posts
      const newpostKey = firebase.database().ref(`/posts`).push().key;
      let updates = {};
      updates['/posts/' + newpostKey] = postData;
      updates['/user-posts/' + currentUser.uid + '/' + newpostKey] = postData;
      firebase.database().ref().update(updates);
      showPost(callback);
      showProfile(currentUser);
      break;
    case update:
      let postDataUpdate = {
        idUser: currentUser.uid,    
        post: textPost.value,
        privacy: privacityPost.value,
        likes: parseInt(editPost.like),
        type: 'receta',
        timeData: new Date(),
      };
      const updatesUser = {};
      const updatesPost = {};
      updatesUser['/user-posts/' + currentUser.uid + '/' + editPost.idPost] = postDataUpdate;
      updatesPost['/posts/' + editPost.idPost ] = postDataUpdate;
      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost); 
      btnEnviar.value = create;
      modo = create;
      showPost(callback);
      showProfile(currentUser);
    break;
  }
}

window.clickPost = (postId,likes,usid) => {
  const userId = firebase.auth().currentUser.uid;
const dbPost = firebase.database().ref('posts/' + postId);
const postUsers = firebase.database().ref('/user-posts/'+ usid + '/' + postId);
calculateLike(postUsers, userId);
calculateLike(dbPost, userId);
}

window.calculateLike = (dbRef, userId) => {
    dbRef.transaction((post) => {
    if (post) {
      if(!post.hasOwnProperty('likeUser')){
          post.likeUser = {}
          post.likeUser[userId] = {
            estado : true,
            img: 'imgLike',
          };
      } else {
        if(post.likes && post.likeUser[userId]  && post.likeUser[userId].estado) {
          post.likeUser[userId].estado = false;
          post.likeUser[userId].img = 'imgDeslike';
      } else {
        if (!post.likeUser[userId]) {
              post.likeUser[userId] = {
                estado : true,
                img: 'imgLike',
              };
            }
          
        post.likeUser[userId].estado = true;
        post.likeUser[userId].img = 'imgLike';
      } 
  }   
}
return post;
});
// updateLike(dbRef)
updateLike(dbRef)
}
window.updateLike = (dbRef) => {
  let count = 0;

  dbRef.on('value', snap => {
    const postEval = snap.val();
     const likepost = Object.values(postEval.likeUser);
       for (const key in likepost) {
         if (likepost[key].hasOwnProperty('estado')) {
           if(likepost[key].estado === true){
             count++;
           }
         }
       }
   })
   dbRef.update({
     likes: count,
     }); 
}