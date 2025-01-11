        // document.getElementById('currentYear').textContent = new Date().getFullYear();
        const currentYear = new Date().getFullYear();
        const kata = `&copy; ${currentYear} Indra Dwi A. All rights reserved.`;
        document.getElementById('currentYear').innerHTML = kata;

    function openCertificate(imageUrl) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    
    modalImg.src = imageUrl;
    modal.style.display = "block";
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Get the modal
const modal = document.getElementById('certificateModal');
const closeButton = document.getElementsByClassName('close-modal')[0];

// Close modal when clicking the close button
closeButton.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
