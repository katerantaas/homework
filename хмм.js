let form = document.getElementById("form");
let input = document.getElementById("input");

let posts = document.getElementById("posts");
let textInput1 = document.getElementById("textInput1");
let textInput2 = document.getElementById("textInput2");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");



form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");

  acceptData();
});

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput1.value,
    contact: textInput2.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createPost();
};

let createPost = () => {
  posts.innerHTML = "";
  data.map((x, y) => {
    return (posts.innerHTML += `
    <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="fw-bold">${x.contact}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>

        <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
  `);
  });
  resetForm();
};


  let deletePost = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

  };

  let editPost = (e) => {
    let selectedPost = e.parentElement.parentElement;

    textInput1.value = selectedPost.children[0].innerHTML;
    textInput2.value = selectedPost.children[1].innerHTML;
    dateInput.value = selectedPost.children[2].innerHTML;
    textarea.value = selectedPost.children[3].innerHTML;

    deletePost(e);
  };


let resetForm = () => {
  textInput1.value = "";
  textInput2.value = "";
  dateInput.value = "";
  textarea.value = "";
};




  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createPost();
  })();
