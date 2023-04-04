
const request = require('axios')
//("http://localhost:8080");

//creamos el objeto con los datos del nuevo producto
const newProduct = {
  name:"Test Bass3",
  desc:"test",
  image:"https://i.imgur.com/0W9k3uP.jpeg",
  price:7,
  stock:1
}
let newProductId = 1;
/******************************************************************************** */


const postProduct = async() => {
    try {

      request({
        method: 'post',
        url: 'http://localhost:8080/products',
        data: {
          name:"Test Bass4",
          desc:"test",
          image:"https://i.imgur.com/0W9k3uP.jpeg",
          price:7,
          stock:1
        }
      });


    } catch (error) {
      console.log( `error: ${error}`)
    }
  }
  
/******************************************************************************** */
const getAll = async() => {
   try {
       

   request({
      method: 'get',
      url: 'http://localhost:8080/products',
      responseType: 'stream'
    })
      .then(function (response) {
        console.log(response.body);
        const allProducts = response.body;
        return allProducts;
      });


   
} catch (error) {
      console.log( `error: ${error}`)

  }
}
 

/***** */
const putProduct = async() => {
    try {
const newInfo = {
    name:"Test Bass 7",
    desc:"test7",
    image:"test7",
    price:10101010,
    stock:10
  }
  const response = await request.put(`http://localhost:8080/products/${newProductId}`,{newInfo})
} catch (error) {
    console.log( `error: ${error}`)
  }
}
/***** */

const deleteById = async() => {
    try {
        const response = await request.delete(`http://localhost:8080/products/${newProductId}`)
        return response;
      
    } catch (error) {
      console.log( `error: ${error}`)
    }
  }

postProduct()
getAll()
putProduct()
deleteById()
 

