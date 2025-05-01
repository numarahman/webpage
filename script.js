document.addEventListener("DOMContentLoaded", () => {
  fetch('collection.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('book-list');

      data.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';

        const title = book.Title || "Untitled";
        const author = book.Author || "Unknown Author";
        const genre = book.Genre || "Unknown Genre";
        const rating = book.Rating || "N/A";

        card.innerHTML = `
          <h2><a href="item-template.html?id=${index}">${title}</a></h2>
          <p><strong>Author:</strong> ${author}</p>
          <p><strong>Genre:</strong> ${genre}</p>
          <p><strong>Rating:</strong> ${rating}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading collection.json:", error);
      const container = document.getElementById('book-list');
      container.innerHTML = `<p style="color:red;">Failed to load book collection.</p>`;
    });
});
