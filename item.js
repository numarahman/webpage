const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('collection.json')
  .then(response => response.json())
  .then(data => {
    const book = data[id];
    const container = document.getElementById('book-details');
    document.title = book.Title;

    const metadata = {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": book.Title,
      "author": book.Author,
      "genre": book.Genre,
      "bookFormat": book.Fomat,
      "aggregateRating": book.Rating !== "N/A" ? { "ratingValue": book.Rating } : undefined,
      "isPartOfSeries": book.apart_of_series === "Yes",
      "readStatus": book.has_been_read
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(metadata);
    document.head.appendChild(script);

    container.innerHTML = `
      <h1>${book.Title}</h1>
      <p><strong>Author:</strong> ${book.Author}</p>
      <p><strong>Genre:</strong> ${book.Genre}</p>
      <p><strong>Rating:</strong> ${book.Rating}</p>
      <p><strong>Format:</strong> ${book.Fomat}</p>
      <p><strong>Read:</strong> ${book.has_been_read}</p>
      <p><strong>Part of Series:</strong> ${book.apart_of_series}</p>
      <p><strong>Series Number:</strong> ${book.series_number}</p>
    `;
  });
