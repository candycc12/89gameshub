function checkOrientation() {
    if (window.innerHeight < window.innerWidth) {
        var canvas = document.getElementsByClassName("canvas");
        if (canvas) {
            canvas.style.width = window.innerWidth;
            canvas.style.height = window.innerHeight;
        }
    }
};
checkOrientation();
window.addEventListener('resize', checkOrientation); 