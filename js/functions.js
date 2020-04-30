document.addEventListener('DOMContentLoaded', cargarDatos);

async function cargarDatos() {
    var personajes = null;
    const first_url_api = 'https://rickandmortyapi.com/api/character/';
    console.log('Cargamos datos');
    await cargarPersonajes();

    var easy = personajes.slice(0, 5);
    var normal = personajes.slice(0, 9);
    var hard = personajes.slice(0, 13);
    var hardPlus = personajes.slice(0, 18);
    var dificultad;

    var divDificultad = document.querySelector('.difficulty');
    var btn01 = document.querySelector('.boton01');
    var btn02 = document.querySelector('.boton02');
    var btn03 = document.querySelector('.boton03');
    var btn04 = document.querySelector('.boton04');
    var resetGame = document.querySelector('.reset');

    var tablero = document.querySelector('.tablero');
    var numFoto = 0;

    btn01.addEventListener('click', function () {
        dificultad = easy;
        console.log(dificultad[0].image);

        cargarCartas();
        elegirCartas();
    });
    btn02.addEventListener('click', function () {
        dificultad = normal;
        console.log(dificultad[0].image);

        cargarCartas();
        elegirCartas();
    });
    btn03.addEventListener('click', function () {
        dificultad = hard;
        console.log(dificultad[0].image);

        cargarCartas();
        elegirCartas();
    });
    btn04.addEventListener('click', function () {
        dificultad = hardPlus;
        console.log(dificultad[0].image);

        cargarCartas();
        elegirCartas();
    });
    resetGame.addEventListener('click', function () {
        location.reload();
    });


    function cargarCartas() {
        for (var i = 1; i <= dificultad * 2; i++) {
            console.log(dificultad);
            var newCard = document.createElement('div');
            var atributoStyle = document.createAttribute('style');
            var comprobacionPar = i % 2;
            var numOrden = Math.floor(Math.random() * 300);

            if (comprobacionPar == true) {
                imagen = personajes[numFoto].image;
                idPersonaje = personajes[numFoto].id;
            } else {
                imagen = personajes[numFoto].image;
                idPersonaje = personajes[numFoto].id;
                numFoto += 1;
            }

            tablero.appendChild(newCard);
            tablero.lastChild.setAttribute('class', 'carta');
            atributoStyle.value = `order: ${numOrden}; --img: url(${imagen})`;
            tablero.lastChild.setAttribute('personajes[0].image', idPersonaje);
            tablero.lastChild.setAttributeNode(atributoStyle);
        }
    }

    function elegirCartas() {
        var cartas = document.querySelectorAll('.carta');
        var seleccionCartas = [];

        cartas.forEach(function (item) {
            item.addEventListener('click', function () {
                let cartasDescubiertas;

                if (seleccionCartas.length < 2 && item.classList.value.indexOf('mostrar') == -1) {
                    this.classList.add('mostrar');
                    seleccionCartas.push(item.getAttribute('data-img'));

                    if (seleccionCartas.length == 2 && seleccionCartas[0] != seleccionCartas[1]) {
                        setTimeout(function () {
                            cartasDescubiertas = document.querySelectorAll('.mostrar');
                            cartasDescubiertas.forEach(function (item) {
                                item.classList.remove('mostrar');
                            })
                            seleccionCartas.splice(0);
                        }, 1200);
                    } else if (seleccionCartas.length == 2 && seleccionCartas[0] == seleccionCartas[1]) {
                        setTimeout(function () {
                            cartasDescubiertas = document.querySelectorAll('.mostrar');
                            cartasDescubiertas.forEach(function (item) {
                                item.classList.add('mostrarFixed');
                            })
                            seleccionCartas.splice(0);
                        }, 1200);
                    }
                }
            })
        });
        tablero.classList.toggle('hide');
        divDificultad.classList.toggle('hide');
        resetGame.classList.toggle('hide');
    }

    async function cargarPersonajes() {
        try {
            next_url_api = first_url_api;

            while (next_url_api != '') {
                let datos = await fetch(next_url_api);
                let datosObj = await datos.json();
                var i, j, k;

                if (personajes == null) {
                    personajes = datosObj.results;
                    for (i = personajes.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * i);
                        k = personajes[i];
                        personajes[i] = personajes[j];
                        personajes[j] = k;
                    }

                } else {
                    personajes = personajes.concat(datosObj.results);
                    var i, j, k;
                    for (i = personajes.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * i);
                        k = personajes[i];
                        personajes[i] = personajes[j];
                        personajes[j] = k;
                    }
                }

                next_url_api = datosObj.info.next;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}














// document.addEventListener('DOMContentLoaded', cargarDatos);

// function cargarDatos() {
//     const URL = 'https://rickandmortyapi.com/api/character/';
//     var tablero = document.querySelector('.tablero');
//     var numPersonajes = 5;
//     var datos;

//     var xhttp = new XMLHttpRequest();

//     xhttp.open('GET', URL);
//     xhttp.send();

//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             datos = JSON.parse(xhttp.responseText);
//             var imagen;
//             var numFoto = 0;
//             var idPersonaje;

//             //SELECCIONAR DIFICULTAD
//             var divDificultad = document.querySelector('.difficulty');
//             var boton01 = document.querySelector('.boton01');
//             var boton02 = document.querySelector('.boton02');
//             var boton03 = document.querySelector('.boton03');
//             var boton04 = document.querySelector('.boton04');
//             var resetGame = document.querySelector('.reset');

//             var dificultad = 0;
//             var botones = ['easy', 'normal', 'hard', 'hard++'];

//             window.onload = function carga() {
//                 boton01.addEventListener('click', function () {
//                     dificultad = 0;
//                     cambiarDificultad(dificultad);
//                 });
//                 boton02.addEventListener('click', function () {
//                     dificultad = 1;
//                     cambiarDificultad(dificultad);
//                 });
//                 boton03.addEventListener('click', function () {
//                     dificultad = 2;
//                     cambiarDificultad(dificultad);
//                 });
//                 boton04.addEventListener('click', function () {
//                     dificultad = 3;
//                     cambiarDificultad(dificultad);
//                 });
//                 resetGame.addEventListener('click', function () {
//                     location.reload();
//                 });
//             };

//             function seleccionar(seleccionado, dificultad) {
//                 switch (seleccionado) {

//                     case botones[0]:
//                         for (var i = 1; i <= numPersonajes * 2; i++) {
//                             var newCard = document.createElement('div');
//                             var atributoStyle = document.createAttribute('style');
//                             var comprobacionPar = i % 2;
//                             var numOrden = Math.floor(Math.random() * 100);

//                             if (comprobacionPar == true) {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                             } else {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                                 numFoto += 1;
//                             }

//                             tablero.appendChild(newCard);
//                             tablero.lastChild.setAttribute('class', 'carta');
//                             atributoStyle.value = `order: ${numOrden}; --img: url(${imagen})`;
//                             tablero.lastChild.setAttribute('data-img', idPersonaje);
//                             tablero.lastChild.setAttributeNode(atributoStyle);
//                         }

//                         var cartas = document.querySelectorAll('.carta');
//                         var seleccionCartas = [];

//                         cartas.forEach(function (item) {
//                             item.addEventListener('click', function () {
//                                 let cartasDescubiertas;

//                                 if (seleccionCartas.length < 2 && item.classList.value.indexOf('mostrar') == -1) {
//                                     this.classList.add('mostrar');
//                                     seleccionCartas.push(item.getAttribute('data-img'));

//                                     if (seleccionCartas.length == 2 && seleccionCartas[0] != seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.remove('mostrar');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     } else if (seleccionCartas.length == 2 && seleccionCartas[0] == seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.add('mostrarFixed');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     }
//                                 }
//                             })
//                         });
//                         tablero.classList.toggle('hide');
//                         divDificultad.classList.toggle('hide');
//                         resetGame.classList.toggle('hide');
//                         break;


//                     case botones[1]:
//                         for (var i = 1; i <= (numPersonajes + 4) * 2; i++) {
//                             var newCard = document.createElement('div');
//                             var atributoStyle = document.createAttribute('style');
//                             var comprobacionPar = i % 2;
//                             var numOrden = Math.floor(Math.random() * 200);

//                             if (comprobacionPar == true) {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                             } else {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                                 numFoto += 1;
//                             }

//                             tablero.appendChild(newCard);
//                             tablero.lastChild.setAttribute('class', 'carta');
//                             atributoStyle.value = `order: ${numOrden}; --img: url(${imagen})`;
//                             tablero.lastChild.setAttribute('data-img', idPersonaje);
//                             tablero.lastChild.setAttributeNode(atributoStyle);
//                         }

//                         var cartas = document.querySelectorAll('.carta');
//                         var seleccionCartas = [];

//                         cartas.forEach(function (item) {
//                             item.addEventListener('click', function () {
//                                 let cartasDescubiertas;

//                                 if (seleccionCartas.length < 2 && item.classList.value.indexOf('mostrar') == -1) {
//                                     this.classList.add('mostrar');
//                                     seleccionCartas.push(item.getAttribute('data-img'));

//                                     if (seleccionCartas.length == 2 && seleccionCartas[0] != seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.remove('mostrar');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     } else if (seleccionCartas.length == 2 && seleccionCartas[0] == seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.add('mostrarFixed');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     }
//                                 }
//                             })
//                         });
//                         tablero.classList.toggle('hide');
//                         divDificultad.classList.toggle('hide');
//                         resetGame.classList.toggle('hide');
//                         break;


//                     case botones[2]:
//                         for (var i = 1; i <= (numPersonajes + 8) * 2; i++) {
//                             var newCard = document.createElement('div');
//                             var atributoStyle = document.createAttribute('style');
//                             var comprobacionPar = i % 2;
//                             var numOrden = Math.floor(Math.random() * 300);

//                             if (comprobacionPar == true) {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                             } else {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                                 numFoto += 1;
//                             }

//                             tablero.appendChild(newCard);
//                             tablero.lastChild.setAttribute('class', 'carta');
//                             atributoStyle.value = `order: ${numOrden}; --img: url(${imagen})`;
//                             tablero.lastChild.setAttribute('data-img', idPersonaje);
//                             tablero.lastChild.setAttributeNode(atributoStyle);
//                         }

//                         var cartas = document.querySelectorAll('.carta');
//                         var seleccionCartas = [];

//                         cartas.forEach(function (item) {
//                             item.addEventListener('click', function () {
//                                 let cartasDescubiertas;

//                                 if (seleccionCartas.length < 2 && item.classList.value.indexOf('mostrar') == -1) {
//                                     this.classList.add('mostrar');
//                                     seleccionCartas.push(item.getAttribute('data-img'));

//                                     if (seleccionCartas.length == 2 && seleccionCartas[0] != seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.remove('mostrar');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     } else if (seleccionCartas.length == 2 && seleccionCartas[0] == seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.add('mostrarFixed');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     }
//                                 }
//                             })
//                         });
//                         tablero.classList.toggle('hide');
//                         divDificultad.classList.toggle('hide');
//                         resetGame.classList.toggle('hide');
//                         break;


//                     case botones[3]:
//                         for (var i = 1; i <= (numPersonajes + 13) * 2; i++) {
//                             var newCard = document.createElement('div');
//                             var atributoStyle = document.createAttribute('style');
//                             var comprobacionPar = i % 2;
//                             var numOrden = Math.floor(Math.random() * 400);

//                             if (comprobacionPar == true) {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                             } else {
//                                 imagen = datos.results[numFoto].image;
//                                 idPersonaje = datos.results[numFoto].id;
//                                 numFoto += 1;
//                             }

//                             tablero.appendChild(newCard);
//                             tablero.lastChild.setAttribute('class', 'carta');
//                             atributoStyle.value = `order: ${numOrden}; --img: url(${imagen})`;
//                             tablero.lastChild.setAttribute('data-img', idPersonaje);
//                             tablero.lastChild.setAttributeNode(atributoStyle);
//                         }

//                         var cartas = document.querySelectorAll('.carta');
//                         var seleccionCartas = [];

//                         cartas.forEach(function (item) {
//                             item.addEventListener('click', function () {
//                                 let cartasDescubiertas;

//                                 if (seleccionCartas.length < 2 && item.classList.value.indexOf('mostrar') == -1) {
//                                     this.classList.add('mostrar');
//                                     seleccionCartas.push(item.getAttribute('data-img'));

//                                     if (seleccionCartas.length == 2 && seleccionCartas[0] != seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.remove('mostrar');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     } else if (seleccionCartas.length == 2 && seleccionCartas[0] == seleccionCartas[1]) {
//                                         setTimeout(function () {
//                                             cartasDescubiertas = document.querySelectorAll('.mostrar');
//                                             cartasDescubiertas.forEach(function (item) {
//                                                 item.classList.add('mostrarFixed');
//                                             })
//                                             seleccionCartas.splice(0);
//                                         }, 1500);
//                                     }
//                                 }
//                             })
//                         });
//                         tablero.classList.toggle('hide');
//                         divDificultad.classList.toggle('hide');
//                         resetGame.classList.toggle('hide');
//                         break;
//                 }
//             };

//             function cambiarDificultad(dificultad) {
//                 seleccionar(botones[dificultad], dificultad);
//             };


//         }
//     };


// }