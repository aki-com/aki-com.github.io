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
    let isTouching = false;
    
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
      
      // 中央（3番目の要素）に即座にスクロール（アニメーションなし）
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = carousel.offsetWidth * 2;
      
      // scroll-behaviorを戻す
      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth';
      }, 10);
    }

    // 初期設定
    updateCarousel();

    // タッチ操作の詳細制御
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let startScrollLeft = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      if (isTransitioning) return;
      
      isTouching = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      startScrollLeft = carousel.scrollLeft;
      
      // スクロール挙動を無効化
      carousel.style.scrollBehavior = 'auto';
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
      if (!isTouching || isTransitioning) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = startX - currentX;
      const deltaY = startY - currentY;
      
      // 横スクロールの場合、縦スクロールを防ぐ
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
      if (!isTouching || isTransitioning) return;
      
      isTouching = false;
      const endX = e.changedTouches[0].clientX;
      const endTime = Date.now();
      const distance = startX - endX;
      const duration = endTime - startTime;
      const itemWidth = carousel.offsetWidth;
      
      // 閾値判定（距離または速度）
      const minDistance = itemWidth * 0.2; // 20%以上の移動
      const minVelocity = 0.3; // 最小速度
      const velocity = Math.abs(distance) / duration;
      
      if (Math.abs(distance) > minDistance || velocity > minVelocity) {
        // スワイプと判定
        const direction = distance > 0 ? 1 : -1;
        
        isTransitioning = true;
        currentIndex = (currentIndex + direction + itemsData.length) % itemsData.length;
        
        // 要素を再生成
        updateCarousel();
        
        setTimeout(() => {
          isTransitioning = false;
        }, 100);
      } else {
        // 元の位置に戻す
        carousel.style.scrollBehavior = 'smooth';
        carousel.scrollLeft = itemWidth * 2;
      }
    }, { passive: true });

    // スクロールイベント（デスクトップ用）
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
      if (isTransitioning || isTouching) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const itemWidth = carousel.offsetWidth;
        const scrollPos = carousel.scrollLeft;
        const expectedCenter = itemWidth * 2;
        const threshold = itemWidth * 0.3;
        
        if (Math.abs(scrollPos - expectedCenter) > threshold) {
          const direction = scrollPos > expectedCenter ? 1 : -1;
          
          isTransitioning = true;
          currentIndex = (currentIndex + direction + itemsData.length) % itemsData.length;
          
          updateCarousel();
          
          setTimeout(() => {
            isTransitioning = false;
          }, 100);
        }
      }, 100);
    });

    // リサイズ対応
    window.addEventListener('resize', () => {
      if (!isTransitioning) {
        updateCarousel();
      }
    });
  });
});