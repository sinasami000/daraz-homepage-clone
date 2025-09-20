(function () {
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');
  const slider = document.getElementById('slider');

  let index = 0;
  const total = slides.length;
  const autoplayDelay = 3500;
  let autoplayTimer = null;
  let isHovering = false;

  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = 'w-3 h-3 rounded-full bg-gray-300/80 hover:scale-110 transition-transform';
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.dataset.index = i;
    dotsContainer.appendChild(btn);
  }
  const dots = Array.from(dotsContainer.children);

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('bg-orange-500', i === index);
      d.classList.toggle('bg-gray-300/80', i !== index);
    });
  }

  function goTo(i) {
    index = ((i % total) + total) % total;
    update();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      goTo(Number(e.currentTarget.dataset.index));
      resetAutoplay();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
    if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
  });

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isHovering) next();
    }, autoplayDelay);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  slider.addEventListener('mouseenter', () => { isHovering = true; });
  slider.addEventListener('mouseleave', () => { isHovering = false; });

  window.addEventListener('resize', () => update());

  goTo(0);
  startAutoplay();
})();