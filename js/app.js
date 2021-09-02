document.getElementById('books-number').style.display = 'none';
document.getElementById('error-message').style.display = 'none';

//functin for null input field
const errorMessage = () => {
    document.getElementById('books-number').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}


const loadData = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if (searchText === '') {

        errorMessage();
    }
    else {
        //hiding error message 
        document.getElementById('error-message').style.display = 'none';

        //hiding books found result
        document.getElementById('books-number').style.display = 'none';

        //clear search result
        document.getElementById('books-container').textContent = '';

        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.docs))
    }
}

const displayData = books => {

    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';


    if (books === null) {

        errorMessage();
    }

    else {
        //hiding error message
        document.getElementById('error-message').style.display = 'none';

        //display fonuded result of books-numbers 
        document.getElementById('books-number').style.display = 'block';

        //display searched result
        document.getElementById('books-number').innerText = `Books Foud: ${books.length}`

        books.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
            <div class="border border-2 h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100" alt="no image found">
                    <div class="overflow-hidden">
                        <h5>Books Name:<span class="fw-bold overflow-hidden">${book.title.slice(0, 50)}</span></h5>
                        <p>Author Name:<span class="fw-bold overflow-hidden">${book.author_name ? book.author_name : 'Author name not found'}</span></p>
                        <p>Publisher Name:<span class="fw-bold overflow-hidden">${book.publisher ? book.publisher : 'Publisher name not found'}</span></p>
                        <p>First Published Year:<span class="fw-bold overflow-hidden">${book.first_publish_year ? book.first_publish_year : 'First publish year not found'}</span></p>
                    </div>
            </div>
            
            `;
            booksContainer.appendChild(div);
        });


    }
}