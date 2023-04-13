// // Функция для прокрутки к началу страницы
// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   });
// }

// // Обработчик клика по кнопке "Наверх"
// const btnTop = document.querySelector('#toTop');
// btnTop.addEventListener('click', function(event) {
//   event.preventDefault();
//   scrollToTop();
// });

// // Обработчик скролла страницы
// window.addEventListener('scroll', function () {
//   // Прокручиваемая часть страницы
//   const scrollableArea = document.documentElement.scrollHeight - window.innerHeight;
//   // Количество пикселей, на которое прокручена страница
//   const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

//   // Показываем или скрываем кнопку "Наверх" в зависимости от положения прокрутки
//   if (scrollPosition > 100) {
//     btnTop.classList.add('show__button');
//   } else {
//     btnTop.classList.remove('show__button');
//   }

//   // Обработчик события скролла для пагинации
//   const paginationLinks = document.querySelectorAll('.pagination-link');
//   paginationLinks.forEach(link => {
//     const targetId = link.getAttribute('href');
//     const target = document.querySelector(targetId);
//     if (target.offsetTop <= scrollPosition && target.offsetTop + target.offsetHeight > scrollPosition) {
//       link.classList.add('active');
//     } else {
//       link.classList.remove('active');
//     }
//   });
// });

// // Обработчик клика по ссылкам пагинации
// function handlePaginationClick(event) {
//   event.preventDefault();

//   // Изменяем классы ссылок
//   const links = document.querySelectorAll('.pagination-link');
//   links.forEach(link => {
//     link.classList.remove('active');
//   });
//   this.classList.add('active');

//   // Получаем идентификатор участка страницы, на который нужно переместиться
//   const targetId = this.getAttribute('href');

//   // Перемещаем страницу к нужному участку
//   const target = document.querySelector(targetId);
//   window.scrollTo({
//     top: target.offsetTop,
//     behavior: 'smooth'
//   });
// }

// // Добавляем обработчик события клика на каждую ссылку пагинации
// const links = document.querySelectorAll('.pagination-link');
// links.forEach(link => {
//   link.addEventListener('click', handlePaginationClick);
// });

// // Обработчик события window.onload
// window.onload = function () {
//   setTimeout(function () {
//     const overlay = document.querySelector('.overlay');
//     overlay.style.display = 'none';
//   }, 500);
// };