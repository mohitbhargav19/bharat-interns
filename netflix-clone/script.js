const apiKey = "4757fa8b0f6040f9da5b5eb88c837983"; // Replace with your actual TMDB API key

async function fetchRandomMovie() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const data = await response.json();
  
    // Choose a random movie from the results
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
  
    // Update the banner content
    document.getElementById("banner-title").textContent = randomMovie.title;
    document.getElementById("banner-description").textContent = randomMovie.overview;
  
    // Set the banner image
    const bannerImage = document.getElementById("banner");
    bannerImage.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path})`;
  
    // Fetch recommended movies
    fetchRecommendedMovies(randomMovie.genre_ids);
  }
  
  async function fetchRecommendedMovies(genreIds) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIds.join(",")}`);
    const data = await response.json();
  
    // Create HTML elements for recommended movies
    const recommendedMoviesDiv = document.getElementById("headrow");
    data.results.forEach(movie => {
      const row = document.createElement("div");
      row.classList.add("row");
      row.innerHTML = `
        <h2 class="row-title">${movie.title}</h2>
        <div class="row-poster" style="background-image: url(https://image.tmdb.org/t/p/w500/${movie.poster_path})"></div>
      `;
      recommendedMoviesDiv.appendChild(row);
    });
  }
  
  fetchRandomMovie();