let images = [...document.querySelectorAll('.img')];
console.log(images)
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
// Current position du scroll
let current = 0;
// Target position
let target = 0;
let ease = .05;

// Empêcher d'avoir trop de fond noir à la fin du scroll
window, addEventListener('resize', init);


// Pour faire apparaitre chaque image dans chaque div
images.forEach((img, index) => {
    img.style.backgroundImage = `url(./images/${index+1}.jpg)`
})

// Pour trouver un nombre entre deux nombres, t = ease, le pourcentage entre le début et la fin, pour faire des smooths animations
function lerp(start, end, t){
    return start * (1-t) + end * t;
}

// Fonction pour appliquer la transformation choisie à un élément donné
function setTransform(element, transform){
    element.style.transform = transform;
}

// Fonction appelée dès que la page est lancée
function init(){
    // return infos sur la taille d'un élément et sa position relative par rapport au viewport
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    // Créer la scrollbar à la taille exacte du viewport
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

// Fonction pour animer le scroll
function animate(){
    // Deux chiffres après le séparateur décimal
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

// Fonction pour le parallax
function animateImages(){
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.8);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

init();
animate()
