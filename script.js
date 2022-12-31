//-----------------------
// -----VISUALIZAÇÃO-----
//-----------------------

const movies = document.querySelector(".movies");
let movieCounter = 0;
let fetchLink = "";

function fetchMovies(queryParam = "") {
  if (!queryParam) {
    fetchLink =
      "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false";
  } else {
    fetchLink = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${queryParam}`;
  }

  fetch(`${fetchLink}`)
    .then((resposta) => resposta.json())
    .then((dados) => {
      dados.results.forEach((element) => {
        const movie = document.createElement("div");
        movie.style.backgroundImage = `url(${element.poster_path})`;
        movie.id = element.id;
        if (movieCounter < 5) {
          movie.classList.add("movie", "page0");
        } else if (movieCounter >= 5 && movieCounter < 10) {
          movie.classList.add("movie", "page1", "hidden");
        } else if (movieCounter >= 10 && movieCounter < 15) {
          movie.classList.add("movie", "page2", "hidden");
        } else {
          movie.classList.add("movie", "page3", "hidden");
        }

        const movie__info = document.createElement("div");
        movie__info.classList.add("movie__info");

        const movie__title = document.createElement("span");
        movie__title.classList.add("movie__title");
        movie__title.textContent = element.title;

        const movie__rating = document.createElement("span");
        movie__rating.classList.add("movie__rating");
        const star = document.createElement("img");
        star.src = "./assets/estrela.svg";
        star.alt = "Estrela";
        movie__rating.append(star);
        movie__rating.innerHTML += element.vote_average;

        movie__info.append(movie__title, movie__rating);
        movie.append(movie__info);
        movies.append(movie);
        movieCounter++;
      });
      movieCounter = 0;
      pageCounter = 0;
    });
}

fetchMovies();

//--------------------
//------PAGINAÇÃO-----
//--------------------

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let pageCounter = 0;

btnPrev.addEventListener("click", () => {
  const page0 = document.querySelectorAll(".page0");
  const page1 = document.querySelectorAll(".page1");
  const page2 = document.querySelectorAll(".page2");
  const page3 = document.querySelectorAll(".page3");
  if (pageCounter == 0) {
    pageCounter = 3;
    page0.forEach((element) => {
      element.classList.add("hidden");
    });
    page3.forEach((element) => {
      element.classList.remove("hidden");
    });
  } else if (pageCounter == 3) {
    page3.forEach((element) => {
      element.classList.add("hidden");
    });
    page2.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter--;
  } else if (pageCounter == 2) {
    page2.forEach((element) => {
      element.classList.add("hidden");
    });
    page1.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter--;
  } else {
    page1.forEach((element) => {
      element.classList.add("hidden");
    });
    page0.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter--;
  }
  console.log(pageCounter);
});

btnNext.addEventListener("click", () => {
  const page0 = document.querySelectorAll(".page0");
  const page1 = document.querySelectorAll(".page1");
  const page2 = document.querySelectorAll(".page2");
  const page3 = document.querySelectorAll(".page3");
  if (pageCounter == 3) {
    pageCounter = 0;
    page3.forEach((element) => {
      element.classList.add("hidden");
    });
    page0.forEach((element) => {
      element.classList.remove("hidden");
    });
  } else if (pageCounter == 0) {
    page0.forEach((element) => {
      element.classList.add("hidden");
    });
    page1.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter++;
  } else if (pageCounter == 1) {
    page1.forEach((element) => {
      element.classList.add("hidden");
    });
    page2.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter++;
  } else {
    page2.forEach((element) => {
      element.classList.add("hidden");
    });
    page3.forEach((element) => {
      element.classList.remove("hidden");
    });
    pageCounter++;
  }
  console.log(pageCounter);
});

//----------------
//------BUSCA-----
//----------------

const input = document.querySelector(".input");
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    movies.innerHTML = "";
    if (event.target.value) {
      const queryParam = event.target.value;
      fetchMovies(queryParam);
    } else {
      fetchMovies();
    }
    event.target.value = "";
  }
});

//-----------------------
//------FILME DO DIA-----
//-----------------------

const highlight__video = document.querySelector(".highlight__video");
const highlight__title = document.querySelector(".highlight__title");
const highlight__rating = document.querySelector(".highlight__rating");
const highlight__genres = document.querySelector(".highlight__genres");
const highlight__launch = document.querySelector(".highlight__launch");
const highlight__description = document.querySelector(
  ".highlight__description"
);
const highlight__videolink = document.querySelector(".highlight__video-link");

fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
)
  .then((resposta) => resposta.json())
  .then((dados) => {
    highlight__video.style.backgroundImage = `url(${dados.backdrop_path})`;
    highlight__title.textContent = dados.title;
    highlight__rating.textContent = dados.vote_average;

    const genres = dados.genres.map((item) => item.name).join(", ");
    highlight__genres.textContent = genres;
    highlight__description.textContent = dados.overview;

    const date = new Date(dados.release_date);
    const options = { month: "long", year: "numeric", day: "numeric" };
    highlight__launch.textContent = date.toLocaleDateString("pt-BR", options);
  });

fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
)
  .then((resposta) => resposta.json())
  .then((dados) => {
    const key = dados.results[0].key;
    highlight__videolink.href = `https://www.youtube.com/watch?v=${key}`;
  });

