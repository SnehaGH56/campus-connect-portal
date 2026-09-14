// Campus Connect Portal - Carousel Controller
// Handles campus highlights slider transitions and indicator dot states

const track = document.getElementById('carouselTrack');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = 3;

// Updates active slide position and indicator state
function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle(
            'active-dot',
            i === currentIndex
        );
    });
}

// Next and Previous slide button listeners
nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

// Click listener on slide indicator dots
dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.index));
    });
});