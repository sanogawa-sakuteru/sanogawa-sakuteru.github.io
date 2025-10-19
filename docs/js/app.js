// モバイルメニューの開閉
const menuBtn = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 年号の自動更新
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// CTAフォームの簡易ハンドリング（デモ）
const email = document.getElementById('email');
const ctaMsg = document.getElementById('ctaMsg');
if (email && ctaMsg) {
  email.form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = email.value.trim();
    if (!val) {
      ctaMsg.textContent = 'メールアドレスを入力してください。';
      ctaMsg.className = 'mt-2 text-sm text-red-600';
      return;
    }
    // ここで実際のPOST処理などを呼び出し
    ctaMsg.textContent = 'ありがとうございます！ご登録のメール宛にご案内をお送りしました。';
    ctaMsg.className = 'mt-2 text-sm text-green-600';
    email.value = '';
  });
}

// アンカーのスムーズスクロール（純JS）
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // モバイルメニューは閉じる
    if (!mobileMenu?.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
});
