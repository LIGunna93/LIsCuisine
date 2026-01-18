const revButt = document.querySelector('#revdisplay');
const revWind = document.querySelector('#revwindow');

revButt.addEventListener('click', () => {
    if (revWind.style.display === 'none') {
        revWind.style.display = 'flex'; // Show it
    } else {
        revWind.style.display = 'none'; // Hide it
    }
});

const insButt = document.querySelector('#insdisplay');
const insWind = document.querySelector('#inswindow');

insButt.addEventListener('click', () => {
    if (insWind.style.display === 'none') {
        insWind.style.display = 'flex'; // Show it
    } else {
        insWind.style.display = 'none'; // Hide it
    }
});

const nutriButt = document.querySelector('#nutridisplay');
const nutriWind = document.querySelector('#nutriwindow');
    
nutriButt.addEventListener('click', () => {
    if (nutriWind.style.display === 'none') {
        nutriWind.style.display = 'flex'; // Show it
    } else {
        nutriWind.style.display = 'none'; // Hide it
    }
});