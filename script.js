async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;

    if (!title || !author || !genre || !year) {
        alert("⚠️ Please fill in all fields!");
        return;
    }

    const response = await fetch('http://localhost:5000/addBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre, year })
    });

    if (response.ok) {
        alert("📖 Book Added Successfully!");
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("year").value = "";
        displayBooks();
    } else {
        alert("❌ Error Adding Book");
    }
}

async function displayBooks() {
    const response = await fetch('http://localhost:5000/getBooks');
    const books = await response.json();
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        bookList.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
            </tr>`;
    });
}

async function filterBooks() {
    const search = document.getElementById("search").value.toLowerCase();
    const response = await fetch('http://localhost:5000/getBooks');
    const books = await response.json();
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.filter(book => 
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.genre.toLowerCase().includes(search)
    ).forEach(book => {
        bookList.innerHTML += `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
        </tr>`;
    });
}

displayBooks();
