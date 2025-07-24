const allImages = document.querySelectorAll('.image-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const filterButtons = document.querySelectorAll('.filters button');

let currentImageIndex = 0;
let filteredImages = [...allImages];

allImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImageIndex = filteredImages.indexOf(img);
    openLightbox(img.src);
  });
});

function openLightbox(src) {
  lightbox.classList.add('show');
  lightbox.classList.remove('hidden');
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.classList.add('hidden');
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
  lightboxImg.src = filteredImages[currentImageIndex].src;
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
  lightboxImg.src = filteredImages[currentImageIndex].src;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filters .active').classList.remove('active');
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    filteredImages = [];

    document.querySelectorAll('.image-card').forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';

      if (matches) {
        filteredImages.push(card.querySelector('img'));
      }
    });
  });
});
