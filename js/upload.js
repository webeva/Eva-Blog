

function upload(){

    //Get all the post info
    var image = document.getElementById("file-upload").files[0]; /* Image */
    var imageName = image.name
    var post = document.getElementById("article").value; /* Blog Text */
    var short = document.getElementById("short").value /* Short Description */
    var title = document.getElementById("title").value /* Title */
   
    var category = document.getElementById("category").value /* Category */
    var header = document.getElementById("header").value /* Header */
    var name = document.getElementById("name").value; /* Name */
   
    
        //Make sure no input's are empty
        if(post.length > 0 && header.length > 0 && name.length > 0 && short.length > 0 && title.length > 0 && category.length > 0 && imageName){
        
            var storageRef = firebase.storage().ref('images/' + imageName);
            //Upload image
            var uploadTask = storageRef.put(image);
            //Listen to the state of image uploading
            uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log("Upload is " + progress + " done");
            }, function(error){
                console.log(error)
            }, function(){
                //Handle successfull upload here...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    //Gat image url to upload to database
                    var date = new Date();
	                var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
                    firebase.database().ref("blogs/").push().set({
                        text: post,
                        des: short, 
                        title: title,
                        header: header,
                        name: name,
                        time: current_date,
                        category: category,
                        image: downloadURL
                    }, function(error){
                        if(error){
                            alert("An error occured while uploading")
                        }else{
                            alert("Success")
                            document.getElementById("article").value = ""
                            document.getElementById("short").value = ""
                            document.getElementById("title").value = ""
                            document.getElementById("category").value = ""
                            document.getElementById("header").value = ""
                            document.getElementById("file-upload").files[0] = ""
                        }
                    })
                })
            })
            
        }else{
            alert("Value cannot be empty")
        }
    
   
}
