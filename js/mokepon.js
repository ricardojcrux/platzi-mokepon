// Listas con informacion de los personajes del juego
const listaMascotas = ['piplup','turtwig','chimchar','wooper','volcanion','numel']
const listaAtaques = ['fuego','agua','tierra']

// Constantes de botones de interacción en ataques
const botonAgua = document.getElementById("boton-agua")
const botonFuego = document.getElementById("boton-fuego")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascotas")
const resultadoDuelo = document.getElementById("resultado")
const jugadorDuelo = document.getElementById("ataque-jugador")
const rivalDuelo = document.getElementById("ataque-rival")

// Declaración de variables globales
let nombreAtaqueJugador, nombreAtaqueRival
let mascota, mascotaRival
let vidasJugador = 3
let vidasRival = 3

// Funcion principal del juego
function iniciarJuego(){
    botonMascotaJugador.addEventListener('click', seleccionarMascota)
    botonFuego.addEventListener('click', () => {ataque(0)})
    botonAgua.addEventListener('click', () => {ataque(1)})
    botonTierra.addEventListener('click', () => {ataque(2)})
    botonReiniciar.addEventListener('click', () => {location.reload()})
}

// Funciones creadas para funciones minimas dentro del programa
function capitalize(string){ return string.charAt(0).toUpperCase() + string.slice(1)}
function random(min,max){ return Math.floor(Math.random() * (max - min + 1) + min)}

function ataque(index){
    nombreAtaqueJugador = listaAtaques[index].toUpperCase()
    nombreAtaqueRival = listaAtaques[random(0,2)].toUpperCase()
    dueloDeAtaques()
}

function seleccionarMascota(){
    let mascotaNoEnLista = true
    for(let i = 0; i < listaMascotas.length; i++){
        if(document.getElementById(listaMascotas[i]).checked){
            mascota = capitalize(listaMascotas[i])
            seleccionDeMascota(mascota)
            vidasEnJuego()
            mascotaNoEnLista = false
            document.getElementById('lista-mascotas').style.display = 'none'
            document.getElementById('ataque').style.display = 'flex'
            break
        }}
        if(mascotaNoEnLista == true) {alert('Selecciona una opción')
}}

function seleccionDeMascota(mascota){
    mascotaRival = capitalize(listaMascotas[random(0,5)])
    const listaImagen = ['imagen-jugador','imagen-rival']
    const listaVariablesImagen = [mascota,mascotaRival]
    if(mascotaRival != mascota){
        for(let i=0; i< listaImagen.length; i++){
            let tituloMascota = document.createElement('p')
            tituloMascota.innerHTML = listaVariablesImagen[i]
            let imagenMascota = document.createElement('img')
            imagenMascota.src = 'assets/' + listaVariablesImagen[i] + '.png'
            document.getElementById(listaImagen[i]).appendChild(imagenMascota)
            document.getElementById(listaImagen[i]).appendChild(tituloMascota)
        }     
    } else{seleccionDeMascota()}
}

function vidasEnJuego(){
    const corazonVivo = '💖'
    const corazonMuerto = '🖤'
    const player = ['vidas-jugador','vidas-rival']
    let vidas = [vidasJugador, vidasRival]
    for(let i=0; i < player.length; i++){
        let vidasPerdidas = 3 - vidas[i]
        let panelVidas = corazonVivo.repeat(vidas[i]) + corazonMuerto.repeat(vidasPerdidas)
        document.getElementById(player[i]).innerHTML = panelVidas
    }
}
function dueloDeAtaques(){
    let resultado
    let divJugador = jugadorDuelo.parentNode
    let divResultado = resultadoDuelo.parentNode
    let divRival = rivalDuelo.parentNode

    if(
        (nombreAtaqueJugador == "FUEGO" && nombreAtaqueRival == "TIERRA") || (nombreAtaqueJugador == "TIERRA" && nombreAtaqueRival == "AGUA") || (nombreAtaqueJugador == "AGUA" && nombreAtaqueRival == "FUEGO")){
        vidasRival = vidasRival - 1
        vidasEnJuego('vidas-rival',vidasRival)
        divResultado.style.backgroundColor = 'green'
        resultado = "GANASTE"}
    else if(nombreAtaqueJugador == nombreAtaqueRival){ 
        resultado = "EMPATE" 
        divResultado.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'}
    else{ 
        vidasJugador = vidasJugador - 1
        vidasEnJuego('vidas-jugador',vidasJugador)
        divResultado.style.backgroundColor = 'red'
        resultado = "PERDISTE"}
    
    panelDuelo(divJugador,nombreAtaqueJugador)
    panelDuelo(divRival,nombreAtaqueRival)

    jugadorDuelo.innerHTML = nombreAtaqueJugador
    resultadoDuelo.innerHTML = resultado
    rivalDuelo.innerHTML = nombreAtaqueRival

    comprobarVictoria()
}

function panelDuelo(div,ataque){
    if(ataque == 'FUEGO'){
        div.style.backgroundColor = 'darkorange'
    }
    else if(ataque == 'AGUA'){
        div.style.backgroundColor = 'mediumblue'
    }
    else{
        div.style.backgroundColor = 'sienna'
    }
}

function comprobarVictoria(){
    if(vidasJugador == 0 || vidasRival == 0){
        let resultadoDuelo = document.getElementById("mensaje-final")
        if(vidasRival == 0){
            resultadoDuelo.innerHTML = 'Tu ' + mascota + ' ha VENCIDO!'}
        else if(vidasJugador == 0){
            resultadoDuelo.innerHTML = 'Tu ' + mascota + ' ha sido DERROTADO :('}
        let botonesJuego = document.getElementById('botones')
        botonesJuego.style.display = 'none'
        let reiniciarJuego = document.getElementById('reiniciar')
        reiniciarJuego.style.display = 'flex'
}}

window.addEventListener('load',iniciarJuego)