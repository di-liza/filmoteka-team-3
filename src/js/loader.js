export function showLoader() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('hidden');
}

export function hideLoader() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('hidden');
}
