const progressbar = document.querySelector('.progressbar');
const progressval = document.querySelector('.progressval');
let progress = 0;

function enableProgressbar() {
    progressbar.setAttribute("role", "progressbar");
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.setAttribute("aria-live", "polite");
}

function updateProgressbar() {
    progressbar.setAttribute("aria-valuenow", progress);
    progressbar.style.setProperty('--progress', progress + "%");
    progressval.innerText = `${progress}%`;
}

enableProgressbar();

progressbar.addEventListener("click", (e) => {
    if (progress === 100) {
        progress = 0;
        updateProgressbar();
    } else {
        progress += 10;
        updateProgressbar();
    }
})