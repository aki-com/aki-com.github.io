document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-carousel').forEach(carousel => {
    const wrapper = carousel.parentElement;
    const items = Array.from(carousel.children);
    
    // インジケーターを作成
    const indicators = document.createElement('div');
    indicators.className = 'portfolio-indicators';
    items.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'portfolio-indicator';
      if (index === 0) indicator.classList.add('active');
      indicators.appendChild(indicator);
    });
    wrapper.insertBefore(indicators, carousel);

    // 無限ループ用のクローンを追加
    const first = items[0].cloneNode(true);
    const last = items[items.length - 1].cloneNode(true);
    carousel.appendChild(first);
    carousel.insertBefore(last, items[0]);

    // 初期位置設定を遅延実行
    setTimeout(() => {
      const itemWidth = carousel.offsetWidth;
      if (itemWidth > 0) {
        carousel.scrollLeft = itemWidth;
      }
    }, 50);
    
    let currentIndex = 0;
    let isAnimating = false;

    // インジケーターを更新
    function updateIndicators(activeIndex) {
      const indicatorElements = wrapper.querySelectorAll('.portfolio-indicator');
      indicatorElements.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
      });
    }

    // 指定インデックスに移動
    function moveToIndex(index) {
      if (isAnimating) return;
      isAnimating = true;
      
      const itemWidth = carousel.offsetWidth;
      carousel.scrollTo({
        left: itemWidth * (index + 1),
        behavior: 'smooth'
      });
      
      updateIndicators(index);
      setTimeout(() => isAnimating = false, 300);
    }

    // ボタンイベント
    const prevBtn = wrapper.querySelector('.portfolio-btn-prev');
    const nextBtn = wrapper.querySelector('.portfolio-btn-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        moveToIndex(currentIndex);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        moveToIndex(currentIndex);
      });
    }

    // タッチイベント
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
          currentIndex = (currentIndex + 1) % items.length;
        } else {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
        }
        moveToIndex(currentIndex);
      }
    });

    // マウスホイールイベント
    let wheelTimeout;
    carousel.addEventListener('wheel', (e) => {
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        e.preventDefault();
        
        if (wheelTimeout) return;
        wheelTimeout = setTimeout(() => wheelTimeout = null, 300);
        
        if (deltaX > 0) {
          currentIndex = (currentIndex + 1) % items.length;
          moveToIndex(currentIndex);
        } else {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          moveToIndex(currentIndex);
        }
      }
    });

    // マウスドラッグイベント
    carousel.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
      e.preventDefault();
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    carousel.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
          currentIndex = (currentIndex + 1) % items.length;
        } else {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
        }
        moveToIndex(currentIndex);
      }
    });

    // 無限ループ処理
    carousel.addEventListener('scroll', () => {
      if (isAnimating) return;
      
      const itemWidth = carousel.offsetWidth;
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = itemWidth * (items.length + 1);
      
      if (scrollLeft >= maxScroll - 5) {
        carousel.scrollLeft = itemWidth;
        currentIndex = 0;
        updateIndicators(currentIndex);
      }
      
      if (scrollLeft <= 5) {
        carousel.scrollLeft = itemWidth * items.length;
        currentIndex = items.length - 1;
        updateIndicators(currentIndex);
      }
    });
  });
});