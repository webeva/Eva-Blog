function getdata(){
    
    firebase.database().ref('blogs/').limitToFirst(9).once('value').then(function(snapshot){
        var posts = document.getElementById("blogs")
        posts.innerHTML = "";
        //Get data 
        var data = snapshot.val()
        
        for(let[key,value] of Object.entries(data)){
           
            posts.innerHTML += `
            <div class="blog-box ${value.category.toUpperCase()}">
            <img src="${value.image}" alt="Blog Image" class="blog-img">
            <h2 class="category">${value.category}</h2>
            <a href="post-page.html?id=${key}" class="blog-title">${value.title}</a>
            <span class="blog-date">${value.time}</span>
            <p class="blog-description">${value.des}</p>
            <!--Profile-->
            <div class="profile">
                <img src="img/favicon.ico" alt="Profile Image" class="profile-img">
                <span class="profile-name">${value.name}</span>
            </div>
            `
        }
    })
}
window.onload=function(){
    this.getdata();
}