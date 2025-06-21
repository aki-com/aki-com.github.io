document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const src = item.dataset.src;
    const caption = item.dataset.caption;
    item.innerHTML = `
      <img src="${src}" alt="">
      <p>${caption}</p>
    `;
  });
});