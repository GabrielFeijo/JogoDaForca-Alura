var palavras = ["ALURA","DESAFIO","CACHORRO","CAMPEONATO","CURSO","LINGUAGEM","MOEDA","PALAVRA","PEIXE","GATO","BORBOLETA"];
var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
var localLetra = [];
var palavraAleatoria = '';
var erros = 0;
var acertos = 0;
var letras = [];
var finalizado = false;


function startGame(){

    document.querySelector('.buttons').classList.add('display')
    document.querySelector('.game').classList.remove('display')
  
    resetGame();
    pincel.fillStyle = 'grey';
    pincel.fillStyle = '#0A3871';
    var contextoAtual = 200;
    var numero = getRandomInt(0,palavras.length);
     palavraAleatoria = palavras[numero];
    
    console.log(palavraAleatoria);
    
    for(i=0;i<palavraAleatoria.length;i++){
        pincel.fillRect(contextoAtual,450,50,4)
        pincel.font = '40px Inter';
       // pincel.fillText(palavraAleatoria[i], contextoAtual+10, 448, 140);
        localLetra[i] = contextoAtual
        contextoAtual += 70
    }
    
}
function resetGame(){
    finalizado = false;
    erros = 0;
    acertos = 0;
    letras = [];
    context = 250 
    pincel.clearRect(0, 0, 1100, 550);
}

function changePage(page1,page2){
    document.querySelector(page1).classList.add('display')
    document.querySelector(page2).classList.remove('display')
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


context = 250 ;


function leDoTeclado(evento) {
    var regex = new RegExp("^[a-zA-Z]+$");
    var key = String.fromCharCode(!evento.charCode ? evento.which : evento.charCode);
    if (!regex.test(key)) {
        evento.preventDefault();
       return false;
    }

    if (!finalizado){
       
        for(i=0;i<letras.length;i++){
            if (letras[i] == evento.key.toUpperCase()){
                return;            
            }
        }
        letras.push(evento.key.toUpperCase())
        let achou = false
        for(i=0;i<palavraAleatoria.length;i++){
            if (palavraAleatoria[i] == evento.key.toUpperCase()){
                pincel.font = '40px Inter';
                pincel.fillStyle = '#0A3871';
                pincel.fillText(evento.key.toUpperCase(), localLetra[i]+10, 448, 140);
                achou = true;
                acertos++;
            }
        }
        if (acertos == palavraAleatoria.length && achou){
            pincel.font = '400 30px Inter';
            pincel.fillStyle = 'green';
            pincel.fillText("Você venceu", 550, 200, 140);
            pincel.fillText("Parabéns!", 550, 230, 140);
            finalizado = true;
        }
        if (!achou){
            erros++
            desenhaErro(erros)
            pincel.font = '400 30px Inter';
            pincel.fillStyle = '#495057';
            pincel.fillText(evento.key.toUpperCase(), context+10, 500, 140);
            context += 30;
        }
    }
  
  

 }

document.onkeydown = leDoTeclado;


function desenhaErro(erro){
    pincel.fillStyle = '#0A3871';
    switch (erro){
        case 1:
            pincel.fillRect(350,350,200,3);
        break;
        case 2:
            pincel.fillRect(400,100,3,250);
        break;
        case 3:
            pincel.fillRect(400,100,100,3);
        break;
        case 4:
            pincel.fillRect(500,100,3,40);
        break;
        case 5:
            pincel.beginPath();
            pincel.arc(502, 165, 25, 0, Math.PI * 2, true);
            pincel.stroke();
        break;
        case 6:
            pincel.fillRect(500,190,3,80)
        break;
        case 7:
            pincel.rotate(30 * Math.PI / 180);
            pincel.fillRect(538, -70, 3, 45);
            pincel.rotate(-30 * Math.PI / 180);
            
        break;
        case 8:
            pincel.rotate(30 * Math.PI / 180);
             pincel.rotate(30  * Math.PI /-90);
            pincel.fillRect(328, 433, 3, 45);
            pincel.rotate(-30 * Math.PI / 180);
            pincel.rotate(-30  * Math.PI /-90);
         
        break;
        case 9:
            pincel.rotate(30 * Math.PI / 180);
            pincel.fillRect(568, -18, 3, 45);
            pincel.rotate(-30 * Math.PI / 180);
        break;
        case 10:
            pincel.rotate(30 * Math.PI / 180);
            pincel.rotate(30  * Math.PI /-90);
            pincel.fillRect(298, 483, 3, 45);
           pincel.rotate(-30 * Math.PI / 180);
           pincel.rotate(-30  * Math.PI /-90);
           pincel.font = '400 30px Inter';
           pincel.fillStyle = 'tomato';
           pincel.fillText("Você perdeu!", 550, 200, 140);
           finalizado = true;
        break;


    }    
}

function newWord(){
    let texto = document.querySelector('.input').value.toUpperCase();

    if (texto == ""){
      return
    }

   palavras.push(texto);
   document.querySelector('.page2').classList.add('display');
   startGame();
}

document.querySelector('.startGame').addEventListener('click',startGame)
document.querySelector('.newGame').addEventListener('click',startGame)
document.querySelector('.save').addEventListener('click',newWord)
document.querySelector('.newWord').addEventListener('click',function() {changePage('.buttons','.page2')})
document.querySelector('.cancel').addEventListener('click',function() {changePage('.page2','.buttons')})
document.querySelector('.stopGame').addEventListener('click',function() {changePage('.game','.buttons')})



