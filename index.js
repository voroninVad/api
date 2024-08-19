async function dataApi(count){
    try{
        const res = await fetch(`https://fakestoreapi.com/products?limit=${count}`)
        //const res = await fetch(`https://dummyjson.com/products`)
        let data = await res.json()
        console.log(data)
        getPost(data);
    }catch(error){
        console.log('error', error)
    }
}

let btnHome = document.getElementById("home");
btnHome.addEventListener('click', e => {
    let btnM = document.getElementById("more");
    btnM.disabled = false
})


dataApi(6);

for (let btnMore of document.querySelectorAll("button.more")) {
    let clicks = 6
    btnMore.addEventListener('click', e => {
        if(clicks > 20){
            alert('Список товаров закончися');
            clicks=6
            btnMore.disabled = true
        }
        else{
            clicks += 6
            dataApi(clicks)
        }
    })
  }

function getValue(btn) {
    console.log(btn.value);
        filterCategories(btn.value)
  }

async function filterCategories(name){
    try{
        const res = await fetch(`https://fakestoreapi.com/products/category/${name}`)
        let data = await res.json()
        console.log(data)
        getPost(data)
    }catch(error){
        console.log('error', error)
    }
}


async function getPost(content){
    let list = document.querySelector('.products')
    list.innerHTML = '';
    let key;
    for(key in content){
        list.innerHTML += `
        <div class="product">
            <img src="${content[key].image}" alt="${content[key].title}" width="40%">
            <p class="title__tovar">${content[key].title}</p>
            <p class="price__tovar">${content[key].price} руб.</p>

            <button onclick="delTovar(${content[key].id})" class="btnDelete">
                        <svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
                        </svg>
            </button>

            <div class="cart">
                <svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.9 5.994h2.29l-1.145-1.98-1.146 1.98zm4.6 0h3.545l-2.016 10.03h-10L1.045 5.993H4.59L8.045.024l3.455 5.97z" fill="#000"></path>
                </svg>
            </div>
        </div>
        `
    }
}

async function addTovar(){
    try{
        const tovarName = document.getElementById('name_tovar').value,
        tovarDesc = document.getElementById('description_tovar').value,
        tovarCateg = document.getElementById('category').value,
        tovarPrice = document.getElementById('price_tovar').value;
        
        fetch('https://fakestoreapi.com/products',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    title: tovarName,
                    price: tovarPrice,
                    description: tovarDesc,
                    category: tovarCateg,
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            alert('Товар успешно добавлен');
    }catch(error){
        console.error('Error: ', error)
    }
}

async function delTovar(tovarDel){
    try{
        //const tovarDel = document.getElementById('idDel').value;
        fetch(`https://fakestoreapi.com/products/${tovarDel}`,{
            method:"DELETE"
        })
            alert(`Товар под номером ${tovarDel} удален`);
            dataApi(6)
    }catch(error){
        console.error('Error: ', error)
    }
    
}