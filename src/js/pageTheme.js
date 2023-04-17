const checkbox = document.querySelector('.checkbox');
const droplist = document.querySelector('.movie-droplist');

const handleCheckbox = () => {
  document.body.classList.toggle('dark');
  droplist.classList.toggle('dark');
  if (
    document.body.classList.contains('dark') &&
    droplist.classList.contains('dark')
  ) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme', 'dark');
  }
};

if (localStorage.getItem('theme')) {
  droplist.classList.toggle('dark');
  document.body.classList.toggle('dark');
  checkbox.checked = true;
}

checkbox.addEventListener('change', handleCheckbox);
