const getBooks = function () {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Errore')
            }
        })
        .then(data => {
            console.log(data)
            document.getElementById('placeholder').classList.add('d-none')
            data.forEach((book) => {
                console.log('ciao')
                let newCol = document.createElement('div')
                newCol.classList.add('col')
                newCol.innerHTML = `
                <div class="card">
        <img src="${book.img}" class="card-img-top img-fluid" alt="book cover">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text m-0">
              <span class="h6"> Category:</span> ${book.category} 
          </p>
          <p class="card-text">
             <span class="h6"> Description:</span> Placeholder text description
          </p>
          <p class="card-text">${book.price}€</p>
          <div class="d-flex flex-wrap">
            <button class="btn btn-success buy">Compra ora</button>
            <button class="btn btn-danger hide">Scarta</button>
          </div>
        </div>
      </div>
                `
                document.getElementById('book-container').appendChild(newCol)
            })
            let allHideBtns = document.querySelectorAll('button.hide')
            allHideBtns.forEach(btn => {
                btn.addEventListener('click', function (e) {
                    const card = e.target.parentNode.parentElement.parentElement
                    card.classList.add('d-none')
                })
            })
            let allBuyBtns = document.querySelectorAll('button.buy')
            const shoppingCart = []
            allBuyBtns.forEach((btn, i) => {
                btn.addEventListener('click', function () {
                    const bookToAdd = data[i]
                    shoppingCart.push(bookToAdd)
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
                    populateShoppingCart()
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const populateShoppingCart = function () {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    document.getElementById('row-cart').innerHTML = ''
    if (shoppingCart.length > 0) {
        document.getElementById('cart-div').classList.remove('d-none')
        shoppingCart.forEach((el, i) => {
            let newCol = document.createElement('div')
            newCol.classList.add('col-3')
            newCol.innerHTML = `
                <div class="card">
        <img src="${el.img}" class="card-img-top img-fluid" alt="book cover">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.price}€</p>
          <div class="d-flex flex-wrap">
            <button class="btn btn-danger delete-from-cart">Rimuovi dal carrello</button>
          </div>
        </div>
      </div>
                `
            document.getElementById('row-cart').appendChild(newCol)
        })
        const deleteCartBtns = document.querySelectorAll('button.delete-from-cart')

        deleteCartBtns.forEach((btn, i) => {
            btn.addEventListener('click', function () {
                shoppingCart.splice(i,1)
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
                populateShoppingCart()
            })
        })

    }

}

getBooks()
populateShoppingCart()