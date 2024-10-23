const apiUrl = 'https://fakestoreapi.com/products';
let localCreatedProducts = [];

function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const products = JSON.parse(this.responseText);
            let output = '';

            products.forEach(product => {
                output += `<li data-id="${product.id}">${product.title} - $${product.price}</li>`;
            });

            localCreatedProducts.forEach(product => {
                output += `<li data-id="${product.id}">${product.title} - $${product.price}</li>`;
            });

            document.getElementById('productList').innerHTML = output;
        }
    };
    xhr.onerror = function () {
        alert('Request Error...');
    };
    xhr.send();
}

document.getElementById('createProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('createTitle').value;
    const price = document.getElementById('createPrice').value;
    const description = document.getElementById('createDescription').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
        if (this.status === 200 || this.status === 201) {
            const newProduct = JSON.parse(this.responseText);
            alert('Product Created');

            let productList = document.getElementById('productList');
            productList.innerHTML += `<li data-id="${newProduct.id}">${newProduct.title} - $${newProduct.price}</li>`;
            localCreatedProducts.push(newProduct);

            document.getElementById('createTitle').value = '';
            document.getElementById('createPrice').value = '';
            document.getElementById('createDescription').value = '';
        }
    };
    xhr.onerror = function () {
        alert('Request Error...');
    };

    const product = { title, price, description };
    xhr.send(JSON.stringify(product));
});

document.getElementById('updateProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('updateId').value;
    const title = document.getElementById('updateTitle').value;
    const price = document.getElementById('updatePrice').value;
    const description = document.getElementById('updateDescription').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
        if (this.status === 200) {
            const updatedProduct = JSON.parse(this.responseText);
            alert('Product Updated');

            const localProductIndex = localCreatedProducts.findIndex(product => product.id == id);
            if (localProductIndex !== -1) {
                localCreatedProducts[localProductIndex] = updatedProduct;
            }

            fetchProducts();

            document.getElementById('updateId').value = '';
            document.getElementById('updateTitle').value = '';
            document.getElementById('updatePrice').value = '';
            document.getElementById('updateDescription').value = '';
        }
    };
    xhr.onerror = function () {
        alert('Request Error...');
    };

    const updatedProductData = { title, price, description };
    xhr.send(JSON.stringify(updatedProductData));
});

document.getElementById('deleteButton').addEventListener('click', function () {
    const id = document.getElementById('deleteId').value;

    const localProductIndex = localCreatedProducts.findIndex(product => product.id == id);
    const fetchedProductElements = document.querySelectorAll('#productList li[data-id]');
    const existsInFetchedProducts = Array.from(fetchedProductElements).some(el => el.getAttribute('data-id') === id);

    if (localProductIndex === -1 && !existsInFetchedProducts) {
        alert('Product not found. It may not exist in the list.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${apiUrl}/${id}`, true);
    xhr.onload = function () {
        if (this.status === 200 || this.status === 204) {
            alert('Product Deleted');

            if (localProductIndex !== -1) {
                localCreatedProducts.splice(localProductIndex, 1);
            }

            fetchProducts();
            document.getElementById('deleteId').value = '';
        } else if (this.status === 404) {
            alert('Product not found on server. It may not exist.');
        } else {
            alert('Error deleting the product. There may be a server issue.');
        }
    };
    xhr.onerror = function () {
        alert('Request Error...');
    };

    xhr.send();
});
