/*Several ways of selecting elements*/
//const h1 = document.getElementById('main-title');

const button = document.querySelectorAll('.button');
const ul = document.querySelector('ul');
const li = document.querySelector('li:last-of-type');
const container = document.querySelector('.container');
const list = document.querySelector('li');
const listElement = document.querySelector('div').innerHTML;
const nav = document.querySelector('nav')
let pageChange = false;
let revert = false;
let addedList = true;

console.dir(ul);

//ul children elements will be put in a head 
console.log(ul.children);

//grabs all its children including text nodes
console.log(ul.childNodes);

//parentNode and parentElement are pretty much the same. They grab the direct parent of the node
console.log(li.parentElement);

//just like queryselector but only grabs ancestors
const body = ul.closest('body');

//grabs the previous element sibling
const header = ul.previousElementSibling;

//grabs the next element sibling
//const ulSibling = header.previousElementSibling;

//grabs the sibling node like text nodes
//header.previousSibling;

//GRABS ALL THESE ELEMENTS AND PUT THEM IN A head
const head = document.querySelectorAll('li');
const mylist = document.querySelectorAll('li');

console.log(head);
//SHOWS WHAT YOU CAN DO WITH ELEMENTS AND MANIPULATE DOM
const addStyle = (pagerColor,listColor,headColor) =>{
    const h1 = document.querySelector('h1');
    if(!pageChange){
        h1.textContent = 'Wazam';
        h1.style.color = headColor;
        h1.style.fontFamily = 'Brush Script MT, Brush Script Std, cursive';
        h1.style.fontSize = '4em';
        // for (const iterator of head) {
        //     iterator.className = '';
        // }
        document.body.style.backgroundColor = pagerColor;
        container.style.bottom = '45px';
        container.style.background= '#3F3FD4'
        button[0].textContent = 'REVERT';
        button[0].id = 'button';
        pageChange = true;
    }
    else{
        button[0].textContent = 'CHANGE IT';
        h1.textContent = 'Trash';
        h1.style.color = 'black';
        h1.style.fontSize = '2em';
        h1.style.fontFamily = '';
        // for (const iterator of head) {
        //    iterator.className = 'visible';
        // }
        document.body.style.backgroundColor = 'white';
        button[0].id = '';
        container.style.bottom = '';
        container.style.background= ''
        pageChange = false;
    }   
    //toggles css class names 
    for (const iterator of head) {
        iterator.classList.toggle('invisible');
     }
     button[1].classList.toggle('invisible');
     button[2].classList.toggle('invisible');
  
} 
const replaceHeader = () => {
    
    const head = document.querySelector('div');
    //const originalHead = head.cloneNode
    if (revert){
        //head.innerHTML = listElement;
        
        //toggle my li elements because it breaks
        for (const iterator of mylist) {
            iterator.classList.toggle('invisible');
         }
         button[1].classList.toggle('invisible');
         button[2].classList.toggle('invisible');

        pageChange = false;
        addStyle('orange','black','white');
        document.querySelector('div').appendChild(nav);
       
        button[1].textContent = 'Remove Header';
        revert = false;
    }
    else{
        head.innerHTML = '<h1> BYE head <h1>';
        head.removeChild(head.lastElementChild)
        button[1].textContent = 'Add Header';
        revert = true;
        console.log('hello');
    }
    
}


button[0].addEventListener('click',addStyle.bind(this,'orange','black','white'));
button[1].addEventListener('click',replaceHeader);
button[2].addEventListener('click',function() {
    if(addedList){
        const newLi = document.createElement('li');
        newLi.innerHTML = '<a>SHOP<a>';
        ul.appendChild(newLi);
        button[2].textContent = 'Remove List';
        addedList = false;
    }
    else{
        ul.removeChild(ul.lastElementChild);
        addedList = true;
        button[2].textContent = 'Add List';
    }
    
    //ul.prepend(newLi);

})