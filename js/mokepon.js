const listaMascotas = ['piplup','turtwig','chimchar','wooper','volcanion','numel']
const listaAtaques = ['fuego','agua','tierra']

let nombreAtaqueJugador, nombreAtaqueRival
let mascota, mascotaRival
let vidasJugador = 3
let vidasRival = 3
let botonAgua, botonFuego, botonTierra, botonReiniciar, botonMascotaJugador

function iniciarJuego(){
    botonMascotaJugador = document.getElementById("boton-mascotas")
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', () => {ataqueJugador(0)})
    botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener('click', () => {ataqueJugador(1)})
    botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener('click', () => {ataqueJugador(2)})

    botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener('click', () => {location.reload()})
}

function capitalize(string){ return string.charAt(0).toUpperCase() + string.slice(1)}
function random(min,max){ return Math.floor(Math.random() * (max - min + 1) + min)}

function ataqueJugador(index){
    nombreAtaqueJugador = listaAtaques[index].toUpperCase()
    ataqueRival()
}

function ataqueRival(){
    nombreAtaqueRival = listaAtaques[random(0,2)].toUpperCase()
    crearMensaje()
}

function crearMensaje(){
    if(vidasJugador > 0 && vidasRival >0){
        dueloDeAtaques()
        comprobarVictoria()}
    else{alert("Reinicie el Juego")}
}

function seleccionarMascotaJugador(){
    let mascotaNoEnLista = true
    for(let i = 0; i < listaMascotas.length; i++){
        if(document.getElementById(listaMascotas[i]).checked){
            mascota = capitalize(listaMascotas[i])
            let imagenJugador = document.createElement('img')
            imagenJugador.src = 'assets/' +  listaMascotas[i] + '.png'
            imagenJugador.alt = mascota
            let tituloMascotaJugador = document.createElement('p')
            tituloMascotaJugador.innerHTML = mascota
            document.getElementById('imagen-jugador').appendChild(imagenJugador)
            document.getElementById('imagen-jugador').appendChild(tituloMascotaJugador)
            vidasEnJuego('vidas-jugador',vidasJugador)
            vidasEnJuego('vidas-rival',vidasRival)
            seleccionarMascotaRival()
            mascotaNoEnLista = false
            let seleccionarMascota = document.getElementById('lista-mascotas')
            seleccionarMascota.style.display = 'none'
            let seleccionarAtaque = document.getElementById('ataque')
            seleccionarAtaque.style.display = 'flex'
            break
        } 
    } if(mascotaNoEnLista){alert('Selecciona una opcion correcta')}
}

function vidasEnJuego(player ,vidas){
    corazonVivo = '💖'
    corazonMuerto = '🖤'
    vidasPerdidas = 3 - vidas
    panelVidas = corazonVivo.repeat(vidas) + corazonMuerto.repeat(vidasPerdidas)
    document.getElementById(player).innerHTML = panelVidas
}

function seleccionarMascotaRival(){
    let indexRandom = random(0,5)
    mascotaRival = capitalize(listaMascotas[indexRandom])
    if(mascotaRival != mascota){
        let tituloMascotaRival = document.createElement('p')
        tituloMascotaRival.innerHTML = mascotaRival
        let imagenRival = document.createElement('img')
        imagenRival.src = 'assets/' + listaMascotas[indexRandom] + '.png'
        imagenRival.alt = mascotaRival
        document.getElementById('imagen-rival').appendChild(imagenRival)
        document.getElementById('imagen-rival').appendChild(tituloMascotaRival)
    }else{seleccionarMascotaRival()}
    
}

function dueloDeAtaques(){
    let resultadoDuelo = document.getElementById("resultado")
    let jugadorDuelo = document.getElementById("ataque-jugador")
    let rivalDuelo = document.getElementById("ataque-rival")
    let resultado
    let divJugador = jugadorDuelo.parentNode
    let divResultado = resultadoDuelo.parentNode
    let divRival = rivalDuelo.parentNode

    if(
        (nombreAtaqueJugador == "FUEGO" && nombreAtaqueRival == "TIERRA") ||
        (nombreAtaqueJugador == "TIERRA" && nombreAtaqueRival == "AGUA") || 
        (nombreAtaqueJugador == "AGUA" && nombreAtaqueRival == "FUEGO")
        ){
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

window.addEventListener('load', iniciarJuego)