
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var updateIndex;

var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var productList = [];

if(localStorage.getItem('products') !== null)  {
    productList = JSON.parse( localStorage.getItem('products') );
    displayProductList(productList);
}

function addProduct(){
    if(validProductName()===true){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value , 
        category: productCategoryInput.value,
        desc: productDescInput.value
    };
    productList.push(product);
    clearInputs();
    setAtLocalStorageAndDisplay();
    }
}

function clearInputs() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProductList(list){
    var addRow = ``;
    for(var i = 0 ;i < list.length;i++) {

    addRow += ` <tr class="my-2">
    <td>${list[i].newName ? list[i].newName : list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-sm btn-warning" onclick="setFormForUpdate(${i})">update</button></td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">delete</button></td>
</tr>`

    }
    document.getElementById('tBody').innerHTML = addRow ;
}

function deleteProduct(index) {
    productList.splice(index , 1);
    setAtLocalStorageAndDisplay();
}

function setAtLocalStorageAndDisplay(){
    localStorage.setItem('products' , JSON.stringify(productList));
    displayProductList(productList);
}

function searchByName(term){
    var filteredList = [];
    for(var i=0 ; i<productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()) === true){
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase() , `<span class="text-success fw-bolder">${term.toUpperCase()}</span>`)
            filteredList.push(productList[i]);
        }
    }
    displayProductList(filteredList);
}

function setFormForUpdate(index){
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    updateIndex = index;

    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescInput.value = productList[index].desc;
}

function updateProduct(){
    addBtn.classList.replace('d-none' , 'd-block');
    updateBtn.classList.replace('d-block' , 'd-none');

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value , 
        category: productCategoryInput.value,
        desc: productDescInput.value
    };

    productList.splice(updateIndex , 1 , product);
    setAtLocalStorageAndDisplay();
    clearInputs()
}

function validProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/
    if( regex.test(productNameInput.value) === true){
        document.getElementById('wrongName').classList.add('d-none');
        return true ;
    }else{
        document.getElementById('wrongName').classList.remove('d-none');
        return false ;
    }
}