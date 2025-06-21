document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-carousel').forEach(carousel => {
    const originalItems = Array.from(carousel.children);
    if (originalItems.length === 0) return;

    // 元データを保存
    const itemsData = originalItems.map(item => ({
      src: item.dataset.src,
      caption: item.dataset.caption
    }));

    let currentIndex = 0;
    let isTransitioning = false;
    
    // 5つの要素を常に保持（前2つ、現在、後2つ）
    function updateCarousel() {
      carousel.innerHTML = '';
      
      for (let i = -2; i <= 2; i++) {
        const dataIndex = (currentIndex + i + itemsData.length) % itemsData.length;
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
          <img src="${itemsData[dataIndex].src}" alt="">
          <p>${itemsData[dataIndex].caption}</p>
        `;
        carousel.appendChild(item);
      }
      
      // 中央（3番目の要素）にスクロール
      carousel.scrollLeft = carousel.offsetWidth * 2;
    }

    // 初期設定
    updateCarousel();

    // スクロール監視
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
      if (isTransitioning) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const itemWidth = carousel.offsetWidth;
        const scrollPos = carousel.scrollLeft;
        const newIndex = Math.round(scrollPos / itemWidth);
        
        if (newIndex !== 2) { // 中央でない場合
          isTransitioning = true;
          
          // インデックス更新
          currentIndex = (currentIndex + (newIndex - 2) + itemsData.length) % itemsData.length;
          
          // 要素を再生成
          updateCarousel();
          
          setTimeout(() => {
            isTransitioning = false;
          }, 50);
        }
      }, 150); // スクロール完了を待つ
    });

    // タッチ操作の改善
    let startX = 0;
    let startTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      if (isTransitioning) return;
      startX = e.touches[0].clientX;
      startTime = Date.now();
    });
    
    carousel.addEventListener('touchend', (e) => {
      if (isTransitioning) return;
      
      const endX = e.changedTouches[0].clientX;
      const endTime = Date.now();
      const distance = startX - endX;
      const duration = endTime - startTime;
      const velocity = Math.abs(distance) / duration;
      
      // 速いスワイプでも1つずつ移動するよう制御
      if (Math.abs(distance) > 50 || velocity > 0.3) {
        const direction = distance > 0 ? 1 : -1;
        const itemWidth = carousel.offsetWidth;
        const targetScroll = carousel.offsetWidth * 2 + (itemWidth * direction);
        
        carousel.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    });
  });
});