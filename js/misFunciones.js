function traerInformacionCategorias() {
    console.log("test");
    $.ajax({
        url: "http://144.22.56.150:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick=' actualizar(" + respuesta[i].id + ")'>Actualizar</button></td>";
        myTable += '<td> <button onclick="cargarDatosCategoria(' + respuesta[i].id + ')">Editar</button></td>';
        myTable += "<td> <button onclick='borrarCategoria(" + respuesta[i].id + ")'>Borrar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias() {
    if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let var2 = {
            name: $("#Cname").val(),
            description: $("#Cdescription").val()
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: "http://144.22.56.150:8080/api/Category/save",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                $("#resultado").empty();
                $("#Cname").val("");
                $("#Cdescription").val("");
                alert("Se guardo correctamente");
                window.location.reload()
            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
    }
}

function cargarDatosCategoria(id) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.56.150:8080/api/Category/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Cname").val(item.name);
            $("#Cdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function actualizar(idElemento) {

    if ($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let elemento = {
            id: idElemento,
            name: $("#Cname").val(),
            description: $("#Cdescription").val()
        };

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            url: "http://144.22.56.150:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultado").empty();
                $("#id").val("");
                $("#Cname").val("");
                $("#Cdescription").val("");
                traerInformacionCategorias();
                alert("se ha Actualizado correctamente la categoria")


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


function borrarCategoria(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.56.150:8080/api/Category/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado1").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}


///////////////////Cabins//////////////////////////////////////
function traerInformacionCabins() {
    $.ajax({
        url: "http://144.22.56.150:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaCabins(respuesta);
        }
    });
}

function pintarRespuestaCabins(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].rooms + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick=' cargarDatosCabin(" + respuesta[i].id + ")'>Editar</button></td>";
        myTable += "<td> <button onclick=' actualizarInformacionCabin(" + respuesta[i].id + ")'>Actualizar</button></td>";
        myTable += "<td> <button onclick='borrarCabin(" + respuesta[i].id + ")'>Borrar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado2").html(myTable);
}

function cargarDatosCabin(id) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.56.150:8080/api/Cabin/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Cbname").val(item.name);
            $("#Cbbrand").val(item.brand);
            $("#Cbrooms").val(item.rooms);
            $("#Cbdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function guardarInformacionCabins() {
    if ($("#Cbname").val().length == 0 || $("#Cbbrand").val().length == 0 || $("#Cbrooms").val().length == 0 || $("#Cbdescription").val().length == 0) {
        alert("Todos los campos son obligatorios")
    } else {
        let var3 = {
            name: $("#Cbname").val(),
            brand: $("#Cbbrand").val(),
            rooms: $("#Cbrooms").val(),
            description: $("#Cbdescription").val(),
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://144.22.56.150:8080/api/Cabin/save",
            datatype: 'json',
            data: JSON.stringify(var3),



            success: function (response) {
                console.log(response);
                console.log("Se guardo Correctamente");
                //Limpiar Campos
                $("#resultadoCabin").empty();
                $("#Cbname").val("");
                $("#Cbbrand").val("");
                $("#Cbrooms").val("");
                $("#Cbdescription").val("");



                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Guardo Correctamente")
            }
        });
    }
}


