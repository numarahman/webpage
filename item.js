const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('collection.json')
  .then(response => response.json())
  .then(data => {
    const book = data[id];
    if (!book) {
      document.body.innerHTML = "<p style='color:red;'>Book not found.</p>";
      return;
    }

    document.title = book.Title;
    document.getElementById('item-title').textContent = book.Title;
    document.getElementById('item-author').textContent = book.Author;
    document.getElementById('item-genre').textContent = book.Genre;
    document.getElementById('item-rating').textContent = book.Rating;
    document.getElementById('item-format').textContent = book.Format;
    document.getElementById('item-read').textContent = book.has_been_read;
    document.getElementById('item-series').textContent = book.apart_of_series;
    document.getElementById('item-series-num').textContent = book.series_number;

    // Add JSON-LD metadata
    const metadata = {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": book.Title,
      "author": book.Author,
      "genre": book.Genre,
      "bookFormat": book.Format,
      "isPartOfSeries": book.apart_of_series === "Yes",
      "position": book.series_number,
      "aggregateRating": book.Rating !== "N/A" ? {
        "@type": "AggregateRating",
        "ratingValue": book.Rating
      } : undefined
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(metadata);
    document.head.appendChild(script);
  })
  .catch(err => {
    document.body.innerHTML = "<p style='color:red;'>Error loading book data.</p>";
    console.error(err);
  });
