document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-carousel').forEach(carousel => {
    const items = Array.from(carousel.children);

    // innerHTMLを生成
    items.forEach(item => {
      const src = item.dataset.src;
      const caption = item.dataset.caption;
      item.innerHTML = `
        <img src="${src}" alt="">
        <p>${caption}</p>
      `;
    });

    // 無限ループ処理（クローンの追加）
    const first = items[0].cloneNode(true);
    const last = items[items.length - 1].cloneNode(true);
    carousel.appendChild(first);
    carousel.insertBefore(last, items[0]);

    const itemWidth = items[0].offsetWidth;
    setTimeout(() => {
      carousel.scrollLeft = itemWidth;
    }, 0);

    const allItems = carousel.querySelectorAll('.portfolio-item');
    const observerOptions = {
      root: carousel,
      threshold: 1.0 // consider the item visible if 60% in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const index = Array.from(allItems).indexOf(el);

        // if first element (clone at the beginning) is visible → jump to real last
        if (index === 0) {
          carousel.style.scrollSnapType = 'none';
          carousel.scrollLeft = itemWidth * items.length;
          requestAnimationFrame(() => {
            carousel.style.scrollSnapType = 'x mandatory';
          });
        }

        // if last element (clone at the end) is visible → jump to real first
        if (index === allItems.length - 1) {
          carousel.style.scrollSnapType = 'none';
          carousel.scrollLeft = itemWidth;
          requestAnimationFrame(() => {
            carousel.style.scrollSnapType = 'x mandatory';
          });
        }
      });
    }, observerOptions);

    allItems.forEach(item => observer.observe(item));
  });
});