function actualizarInformacionCabin(idElemento) {

    if ($("#Cbname").val().length == 0 || $("#Cbbrand").val().length == 0 || $("#Cbrooms").val().length == 0 || $("#Cbdescription").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let elemento = {
            id: idElemento,
            name: $("#Cbname").val(),
            brand: $("#Cbbrand").val(),
            rooms: $("#Cbrooms").val(),
            description: $("#Cbdescription").val(),

        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://144.22.56.150:8080/api/Cabin/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado2").empty();
                traerInformacionCabins();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultadoCabin").empty();
                $("#id").val("");
                $("#Cbname").val("");
                $("#Cbbrand").val("");
                $("#Cbrooms").val("");
                $("#Cbdescription").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


function borrarCabin(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://144.22.56.150:8080/api/Cabin/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado2").empty();
            traerInformacionCabins();
            alert("Se ha Eliminado.")
        }
    });

}
//////////////////////Clientes//////////////////////////////////
function traerInformacionClientes() {
    $.ajax({
        url: "http://144.22.56.150:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";

        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td> <button onclick=' cargarDatosClientes(" + respuesta[i].idClient + ")'>Editar</button>";
        myTable += "<td> <button onclick=' actualizarInformacionCliente(" + respuesta[i].idClient + ")'>Actualizar</button>";
        myTable += "<td> <button onclick='borrarCliente(" + respuesta[i].idClient + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionClientes() {
    if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let var4 = {

            email: $("#Clemail").val(),
            password: $("#Clpassword").val(),
            name: $("#Clname").val(),
            age: $("#Clage").val(),

        };

        console.log(var4);
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),

            url: "http://144.22.56.150:8080/api/Client/save",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
    }
}

function cargarDatosClientes(id) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.56.150:8080/api/Client/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Clemail").val(item.email);
            $("#Clpassword").val(item.password);
            $("#Clname").val(item.name);
            $("#Clage").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function actualizarInformacionCliente(idElemento) {
    if ($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let myData = {
            idClient: idElemento,
            email: $("#Clemail").val(),
            password: $("#Clpassword").val(),
            name: $("#Clname").val(),
            age: $("#Clage").val(),


        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://144.22.56.150:8080/api/Client/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoCliente").empty();
                $("#idClient").val("");
                $("#Clemail").val("");
                $("#Clpassword").val("");
                $("#Clname").val("");
                $("#Clage").val("");
                traerInformacionClientes();
                alert("se ha Actualizado correctamente")
            }
        });
    }
}

function borrarCliente(idElemento) {
    let myData = {
        idClient: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://144.22.56.150:8080/api/Client/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultadoCliente").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado.")
        }
    });
}


//////////////////////Mensajes//////////////////////////////////
function traerInformacionMensajes() {
    $.ajax({
        url: "http://144.22.56.150:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "<td>";
        myTable += "<td> <button onclick=' borrarMensaje(" + respuesta[i].id + ")'>Borrar</button></button></td>";
        myTable += "<td> <button onclick=' actualizarMensajes(" + respuesta[i].id + ")'>Actualizar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensajes() {
    if ($("#messageText").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let var5 = {
            messageText: $("#messageText").val(),
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var5),

            url: "http://144.22.56.150:8080/api/Message/save",


            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");


            }
        });
    }
}



function actualizarMensajes(idElemento) {
    if ($("#messageText").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {

        if ($("#messageText").val().length == 0) {

            alert("Todos los campos son obligatorios");
        } else {


            let myData = {
                id: idElemento,
                name: $("#messageText").val()
            };
            console.log(myData);
            let dataToSend = JSON.stringify(myData);
            $.ajax({
                url: "http://144.22.56.150:8080/api/Message/update",
                type: "PUT",
                data: dataToSend,
                contentType: "application/JSON",
                datatype: "JSON",
                success: function (respuesta) {
                    $("#resultadoMensaje").empty();
                    $("#messageText").val("");
                    traerInformacionMensajes();
                    alert("se ha Actualizado ")
                }
            });
        }
    }
}


function borrarMensaje(idElemento) {
    let myData = {
        idMessage: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://144.22.56.150:8080/api/Message/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado4").empty();
            traerInformacionMensajes();
            alert("Se ha Eliminado.")
        }
    });

}
//////////////////////Reservaciones//////////////////////////////////
function traerInformacionReservaciones() {
    $.ajax({
        url: "http://144.22.56.150:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });
}

function pintarRespuestaReservaciones(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td> <button onclick=' actualizarReservaciones(" + respuesta[i].id + ")'>Actualizar</button></button></td>";
        myTable += "<td> <button onclick=' borrarReservaciones(" + respuesta[i].id + ")'>Borrar</button></button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReservaciones() {
    let var6 = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),

        url: "http://144.22.56.150:8080/api/Reservation/save",


        success: function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });

}

function actualizarReservaciones(idElemento) {

    if ($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0) {
        alert("Todos los campos deben estar llenos")
    } else {
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://144.22.56.150:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado5").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultadoReservas").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

function borrarReservaciones(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://144.22.56.150:8080/api/Reservation/" + idElemento,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function (response) {
            console.log(response);
            $("#resultado5").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}