//----------------
//------MODAL-----
//----------------

movies.addEventListener("click", (event) => {
  if (event.target.classList[0] == "movie") {
    openModal(event.target.id);
  }
});

const modal = document.querySelector(".modal");
const modal__container = document.querySelector(".modal__container");
const modal__close = document.querySelector(".modal__close");
const modal__title = document.querySelector(".modal__title");
const modal__img = document.querySelector(".modal__img");
const modal__description = document.querySelector(".modal__description");
const modal__genres = document.querySelector(".modal__genres");
const modal__average = document.querySelector(".modal__average");

function openModal(id) {
  modal.classList.remove("hidden");
  fetch(
    `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`
  )
    .then((resposta) => resposta.json())
    .then((dados) => {
      modal__title.textContent = dados.title;
      modal__img.src = dados.backdrop_path;
      modal__description.textContent = dados.overview;
      modal__average.textContent = dados.vote_average;
      dados.genres.forEach((element) => {
        const genre = document.createElement("span");
        genre.classList.add("modal__genre");
        genre.textContent = element.name;
        modal__genres.append(genre);
      });
    });
}

modal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal__genres.innerHTML = "";
});

modal__container.addEventListener("click", (event) => {
  event.stopPropagation();
});

//--------------------
//------MODO DARK-----
//--------------------

const btnTheme = document.querySelector(".btn-theme");
const body = document.querySelector("body");
let lightMode = true;

btnTheme.addEventListener("click", () => {
  body.style.setProperty("--background-color", lightMode ? "#242424" : "#fff");
  body.style.setProperty(
    "--input-border-color",
    lightMode ? "#fff" : "#979797"
  );
  body.style.setProperty("--color", lightMode ? "#fff" : "#000");
  body.style.setProperty(
    "--shadow-color",
    lightMode
      ? "0px 4px 8px rgba(255, 255, 255, 0.15)"
      : "0px 4px 8px rgba(0, 0, 0, 0.15)"
  );
  body.style.setProperty(
    "--highlight-background",
    lightMode ? "#454545" : "#fff"
  );
  body.style.setProperty(
    "--highlight-color",
    lightMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
  );
  body.style.setProperty(
    "--highlight-description",
    lightMode ? "#fff" : "#000"
  );

  btnPrev.src = lightMode
    ? "./assets/seta-esquerda-branca.svg"
    : "./assets/seta-esquerda-preta.svg";
  btnNext.src = lightMode
    ? "./assets/seta-direita-branca.svg"
    : "./assets/seta-direita-preta.svg";

  btnTheme.src = lightMode
    ? "./assets/dark-mode.svg"
    : "./assets/light-mode.svg";

  lightMode = !lightMode;
});
