var mensaje = document.getElementById('mensaje')
var alerta = document.getElementById('alerta')
function funcion(){
alerta.style.transition = '1.5s';
alerta.style.transform = 'translateX(2000px)';
mensaje.style.transition = '3s';
mensaje.style.visibility = 'hidden';
}
var header = document.getElementById('header')
window.addEventListener('load',function(){
    header.style.animation = ('luz 5s linear 2s infinite normal');
});