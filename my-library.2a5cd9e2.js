var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var l={id:e,exports:{}};return t[e]=l,o.call(l.exports,l,l.exports),l.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("6mrnU"),o("6mrnU"),o("31u3U");var l=o("ezyJp");const i=document.querySelector(".movie-collection"),c={watched:document.querySelector(".btn__library-watch"),queue:document.querySelector(".btn__library-queue")};function r(e){i.innerHTML=e.map((({poster_path:e,genres:t,title:n,release_date:o,id:i})=>{let c;return c=e?`https://image.tmdb.org/t/p/w500/${e}`:"https://otv.one/uploads/default_image/thumbnail.jpg",`  <li class="movie-collection__item" data-id="${i}">\n   <img class="movie-collection__poster" src="${c}" alt="${n}" />\n   <h2 class="movie-collection__title">${n}</h2>\n   <div class="movie-collection__discription">\n     <p class="movie-collection__genre">${(0,l.getGenres)(t)}</p>\n     <p class="movie-collection__year">${o.slice(0,4)}</p>\n   </div>\n   <button class="movie-collection__button" type="button"><span class="movie-collection__title">Trailer</span></button>\n</li>`})).join("")}c.watched.addEventListener("click",(function(){const e=localStorage.getItem("watched");e?r(JSON.parse(e)):i.innerHTML=""})),c.queue.addEventListener("click",(function(){const e=localStorage.getItem("queue");e?r(JSON.parse(e)):i.innerHTML=""})),console.log("qweqwe");
//# sourceMappingURL=my-library.2a5cd9e2.js.map
