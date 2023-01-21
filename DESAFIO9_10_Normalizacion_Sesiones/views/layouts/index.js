const socket = io.connect();//lo utilizo para escuchar lo que emite y envia socket

/*
jQuery prepend(): permite añadir o insertar contenido al comienzo de un elemento


Sintaxis de jQuery prepend():
$(selector).prepend(contenido, funcion(index,html))


selector (Obligatorio): Elemento selector en el que hay que insertar el contenido al principio del mismo.
contenido (Obligatorio): Contenido a insertar. Pudiendo ser objetos jQuery, HTML, texto…
*/


function render(data) {
  //en partials/chat.hbs hay div que contiene un id con el nombre #messages, hay es donde renderizo
  data.map((info) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${info.author.alias}</em>
          [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
      </div>
    `);
  });
}




/*recibe el socket emitido desde app.js el cual tiene el contenido de /data/chat.json y ejecuta la funcion llamada render que esta arriba de este codigo, y asi dibujar en pantalla, en la etiqueta del html que contiene el id llamado "#messages" */
socket.on("messages", (data) => {
  render(data);
});


//#myChat es el nombre que recibe el "id" del "form" del html que se encuentra en partials/chat.hbs
//cuando detecta que se presiona el boton del formulario ejecuta.
$("#myChat").on("submit", (e) => {
  e.preventDefault();

  let time = new Date().toLocaleString();//fecha y hora local

  //almacena en message el contenido del formulario, cada input text tiene su id, por eso lo puedo acceder
  const message = {
    author: {
      id: $("#id").val(),
      name: $("#name").val(),
      lastname: $("#lastname").val(),
      age: Number($("#age").val()),
      alias: $("#alias").val(),
      avatar: $("#avatar").val(),
    },
    text: $("#text").val(),
    time: time
  };
  

//envia por socket la informacion obtenida en el formulario que acabamos de guardar en "message"
/*este socket lo enviamos con lo que cargamos message,y lo estara recibiendo app.js para escribir el archivo chat.json*/
  socket.emit("new-message", message);

  $("#text").val("")
  return false
});
