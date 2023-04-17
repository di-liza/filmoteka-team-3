const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');
const slider = document.querySelector('.glide__slides');
console.log(slider);

const handleCheckbox = () => {
  document.body.classList.toggle('dark');
  droplist.classList.toggle('dark');
  slider.classList.toggle('dark');
  if (
    document.body.classList.contains('dark') &&
    droplist.classList.contains('dark') &&
    slider.classList.contains('dark')
  ) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme', 'dark');
  }
};

if (localStorage.getItem('theme')) {
  droplist.classList.toggle('dark');
  document.body.classList.toggle('dark');
  slider.classList.toggle('dark');
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);
