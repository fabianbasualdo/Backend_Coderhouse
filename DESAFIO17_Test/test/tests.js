

const request = require("supertest")("http://localhost:8080");

/*
Chai tiene varias interfaces: assert, expect y should, 
que permiten al desarrollador elegir el estilo que le resulte 
más legible y cómodo a la hora de desarrollar sus tests
*/

const expect = require("chai").expect;
const should  = require("chai").should();

//creamos el objeto con los datos del nuevo producto
const newProduct = {
  name:"Test Bass",
  desc:"test",
  image:"https://i.imgur.com/0W9k3uP.jpeg",
  price:7,
  stock:1
}
let newProductId = undefined;
/******************************************************************************** */
describe("Logueo de usuario", () => {
  it("login and redirect to product's page", async function () {

    //definimos como se llamara el usuario y su password
    let usuario = { username: "prueba@gmail.com", password: "1234" }


    //logueamos al usuario
    const response = await request.post("/auth/login").send(usuario);
    cookie = response.headers['set-cookie']

    expect(response.status).to.eql(302);
    expect(response.header['location']).to.eql('/');
  });
});

/******************************************************************************** */


describe("Products CRUD", function () {

  it("GET all products", async function () {
    const response = await request.get('/products') //ejecuta un GET
    const allProducts = response.body
    expect(response.status).to.eql(200)//se espera que el status sea 200
    should.not.equal(allProducts, undefined);//se espera que allProducts no sea undefined
  });
  
  it("Creates a new product", async function () {
    const response = await request.post("/products").send(newProduct) //Ejecuta un POST
    
    newProductId = response.body.id;
    expect(response.status).to.eql(200) //se espera que el status sea 200
    should.not.equal(newProductId, undefined); //se espera que newProductId no sea undefined
  });

  it("Change a product values", async function () {
    const newInfo = {
      name:"Test Bass 2",
      desc:"test2",
      image:"test2",
      price:10101010,
      stock:9
    }
    const response = await request.put(`/products/${newProductId}`).send(newInfo) //Ejecuta un PUT
    expect(response.body.name).to.eql(newInfo.name) //se espera la igualdad en el name
  });

  /*it("Delete the new product", async function () {
    const response = await request.delete(`/products/${newProductId}`) //ejecuta un DELETE
    expect(+response.body).to.eql(newProductId) //se espera la igualdad del objeto
  });*/
});
/******************************************************************************** */
