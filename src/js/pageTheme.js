const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');
const slider = document.querySelector('.glide__slides');
const footer = document.querySelector('.footer');

const handleCheckbox = () => {
  document.body.classList.toggle('dark');
  droplist.classList.toggle('dark');
  slider.classList.toggle('dark');
  footer.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme', 'dark');
  }
};

if (localStorage.getItem('theme')) {
  document.body.classList.toggle('dark');
  droplist.classList.toggle('dark');
  slider.classList.toggle('dark');
  footer.classList.toggle('dark');
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);
