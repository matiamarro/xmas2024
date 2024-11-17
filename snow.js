const snowContainer = document.querySelector('.snow-container');
const santaHat = document.getElementById('santaHat');

let isSnowing = false;

function createSnowflake() {
    if (isSnowing){
        setTimeout(createSnowflake, 500);
    }
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerText = '❄';

    // Dimensione casuale
    const size = Math.random() * 1.5 + 0.5 + 'em';
    snowflake.style.fontSize = size;

    // Posizione casuale orizzontale
    const fontSizeInPixels = parseFloat(size) * 16;
    const maxLeftPosition = window.innerWidth - fontSizeInPixels;
    snowflake.style.left = Math.random() * maxLeftPosition + 'px';

    // Durata casuale dell'animazione per caduta
    const fallDuration = Math.random() * 3 + 9 + 's';
    snowflake.style.animationDuration = fallDuration;

    // Effetto di profondità (opacità e z-index casuali)
    const depth = Math.floor(Math.random() * 10);
    snowflake.style.zIndex = depth;
    snowflake.style.opacity = 0.5 + depth * 0.05;

    snowContainer.appendChild(snowflake);

    // Funzione per monitorare l'altezza del fiocco
    const removeSnowflakeIfLow = () => {
        const snowflakeY = snowflake.getBoundingClientRect().top;
        const removeThreshold = window.innerHeight * 0.9; // Soglia di altezza (es. 70% dell'altezza della finestra)

        if (snowflakeY > removeThreshold) {
            snowflake.remove();
            clearInterval(heightCheckInterval); // Rimuove il controllo per migliorare le prestazioni
        }
    };

    // Controlla l'altezza del fiocco ogni 100 ms
    const heightCheckInterval = setInterval(removeSnowflakeIfLow, 100);

    // Rimozione del fiocco al termine dell'animazione
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        clearInterval(heightCheckInterval); // Assicura che il controllo sia disattivato
    });
}

santaHat.addEventListener('click', toggleAnimation);

function toggleAnimation(){
    if (isSnowing) {
        isSnowing = false;
    }
    else{
        isSnowing = true;
        createSnowflake();
    }
}
// Crea nuovi fiocchi di neve ogni x ms
//setInterval(createSnowflake, 500);
//setTimeout(createSnowflake, 500);