/*
Para resolver el ejercicio necesitamos:
1. Obtener el chiste.
2. Renderizar el chiste en el HTML dependiendo de si es un "Two Part" o "Single"
    - Si es single, sólo deberíamos ver el chiste.
    - Si es un "Two Part" deberíamos ver la primera línea del chiste, seguido de un botón de detalle que me permita revelar la segunda parte del chiste.
    - Sólo se debe de mostrar el detalle del chiste una vez.
    - Cada uno de los botones debe de tener una función definida.
3. Mejorar el diseño sin afectar la funcionalidad del aplicativo. Use su creatividad. Puede utilizar librerías externas.
    
Si existen dudas al respecto del ejercicio por favor diríjanlas a través del Discord.
Adjunto dos imágenes básicas de como se ve el ejercicio final. 

*/


// URL de la API
const apiUrl = 'https://v2.jokeapi.dev/joke/Any?lang=es';

// Elementos del DOM
const jokeText = document.getElementById('joke-text');
const getJokeButton = document.getElementById('get-joke');
const resetButton = document.getElementById('btnReset');

// Función para obtener un chiste
function fetchJoke() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
      // Mostrar el chiste según el tipo
      if (data.type === 'single') {
        jokeText.textContent = data.joke; // Chiste de una sola línea
      } else if (data.type === 'twopart') {
        jokeText.textContent = `${data.setup}\n\n${data.delivery}`; // Chiste de dos partes
      }
    })
    .catch(error => {
      jokeText.textContent = 'Hubo un problema al obtener el chiste. Intenta nuevamente.';
      console.error('Error:', error);
    });
}

// Función para reiniciar el contenido
function resetJoke() {
  jokeText.textContent = 'Haz clic en el botón para ver un chiste.';
}

// Eventos de los botones
getJokeButton.addEventListener('click', fetchJoke);
resetButton.addEventListener('click', resetJoke);
