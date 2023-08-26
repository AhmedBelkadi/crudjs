let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let category = document.getElementById("category")
let count = document.getElementById("count")
let title = document.getElementById("title")
let create = document.getElementById("create")
let tbody = document.getElementById("data-container")
let deleteAllBtn = document.getElementById("deleteAll")
let btnSearchtitle = document.getElementById("searchByTitle")
let btnSearchCategory = document.getElementById("searchByCategory")
let searchInput = document.getElementById("searchInput")
let products 
let mood = "create"
let tmp

/*============== STORAGE FUNCTIONS ==============*/

function getProductsFromStorage(){
    products = localStorage.myProducts != null ? JSON.parse( localStorage.getItem("myProducts") ) : [] ;
}

function storeProducts(){
        localStorage.setItem("myProducts" , JSON.stringify(products) ) 
}

getProductsFromStorage()

/*============== END OF STORAGE FUNCTIONS ==============*/


function getTotal(){
        
    if( price.value != "" ){
        total.style.backgroundColor = "green"
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value    
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = "red"
    }
}

function clearInputData(){
    title.value = ""
    price.value = ""
    taxes.value  = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = ""
}

function readProduct(){
    getTotal()
    let id = 0
    tbody.innerHTML = ""
    for( produ of products ){
        data = `
        <tr>
            <td>${id}</td>
            <td>${produ.title}</td>
            <td>${produ.price}</td>
            <td>${produ.taxes}</td>
            <td>${produ.ads}</td>
            <td>${produ.discount}</td>
            <td>${produ.total}</td>
            <td>${produ.category}</td>
            <td> <button onclick="updateProduct(${id})" id="update">UPDATE</button> </td>
            <td> <button onclick="deleteProduct(${id})" id="delete">DELETE</button> </td>
        </tr>
        `
        tbody.innerHTML += data
        id++
    }

    showButtonDeleteAll()
}

readProduct()

create.addEventListener( "click" , () =>
        {
            let newProduct = {
                title : title.value.toLowerCase() ,
                price : price.value ,
                taxes : taxes.value ,
                ads : ads.value ,
                discount : discount.value ,
                total : total.innerHTML,
                count : count.value ,
                category : category.value.toLowerCase()
            }

            if( title.value != "" && price.value != "" && category.value != "" && count.value < 100 ){
                if( mood === "create" ){
                    if( newProduct.count > 1 ){
                        for( let i=0 ; i<newProduct.count;i++){
                        products.push(newProduct)}
                    }else{
                        products.push(newProduct)
                    }
                }else{
                    products[tmp] = newProduct
                    create.innerText = "CREATE"
                    count.style.display = ""
                }
                clearInputData()
            }

            storeProducts()
            readProduct()
        })

function showButtonDeleteAll(){
    deleteAllBtn.innerHTML = products.length == 0 ? "" : `<button onclick="deleteAll()" >DELETE ALL(${products.length})</button> `
}

function deleteProduct(id){
    products.splice( id , 1 )
    storeProducts()
    readProduct()
} 

function deleteAll(){
    localStorage.clear()
    products.splice(0)
    showButtonDeleteAll()
    tbody.innerHTML = ""
    
}

function updateProduct(id){
    title.value = products[id].title
    price.value = products[id].price
    taxes.value  = products[id].taxes
    ads.value = products[id].ads
    discount.value = products[id].discount
    getTotal()
    category.value = products[id].category
    count.style.display = "none"
    create.innerText = "UPDATE"
    mood = "update"
    tmp = id
    scroll({ top : 0 , behavior : "smooth" })
} 

let searchmode = "searchByTitle"
function searchMode(mode){
    searchmode = mode == "searchByCategory" ? "searchByCategory" : "searchByTitle"
    searchInput.placeholder = `search by ${searchmode}`
    searchInput.value = ""
    readProduct()
    searchInput.focus()
}

function searchBy( searchInputValue ){
    tbody.innerHTML = ""
    let id = 1
    for( produ of products ){
        if( searchmode == "searchByTitle" ){
            if( produ.title.includes( searchInputValue ) ){                        
                tbody.innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td>${produ.title}</td>
                                            <td>${produ.price}</td>
                                            <td>${produ.taxes}</td>
                                            <td>${produ.ads}</td>
                                            <td>${produ.discount}</td>
                                            <td>${produ.total}</td>
                                            <td>${produ.category}</td>
                                            <td> <button onclick="updateProduct(${id})" id="update">UPDATE</button> </td>
                                            <td> <button onclick="deleteProduct(${id})" id="delete">DELETE</button> </td>
                                        </tr>
                                     `
                    id++
             }      
        }
        else{
            if(  produ.category.includes( searchInputValue ) ){
                tbody.innerHTML += `
                                        <tr>
                                            <td>${id}</td>
                                            <td>${produ.title}</td>
                                            <td>${produ.price}</td>
                                            <td>${produ.taxes}</td>
                                            <td>${produ.ads}</td>
                                            <td>${produ.discount}</td>
                                            <td>${produ.total}</td>
                                            <td>${produ.category}</td>
                                            <td> <button onclick="updateProduct(${id})" id="update">UPDATE</button> </td>
                                            <td> <button onclick="deleteProduct(${id})" id="delete">DELETE</button> </td>
                                        </tr>
                                    `
                id++

            }
        }
    }  
}

