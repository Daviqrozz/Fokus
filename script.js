//Referenciando as classes do html
const html = document.querySelector('html')
const FocoBt = document.querySelector('.app__card-button--foco')
const CurtoBt = document.querySelector('.app__card-button--curto')
const LongoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const MusicInput = document.querySelector('#alternar-musica')
const StartButton = document.querySelector('#start-pause')
const StartPauseButton = document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#timer')

//Audios
const music = new Audio('sons/luna-rise-part-one.mp3')
music.loop = true
const audioPlay = new Audio('sons/play.wav');
const audioPausa = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3')

let tempoDecorridoEmEegundos = 1500

//Funçao da musica
MusicInput.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
});
//Funçao do click foco
FocoBt.addEventListener('click', () => {
    alterarContexto('foco')
    tempoDecorridoEmEegundos = 1500
    mostrarTempo()
    FocoBt.classList.add('active')
});
//Funçao do click descanso-curto

CurtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    tempoDecorridoEmEegundos = 300
    mostrarTempo()
    CurtoBt.classList.add('active')
});
//Funçao do click descanso-longo
LongoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    tempoDecorridoEmEegundos = 900
    mostrarTempo()
    LongoBt.classList.add('active')
});
//Funçao de alterar atributos a partir do contexto
function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    buttons.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    //Condiçao de alterar o texto a partir do contexto
    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}
//Contador
const contagemregressiva = () => {
    if (tempoDecorridoEmEegundos <= 0) {
        audioTempoFinalizado.play()
        StartPauseButton.innerHTML = `
        <span>Finalizado!</span>
        `
        zerar()
        return
    }
    console.log('temporizador: ' + tempoDecorridoEmEegundos)
    tempoDecorridoEmEegundos -= 1
    mostrarTempo()
}
//Funçao iniciar
StartButton.addEventListener('click',StartPause)

//Funçao iniciar/pausar
function StartPause() {
    if (intervaloId) {
        console.log("Temporizador pausado")
        StartPauseButton.innerHTML = `
        <span>Continuar <img src="imagens/play_arrow.png" alt=""></span>
        `
        audioPausa.play()
        zerar()  
        return
    }
    console.log('temporizador iniciado')
    StartPauseButton.innerHTML = `
    <span>Pausar <img src="imagens/pause.png" alt=""></span>
    `
    audioPlay.play()
    intervaloId = setInterval(contagemregressiva, 1000)
}

//Intervalo docontador
let intervaloId = null

//zera o contador quando chega a 0
function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}
//Funçao de mostrar o tempo na tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmEegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
