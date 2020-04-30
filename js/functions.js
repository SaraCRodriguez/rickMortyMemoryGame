document.addEventListener('DOMContentLoaded', cargarDatos);

async function cargarDatos() {
    var personajes = null;
    var seleccionadas = [];
    const first_url_api = 'https://rickandmortyapi.com/api/character/';
    await cargarPersonajes();


    var dificultad;
    var divDificultad = document.querySelector('.difficulty');
    var btn01 = document.querySelector('.boton01');
    var btn02 = document.querySelector('.boton02');
    var btn03 = document.querySelector('.boton03');
    var btn04 = document.querySelector('.boton04');
    var resetGame = document.querySelector('.reset');

    var tablero = document.querySelector('.tablero');

    btn01.addEventListener('click', function () {
        dificultad = 5;
        cogerCartas(dificultad);
        cargarCartas(dificultad);
        elegirCartas();
    });
    btn02.addEventListener('click', function () {
        dificultad = 9;
        cogerCartas(dificultad);
        cargarCartas(dificultad);
        elegirCartas();
    });
    btn03.addEventListener('click', function () {
        dificultad = 13;
        cogerCartas(dificultad);
        cargarCartas(dificultad);
        elegirCartas();
    });
    btn04.addEventListener('click', function () {
        dificultad = 18;
        cogerCartas(dificultad);
        cargarCartas(dificultad);
        elegirCartas();
    });
    resetGame.addEventListener('click', function () {
        location.reload();
    });


    function cargarCartas(parejas) {
        for (var i = 0; i < dificultad * 2; i++) {
            carta = seleccionadas[i];

            var newCard = document.createElement('div');
            var atributoStyle = document.createAttribute('style');

            var imagen = personajes[carta].image;
            var nombre = personajes[carta].name;
            var id = personajes[carta].id;

            // console.log(id + " - " + nombre + " - " + imagen);

            tablero.appendChild(newCard);
            tablero.lastChild.setAttribute('class', 'carta');
            atributoStyle.value = `--img: url(${imagen})`;
            tablero.lastChild.setAttribute('data-img', id);
            tablero.lastChild.setAttribute('name', nombre);
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

                if (personajes == null) {
                    personajes = datosObj.results;

                } else {
                    personajes = personajes.concat(datosObj.results);
                }
                next_url_api = datosObj.info.next;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    function cogerCartas(cantidad) {
        var cartasBaraja = personajes.length;
        for (let i = 0; i < cantidad; i++) {
            var nueva = Math.floor(Math.random() * cartasBaraja);
            while (seleccionadas.includes(nueva)) {
                nueva = Math.floor(Math.random() * cartasBaraja);
            }
            seleccionadas.push(nueva);
            seleccionadas.push(nueva);
        }
        seleccionadas = shuffle(seleccionadas);
    }

    function shuffle(array1) {
        var crt = array1.length, temp, index;

        while (crt > 0) {
            index = Math.floor(Math.random() * crt);
            crt--;
            temp = array1[crt];
            array1[crt] = array1[index];
            array1[index] = temp;
        }
        return array1;
    }
}