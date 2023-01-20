const socket = io.connect();

function render(data) {
  data.map((info) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${info.author.alias}</em>
          [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
      </div>
    `);
  });
}

/*recibe el socket emitido desde app.js el cual tiene el contenido de /data/chat.json y ejecuta la funcion llamada render que esta arriba de este codigo, y asi dibujar en pantalla, en la etiqueta del html que contiene el id llamado "messages" */
socket.on("messages", (data) => {
  render(data);
});


//#myChat es el nombre que recibe el "id" del "form" del html que se encuentra en chat.hbs
//cuando detecta que se presiona el boton del formulario ejecuta.
$("#myChat").on("submit", (e) => {
  e.preventDefault();

  let time = new Date().toLocaleString();

  //almacena en message el contenido del formulario
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
  

//envia por socket la informacion obtenida en el formulario
  socket.emit("new-message", message);
  $("#text").val("")
  return false
});
