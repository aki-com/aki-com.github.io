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

    const itemWidth = window.innerWidth;
    carousel.scrollLeft = itemWidth;

    carousel.addEventListener('scroll', () => {
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = itemWidth * items.length;
      } else if (carousel.scrollLeft >= itemWidth * (items.length + 1)) {
        carousel.scrollLeft = itemWidth;
      }
    });
  });
});