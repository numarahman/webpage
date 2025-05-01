fetch('collection.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('book-list');
    data.forEach((book, index) => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h2><a href="item-template.html?id=${index}">${book.Title}</a></h2>
        <p><strong>Author:</strong> ${book.Author}</p>
        <p><strong>Genre:</strong> ${book.Genre}</p>
        <p><strong>Rating:</strong> ${book.Rating}</p>
      `;
      container.appendChild(card);
