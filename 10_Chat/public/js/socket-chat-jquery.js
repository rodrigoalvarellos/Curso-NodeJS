var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');


// Referencias de jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensajes = $('#txtMensajes');
var divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios

function renderizarUsuarios(personas) { // [ {},{},{},{}]

    console.log(personas);

    var html = '<li><a href="javascript:void(0)" class="active"> Chat de <span>' + sala + '</span></a></li>';


    for (var i = 0; i < personas.length; i++) {
        html += '<li><a data-id="' + personas[i].id + '" href="javascript:void(0)">';
        html += '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">';
        html += '<span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a></li>';
    }
    html += '<li class="p-20"></li>';

    divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';

    if ( mensaje.nombre === 'Admin') {
        adminClass = 'danger';
    }

    if (yo) {

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '    <h5>' + mensaje.nombre + '</h5>';
        html += '    <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img">';
        html += '    <img src="assets/images/users/5.jpg" alt="user" />';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-img">';

        if( mensaje.nombre !== "Admin") {
            html += '        <img src="assets/images/users/1.jpg" alt="user" />';
        }

        html += '    </div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function (e) {

    e.preventDefault();

    if (txtMensajes.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensajes.val()
    }, function (mensaje) {
        txtMensajes.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });


});