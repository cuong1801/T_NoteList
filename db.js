// enable offline data
var storageRef = firebase.storage().ref();
var temp2;


db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });
// real-time listener
db.collection('notelist').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if(change.type === 'added'){
          $("#name_notes").append(
            
            '<div data-toggle="modal" data-target="#'+change.doc.data().name.replace(/\s+/g, '')+'" class="col-xs-12 col-sm-6 col-md-6 col-lg-4" style="cursor: pointer;"><div  class="card border-info mb-3" style="max-width: 30rem;"><div class="card-header"><h6 class="card-title"></h6></div><div class="card-body text-center"><p class="card-text" id="lblName'+change.doc.data().name.replace(/\s+/g, '')+'">'+change.doc.data().name+'</p> </div> <div class="card-footer text-center"> </div></div></div><div class="modal" id="'+change.doc.data().name.replace(/\s+/g, '')+'"><div class="modal-dialog modal-lg"><div class="modal-content"><!-- Modal Header --><div class="modal-header"><h4 class="modal-title">'+change.doc.data().name+'</h4><div><small>'+change.doc.data().location+'</small><br><small>'+change.doc.data().location+'</small></div> </div><!-- Modal body --><div class="modal-body"><pre>'+change.doc.data().content+'</pre><br><br><div><img id="imgNote'+change.doc.data().name+'" style="width: 60% ; height: 100%; margin-left: 25%"></div><br><!-- Modal footer --><div class="modal-footer"><button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info">Sửa</button><button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info" data-toggle="modal" onclick = "deleteNote(\''+change.doc.data().name.replace(/\s+/g, '')+'\')">Xóa</button>'
            +'<button type="button" style="width: 70px;height: 50px;" class="btn btn-outline-info" data-dismiss="modal">Thoát</button></div></div></div></div>'
            +'<div class="modal fade" id="XoaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
            +'<div class="modal-dialog" role="document">'
            +'<div class="modal-content">'
            +'<div class="modal-header">'
            +'<h5 class="modal-title" id="exampleModalLabel">Delete</h5>'
            +'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
            +'<span class="material-icons" aria-hidden="true">help_outline</span>'
            +'</button>'
            +'</div>'
            +'<div class="modal-body"> <i class="material-icons"  >delete_forever</i>'
            +'Do you really  want to delete?'
            +'</div>'
            +'<div class="modal-footer">'
            +'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
            +'<button type="button" class="btn btn-primary" >Delete</button>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            );
            var imgNote = document.getElementById("imgNote"+change.doc.data().name);
            storageRef.child('NoteImage/'+change.doc.data().image+'').getDownloadURL().then(function(url) {
              // `url` is the download URL for 'images/stars.jpg'
            
              // Or inserted into an <img> element:
              imgNote.src = url;
            }).catch(function(error) {
              // Handle any errors
            });
      }
      if(change.type === 'removed'){
      }
    });
  });

  // db.collection('category').onSnapshot(snapshot => {
  //   snapshot.docChanges().forEach(change => {
  //     if(change.type === 'added'){
  //       $("#categoryList").append('<li><table><tr><td><a href="#">'+change.doc.data().category+'</a></td><td></td></tr></table></li>');
  //     }
  //   });
  // });
var NewNotes_name = document.getElementById("NewNotes_name");
var NewNotes_location = document.getElementById("NewNotes_location");
var NewNotes_content = document.getElementById("NewNotes_content");
var category_Name = document.getElementById("category_Name"); 
var ListNotes_category = document.getElementById("ListNotes_category")
function addnewcategory (){
  var category_Name_text = category_Name.value;
  var category_Name_text_value = category_Name_text.trim();
  if (category_Name_text_value.length === 0 ||category_Name_text_value.length>15) {
      alert('Comments are required to continue!');
      return false;
  } 
  else {
  db.collection("category").doc(document.getElementById("category_Name").value).set({
    category: document.getElementById("category_Name").value
    
  })
  alert("Add to category");
  }
}
function deleteCategory(){
  var category_Name_text = category_Name.value;
  var category_Name_text_value = category_Name_text.trim();
 
  if (category_Name_text_value.length === 0 ||category_Name_text_value.length>15) {
    alert('Comments are required to continue!');

  } 
  
  // var result = confirm("Do you want to continue?");
  // if(result)  {
    // alert("OK Next lesson!");
    db.collection("category").doc(document.getElementById("category_Name").value).delete();
    location.reload();  
  // } else {
      // alert("Bye!");
  // }
}

function deleteCategoryInSelect(){
  // var result = confirm("Do you want to continue?");
              // if(result)  {
                  // alert("OK Next lesson!");
                  db.collection("category").doc(document.getElementById("ListNotes_category").value).delete();
                  location.reload();
              // } else {
                  // alert("Bye!");
              // }
          
}

function writeNotesData(){
  temp2 = temp;
  var NewNotes_name_text = NewNotes_name.value;
  var NewNotes_location_text = NewNotes_location.value;
  var NewNotes_name_text_value = NewNotes_name_text.trim();
  var NewNotes_location_text_value = NewNotes_location_text.trim();
 
  if (NewNotes_name_text_value.length === 0 ||NewNotes_name_text_value.length>20||NewNotes_location_text_value.length>20) {
    alert('Comments are required to continue!');
  } 
  else {
    db.collection('notelist').doc(NewNotes_name.value).set({
      name: document.getElementById("NewNotes_name").value,
      location: document.getElementById("NewNotes_location").value,
      content:document.getElementById("NewNotes_content").value,
      category:document.getElementById("NewNotes_category").value,
      image:temp
    })
  }
}
//delete note by select list
function deleteNote(name){
  // var result = confirm("Do you want to continue?");

  // if(result)  {
      // alert("OK Next lesson!");
      db.collection('notelist').doc(document.getElementById("lblName"+name).innerText).delete();
      location.reload();
  // } else {
      // alert("Bye!");
      
  // }

  
}
 // show danh mục vào trong phần addnote
// db.collection('category').onSnapshot(snapshot => {
//   snapshot.docChanges().forEach(change => {
    
//       $("#NewNotes_category").append('<option selected>'+change.doc.data().category+'</option>');
    
//   });
// });

// function writeNotesData(){
//   db.collection('notelist').doc(NewNotes_name.value).set({
//     name: document.getElementById("NewNotes_name").value,
//     location: document.getElementById("NewNotes_location").value,
//     content:document.getElementById("NewNotes_content").value,
//     // uploadfile:document.getElementById("").value,
//     category:document.getElementById("NewNotes_category").value
//   })
// }
db.collection('category').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    
      $("#NewNotes_category").append('<option>'+change.doc.data().category+'</option>');
    
  });
});


