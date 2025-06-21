document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-carousel').forEach(carousel => {
    const items = Array.from(carousel.children);
    
    // innerHTMLを生成
    items.forEach(item => {
      const src = item.dataset.src;
      const caption = item.dataset.caption;
      item.innerHTML = `<img src="${src}" alt=""><p>${caption}</p>`;
    });

    // 無限ループ用のクローンを追加
    const first = items[0].cloneNode(true);
    const last = items[items.length - 1].cloneNode(true);
    carousel.appendChild(first);
    carousel.insertBefore(last, items[0]);

    // 初期位置を最初の実際のアイテムに設定
    const itemWidth = carousel.offsetWidth;
    carousel.scrollLeft = itemWidth;
    
    let currentIndex = 0;
    let isAnimating = false;

    // 指定インデックスに移動
    function moveToIndex(index) {
      if (isAnimating) return;
      isAnimating = true;
      
      carousel.scrollTo({
        left: itemWidth * (index + 1),
        behavior: 'smooth'
      });
      
      setTimeout(() => isAnimating = false, 300);
    }

    // タッチイベントでスワイプ方向のみ検出
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault(); // デフォルトのスクロールを無効化
    });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      // 最小移動距離（30px）以上でページ移動
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) { // 左スワイプ（次へ）
          currentIndex = (currentIndex + 1) % items.length;
        } else { // 右スワイプ（前へ）
          currentIndex = (currentIndex - 1 + items.length) % items.length;
        }
        moveToIndex(currentIndex);
      }
    });

    // トラックパッド/マウスホイールイベント
    let wheelTimeout;
    carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // 連続スクロールを防ぐ
      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => wheelTimeout = null, 300);
      
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      
      // 横スクロール優先、縦スクロールも横移動として扱う
      const isLeft = deltaX > 30 || (Math.abs(deltaX) < 10 && deltaY > 30);
      const isRight = deltaX < -30 || (Math.abs(deltaX) < 10 && deltaY < -30);
      
      if (isLeft) {
        currentIndex = (currentIndex + 1) % items.length;
        moveToIndex(currentIndex);
      } else if (isRight) {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        moveToIndex(currentIndex);
      }
    });

    // マウスドラッグイベント（デスクトップ用）
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
      
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = itemWidth * (items.length + 1);
      
      if (scrollLeft >= maxScroll - 5) {
        carousel.scrollLeft = itemWidth;
        currentIndex = 0;
      }
      
      if (scrollLeft <= 5) {
        carousel.scrollLeft = itemWidth * items.length;
        currentIndex = items.length - 1;
      }
    });
  });
});