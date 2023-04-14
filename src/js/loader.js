const spinner = document.querySelector('.spinner');
window.addEventListener('load', () => {
  spinner.classList.add('hidden');
});

// Показываем спиннер при начале загрузки контента
document.addEventListener('DOMContentLoaded', () => {
  spinner.classList.remove('hidden');
});

// Скрываем спиннер при окончании загрузки контента
window.addEventListener('DOMContentLoaded', () => {
  spinner.classList.add('hidden');
});

// // на ссылки
// const links = document.querySelectorAll('a');
// for (const link of links) {
//   link.addEventListener('click', () => {
//     spinner.classList.remove('hidden');
//   });
// }

// пагинациия
const paginationLinks = document.querySelectorAll('#pagination');
for (const link of paginationLinks) {
  link.addEventListener('click', async (event) => {
    event.preventDefault(); 
    spinner.classList.remove('hidden');
    const url = event.target.href;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error Load');
      }
      const data = await response.json();
      
      updatePage(data);
    } catch (error) {
      console.error(error);
    } finally {
      spinner.classList.add('hidden');
    }
  });
}



// модалка лоадер
const modalLinks = document.querySelectorAll('.movie-collection');

for (const link of modalLinks) {
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    spinner.classList.remove('hidden');
    const url = event.target.href;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error Load');
      }
      const data = await response.json();
      updateModal(data);
    } catch (error) {
      console.error(error);
    } finally {
      spinner.classList.add('hidden');
    }
  });
}
// поиск лоадер








