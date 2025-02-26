const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const carouselContainer = document.querySelector(".carousel-container");
let slides = document.querySelectorAll(".carousel-container img");

// Variables
let currentIndex = 0;
const visibleSlides = 3; // Cantidad de imágenes visibles al mismo tiempo
let slideWidth = slides[0].offsetWidth + 13; // Ancho de cada imagen más el gap
const autoplaySpeed = 3900; // Velocidad del autoplay en milisegundos

// Clonar los primeros y últimos elementos para el efecto infinito
const firstClones = Array.from(slides).slice(0, visibleSlides).map((slide) => slide.cloneNode(true));
const lastClones = Array.from(slides).slice(-visibleSlides).map((slide) => slide.cloneNode(true));

// Agregar los clones al contenedor
firstClones.forEach((clone) => carouselContainer.appendChild(clone));
lastClones.forEach((clone) => carouselContainer.insertBefore(clone, slides[0]));

// Actualizar la lista de imágenes (incluyendo los clones)
slides = document.querySelectorAll(".carousel-container img");

// Configurar el índice inicial para empezar desde la primera imagen real
currentIndex = visibleSlides;
carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

// Función para mover el carrusel de forma infinita
function moveToSlideInfinite(index) {
  currentIndex = index;
  const offset = -currentIndex * slideWidth;
  carouselContainer.style.transition = "transform 0.5s ease-in-out"; // Animación suave
  carouselContainer.style.transform = `translateX(${offset}px)`;

  // Reposicionar sin animación si alcanzamos los clones
  setTimeout(() => {
    if (currentIndex < visibleSlides) {
      // Si está antes del primer slide real, reposicionar al final real
      currentIndex = slides.length - (visibleSlides * 2) + currentIndex;
      carouselContainer.style.transition = "none"; // Quitar la animación
      carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else if (currentIndex >= slides.length - visibleSlides) {
      // Si está después del último slide real, reposicionar al inicio real
      currentIndex = currentIndex - (slides.length - visibleSlides * 2);
      carouselContainer.style.transition = "none"; // Quitar la animación
      carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }, 500); // Coincide con la duración de la transición
}

// Eventos para los botones de navegación
prevButton.addEventListener("click", () => moveToSlideInfinite(currentIndex - 1));
nextButton.addEventListener("click", () => moveToSlideInfinite(currentIndex + 1));

// Ajustar el tamaño al redimensionar la ventana
window.addEventListener("resize", () => {
  slideWidth = slides[0].offsetWidth + 13;
  moveToSlideInfinite(currentIndex);
});

// Autoplay (desplazamiento automático)
let autoplay = setInterval(() => moveToSlideInfinite(currentIndex + 1), autoplaySpeed);

// Pausar el autoplay cuando el mouse está sobre el carrusel
carouselContainer.addEventListener("mouseover", () => clearInterval(autoplay));
carouselContainer.addEventListener("mouseout", () => {
  autoplay = setInterval(() => moveToSlideInfinite(currentIndex + 1), autoplaySpeed);
});











