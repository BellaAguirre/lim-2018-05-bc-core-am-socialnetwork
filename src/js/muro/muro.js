const textPost = document.getElementById('postText');
const privacityPost = document.getElementById('selectPrivacy'); 
const btnEnviar = document.getElementById('publicButton');

//funcion para dirigir al inicio
const redirectionLogin = () => {
    window.location.href = "index.html";
}
//funcion para remplazar clases
const addClass = () => {
  postcontainer.innerHTML = '';
  document.getElementById('post').classList.replace('inherit', 'none');
  document.getElementById('postcontainer').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('none', 'inherit'); 
  
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUser = firebase.auth().currentUser;
    //enviando informacion de usuario logueado a database
    firebase.database().ref('users/' + currentUser.uid).set({
      username: currentUser.displayName,
      email: currentUser.email,
      photoURL: (currentUser.photoURL !== null) ? currentUser.photoURL : 'https://image.flaticon.com/icons/svg/1034/1034680.svg',
    });
    //funcion para enviar post a firebase
    const sendPost = () => {
      postcontainer.innerHTML = '';  
      if(textPost.value === ''){
        alert('Ingrese un post');
        
      } else{
        sendPostFirebase(addClass, currentUser,textPost,privacityPost);
      } 
    }
  
    //Evento para postear
    btnEnviar.addEventListener('click',  () =>{
      post.classList.replace('inherit', 'none');
      sendPost();
     if( typeof $("#channelsMenu").hasClass("none")){
      postcontainer.classList.remove('none');
     } 
     backIcon.classList.replace('inherit', 'none');
     titlePublic.classList.replace('inherit', 'none');
     postImage.classList.replace('inherit', 'none');
     privacityContainer.classList.replace('inherit', 'none'); 
     postText.value = '';
    });
    
    inspirationIcon.src = "img/dust-on.png";
    inspirationIconDesktop.src = "img/dust-on.png";
    
    /* userPostcontainer.classList.add('none'); */
    document.getElementById('posting').addEventListener('click', () =>{
    document.getElementById('post').classList.replace('none', 'inherit');
    document.getElementById('postcontainer').classList.add('none');
    document.getElementById('posting').classList.replace('inherit', 'none');
    backIcon.classList.replace('none', 'inherit');
    titlePublic.classList.replace('none', 'inherit');
    postImage.classList.replace('none', 'inherit');
    privacityContainer.classList.replace('none', 'inherit');
    profilecontainer.classList.replace('inherit', 'none');
  });
  
    showPost(addClass);
    showProfile(currentUser);
  } else {
  //NO ESTAMOS LOGUEADOS
  //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
  }
}); 
//Cerrando sesion
document.getElementById('logout').addEventListener('click', () =>{
  logoutwall(redirectionLogin);
});



document.getElementById('backIcon').addEventListener('click',  () =>{
  document.getElementById('postcontainer').classList.remove('none');
  document.getElementById('post').classList.replace('inherit', 'none');
  document.getElementById('posting').classList.replace('none', 'inherit');   
});

document.getElementById('backButton').addEventListener('click', () =>{

  document.getElementById('postcontainer').classList.remove('none');
  document.getElementById('posting').classList.replace('none', 'inherit');   

  document.getElementById('logoPrincipal').classList.replace('none', 'inherit');
  document.getElementById('search').classList.remove('none');

  document.getElementById('settingsText').classList.replace('inherit', 'none');
  document.getElementById('settingsOptions').classList.replace('inherit', 'none');
});


document.getElementById('settingsIcon').addEventListener('click', () =>{
  document.getElementById('logoPrincipal').classList.replace('inherit', 'none');
  document.getElementById('search').classList.add( 'none');
  document.getElementById('settingsIcon').classList.add('left');
  document.getElementById('settingsText').classList.replace('none', 'inherit');
  document.getElementById('postcontainer').classList.add('none');
  document.getElementById('settingsOptions').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('inherit', 'none'); 
  containerInfo.classList.add('none');
  userPostcontainer.classList.add('none');
  
});


document.getElementById("posting").addEventListener('mouseover', () =>{
  document.getElementById('posting').src = "img/pencil-color.png"; 
});

document.getElementById("posting").addEventListener('mouseout', () =>{
  document.getElementById('posting').src = "img/pencil.png"; 
});

postText.addEventListener('focus', () =>{
  backIcon.classList.replace('none', 'inherit');
    titlePublic.classList.replace('none', 'inherit');
    postImage.classList.replace('none', 'inherit');
    privacityContainer.classList.replace('none', 'inherit'); 
});

/* postText.addEventListener('focusout', () =>{
    backIcon.classList.replace('inherit', 'none');
    titlePublic.classList.replace('inherit', 'none');
    postImage.classList.replace('inherit', 'none');
    privacityContainer.classList.replace('inherit', 'none'); 
}); */



document.getElementById("profileIcon").addEventListener('click', () =>{
    profileIcon.src = "img/chef-on.png"; 
    postcontainer.classList.add('none');
    profilecontainer.classList.replace('none', 'inherit');
    containerInfo.classList.replace('none', 'inherit');
    userPostcontainer.classList.replace('none', 'inherit');
    postMenuContainer.classList.remove('none');
    post.classList.add('none');
    inspirationIcon.src = "img/dust.png";  
    settingsOptions.classList.replace('inherit', 'none');
    logoPrincipal.classList.replace('none', 'inherit');
    search.classList.remove('none');
    settingsText.classList.replace('inherit', 'none');

});

profileIconDesktop.addEventListener('click', () =>{
  profileIconDesktop.src = "img/chef-on.png"; 
  postcontainer.classList.add('none');
  profilecontainer.classList.replace('none', 'inherit');
  containerInfo.classList.replace('none', 'inherit');
  userPostcontainer.classList.replace('none', 'inherit');
  postMenuContainer.classList.remove('none');
  titlePostMenu.classList.remove('none');
  settingsOptions.classList.replace('inherit', 'none');
  inspirationIconDesktop.src = "img/dust.png"; 
});

document.getElementById("inspirationIcon").addEventListener('click', () =>{
  inspirationIcon.src = "img/dust-on.png";
  profileIcon.src = "img/chef.png"; 
  postcontainer.classList.remove('none');
  profilecontainer.classList.replace('inherit', 'none'); 
  userPostcontainer.classList.replace('inherit', 'none');
  post.classList.add('none');
  posting.classList.replace('none', 'inherit');
  settingsOptions.classList.replace('inherit', 'none');
  logoPrincipal.classList.replace('none', 'inherit');
  search.classList.remove('none');
  settingsText.classList.replace('inherit', 'none');
});

inspirationIconDesktop.addEventListener('click', () =>{
  inspirationIconDesktop.src = "img/dust-on.png";
  profileIconDesktop.src = "img/chef.png";
  postMenuContainer.classList.add('none'); 
  postcontainer.classList.remove('none');
  profilecontainer.classList.replace('inherit', 'none'); 
  userPostcontainer.classList.replace('inherit', 'none');
});


