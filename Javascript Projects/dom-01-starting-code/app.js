/*Several ways of selecting elements*/
const h1 = document.getElementById("main-title");
const button = document.querySelector(".button");
const ul = document.querySelector("ul");
const li = document.querySelector("li:last-of-type")


let pageChange = false;

console.dir(ul);

//ul children elements will be put in a list 
console.log(ul.children);

//grabs all its children including text nodes
console.log(ul.childNodes);

//parentNode and parentElement are pretty much the same. They grab the direct parent of the node
console.log(li.parentElement);

//just like queryselector but only grabs ancestors
ul.closest

//GRABS ALL THESE ELEMENTS AND PUT THEM IN A LIST
const list = document.querySelectorAll("li");

console.log(list);
//SHOWS WHAT YOU CAN DO WITH ELEMENTS AND MANIPULATE DOM
const addStyle = (pagerColor,listColor,headColor) =>{
    if(!pageChange){
        h1.textContent = "Wazam";
        h1.style.color = headColor;
        h1.style.fontFamily = "Brush Script MT, Brush Script Std, cursive";
        h1.style.fontSize = "4em";
        for (const iterator of list) {
            iterator.style.color = listColor;
        }
        document.body.style.backgroundColor = pagerColor;
       
        button.textContent = "REVERT";
        pageChange = true;
    }
    else{
        button.textContent = "CHANGE IT";
        h1.textContent = "Dive into the DOM!";
        h1.style.color = "black";
        h1.style.fontSize = "2em";
        h1.style.fontFamily = "";
        for (const iterator of list) {
            iterator.style.color = "black";
        }
        document.body.style.backgroundColor = "white";
        pageChange = false;
    }
  
} 

button.addEventListener("click",addStyle.bind(this,"orange","white","blue"));