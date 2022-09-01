const urlSplit = new URLSearchParams(window.location.search)
let param = urlSplit.get("id")
function getData(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
        var data = snapshot.val()
        const value =Object.values(data)[0]
       
        document.getElementById("headertitle").innerText = value.title
        document.getElementById("post-image").src = value.image
        document.getElementById("sub-heading").innerText = value.des
        document.getElementById("blog-text").innerText = value.text
        
    })
}


addEventListener('load', () => {
    getData()
});

