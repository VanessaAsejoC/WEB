/**
 * Lance la lecture ou la met en pause selon l'état du lecteur
 */
function play(idPlayer, control) {
    var mAudio = document.getElementById(idPlayer);
    mAudio.play();
}

/**
 * Stop la lecture et remet sa progression à 0
 */
function resume(idPlayer) {
    var mAudio = document.getElementById(idPlayer);
    mAudio.currentTime = 0;
    mAudio.pause();
}

/**
 * Régle le volume du lecteur
 */
function volume(idPlayer, vol) {
    var mAudio = document.getElementById(idPlayer);
    mAudio.volume = vol;
}

/**
 * Met à jour la barre de progression du lecteur en changeant son contenu texte et son css
 */
function update(player) {
    var mProgressBar = document.getElementById('progressBar');
    var mProgressTime = document.getElementById('progressTime');
    var mCurrentTime = player.currentTime;
    var mDuration = player.duration;
    let hour, min, sec, progression;

    if (player.paused) {
        mProgressBar.innerHTML = 'Pas de lecture';
    } else {
        mProgressBar.innerHTML = 'Lecture en cours';

    }

    mProgressTime.innerHTML = formatTime(parseFloat(mCurrentTime));

    min = Math.floor(parseFloat(mCurrentTime) / 60);
    sec = Math.floor(parseFloat(mCurrentTime) % 60);
    progression = Math.floor((mCurrentTime)) / parseFloat(mDuration) * 100;
    mProgressBar.style.width = progression  + "%";

}

/**
 * Fonction qui reprend la lecture à l'endroit
 */
function clickProgress(idPlayer, control, event) {
    let mProgressBar, mProgressBarControl, mAudio, progressBarPos, progressPercent, mousePos, dist;
    mProgressBar = document.getElementById('progressBar');
    mProgressBarControl = document.getElementById('progressBarControl');
    mAudio = document.getElementById(idPlayer);

    progressBarPos = getPosition(control);
    mousePos = getMousePosition(event);

    dist = Math.sqrt(Math.pow(progressBarPos.x - mousePos.x, 2) + Math.pow(progressBarPos.y - mousePos.y, 2));
    progressPercent = dist / mProgressBarControl.offsetWidth;
    mAudio.currentTime = (mAudio.duration * progressPercent);

    mProgressBar.style.width = dist + 'px';

}



/**
 * Fonctions outils qui peuvent vous être utiles
 */


/**
 * Formatage d'un temps en secondes vers une chaîne de caractère
 */
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }

        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}

/**
 * Retourne la position de la souris ( dans la progressbar dans notre cas )
 */
function getMousePosition(event) {
    return {
        x: event.pageX,
        y: event.pageY
    };
}

/**
 * Retourne la position absolue ( de la barre de progression dans notre cas )
 */
function getPosition(element){
    var top = 0, left = 0;

    do {
        top  += element.offsetTop;
        left += element.offsetLeft;
    } while (element = element.offsetParent);

    return { x: left, y: top };
}