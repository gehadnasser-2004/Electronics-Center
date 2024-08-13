let title=document.getElementById('title');
let price=document.getElementById('price');
let ads=document.getElementById('ads');
let taxes=document.getElementById('taxes');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mode='create';
let tmp;
//get total
function gettotal(){
   if(price.value !=''){
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
   }
   else{
    total.innerHTML='';
    total.style.background='#a00d02';
   }

}


//create product
let dataPro;
if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product);
}

else{
    dataPro=[];
}

submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count
    if(title.value!='' && price.value!=''&&category.value!='')
        {
            if(mode == 'create'){
                if(newpro.count>1)
                    {
                        for(let i=0;i<newpro.count;i++)
                            {
                                dataPro.push(newpro);
                            }
                    }
                    else{
                         dataPro.push(newpro);}}
                else{
                    dataPro[tmp] = newpro;
                    mode='create';
                    submit.innerHTML='Create';
                    count.style.display='block';
            
                }
                clear();
        }

    //save localstorage
    localStorage.setItem('product',JSON.stringify(dataPro));
    console.log(dataPro);
    
    show();
}

//clear after create

function clear() {
    title.value = '';
    taxes.value ='';
    ads.value = '';
    discount.value ='';
    count.value = '';
    total.innerHTML = '';
    category.value = '';
    price.value = '';
}

//read

function show(){
    gettotal();
  let table='';
  for(let i=0;i<dataPro.length;i++){
    table += `
         <tr>
                        <th>${i+1}</th>
                        <th>${dataPro[i].title}</th>
                        <th>${dataPro[i].price}</th>
                        <th>${dataPro[i].taxes}</th>
                        <th>${dataPro[i].ads}</th>
                        <th>${dataPro[i].discount}</th>
                        <th>${dataPro[i].total}</th>
                        <th>${dataPro[i].category}</th>
                        <th><button id="update" onclick="updateDate(${i})" >update</button></th>
                        <th><button id="delete" onclick="deletedata(${i})">delete</button></th>
                    </tr>
    `
  }

  document.getElementById('tbody').innerHTML=table;
  let btnDelete=document.getElementById('deleteAll');
  if(dataPro.length>0)
    {
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `

    }
    else{
        btnDelete.innerHTML='';
    }
}
show();



//delete
function deletedata(i)
{
    dataPro.splice(i, 1);
    localStorage.product=JSON.stringify(dataPro);
    show();
}
function deleteAll(){
   localStorage.clear();
   dataPro.splice(0);
   show();
}



//update
function updateDate(i){
  title.value=dataPro[i].title;
  price.value=dataPro[i].price;
  taxes.value=dataPro[i].taxes;
  ads.value=dataPro[i].ads;
  discount.value=dataPro[i].discount;
  gettotal();
  count.style.display="none";
  submit.innerHTML='Update'
  category.value=dataPro[i].category;
  mode='update';
  tmp=i;
  scroll({
    top:0,
    behavior:"smooth",

  })
}


//search
let searchMode='title';

function getSearchMode(id){
    let search=document.getElementById('search');
  if(id=='searchTitle')
    {
        searchMode='title';
        search.placeholder='Search by Title';
    }
    else{
        searchMode='category';
        search.placeholder='Search by Category';
    }
    search.focus();
    search.value='';
    show();
}

function searchDate(value)
{
    let table='';
    if(searchMode=='title')
    {
        
        for(let i=0; i<dataPro.length; i++)
            {
                if(dataPro[i].title.includes(value.toLowerCase()))
                    {
                        table += `
                        <tr>
                                       <th>${i}</th>
                                       <th>${dataPro[i].title}</th>
                                       <th>${dataPro[i].price}</th>
                                       <th>${dataPro[i].taxes}</th>
                                       <th>${dataPro[i].ads}</th>
                                       <th>${dataPro[i].discount}</th>
                                       <th>${dataPro[i].total}</th>
                                       <th>${dataPro[i].category}</th>
                                       <th><button id="update" onclick="updateDate(${i})" >update</button></th>
                                       <th><button id="delete" onclick="deletedata(${i})">delete</button></th>
                                   </tr>
                   `

                    }
                  
            }

    }
    else
    {
        for(let i=0; i<dataPro.length; i++)
            {
                if(dataPro[i].category.includes(value.toLowerCase()))
                    {
                        table += `
                        <tr>
                                       <th>${i}</th>
                                       <th>${dataPro[i].title}</th>
                                       <th>${dataPro[i].price}</th>
                                       <th>${dataPro[i].taxes}</th>
                                       <th>${dataPro[i].ads}</th>
                                       <th>${dataPro[i].discount}</th>
                                       <th>${dataPro[i].total}</th>
                                       <th>${dataPro[i].category}</th>
                                       <th><button id="update" onclick="updateDate(${i})" >update</button></th>
                                       <th><button id="delete" onclick="deletedata(${i})">delete</button></th>
                                   </tr>
                   `

                    }
                  
            }


    }
    document.getElementById('tbody').innerHTML=table;
}




//clean data
