const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('collection.json')
  .then(response => response.json())
  .then(data => {
    const book = data[id];

    document.title = book.Title;
    document.getElementById('item-title').textContent = book.Title;
    document.getElementById('item-author').textContent = book.Author;
    document.getElementById('item-genre').textContent = book.Genre;
    document.getElementById('item-rating').textContent = book.Rating;
    document.getElementById('item-format').textContent = book.Format;

    // JSON-LD Metadata
    const metadata = {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": book.Title,
      "author": book.Author,
      "genre": book.Genre,
      "bookFormat": book.Format,
      "aggregateRating": book.Rating !== "N/A" ? { "ratingValue": book.Rating } : undefined,
      "isPartOfSeries": book.apart_of_series === "Yes",
      "readStatus": book.has_been_read
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(metadata);
    document.head.appendChild(script);
  });
