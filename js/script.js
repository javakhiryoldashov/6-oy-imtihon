const adminForm = document.getElementById('adminForm');
const productList = document.getElementById('productList');
const logoutBtn = document.getElementById('logoutBtn');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const titleInput = document.getElementById('productTitle');
const priceInput = document.getElementById('productPrice');
const descriptionInput = document.getElementById('productDescription');
let products = [];
let editId = null;

adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const price = priceInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && price && description) {
    if (!isNaN(price) && parseFloat(price) >= 0) {
      if (editId !== null) {
        const index = products.findIndex(product => product.id === editId);
        if (index !== -1) {
          products[index] = { id: editId, title, price, description };
        }
        editId = null;
        updateBtn.style.display = 'none';
        addBtn.style.display = 'block';
      } else {
        const product = { id: Date.now(), title, price, description };
        products.push(product);
      }

      displayProducts();
      adminForm.reset();
    } else {
      alert('Iltimos, to\'g\'ri narx kiriting.');
    }
  } else {
    alert('Iltimos, barcha maydonlarni to\'ldiring.');
  }
});

logoutBtn.addEventListener('click', () => {
  const confirmLogout = confirm('Rostan chiqishni hohlaysizmi?');
  if (confirmLogout) {
    window.location.href = 'index.html';
  }
});



function displayProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.toggle('product-card');
    productCard.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <button class="delete-btn" data-id="${product.id}">Delete</button>
      <button class="edit-btn" data-id="${product.id}">Edit</button>
    `;
    productList.appendChild(productCard);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      products = products.filter(product => product.id != id);
      displayProducts();
    });
  });

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const product = products.find(product => product.id === parseInt(id));
      if (product) {
        titleInput.value = product.title;
        priceInput.value = product.price;
        descriptionInput.value = product.description;
        editId = product.id;
        updateBtn.style.display = 'block';
        addBtn.style.display = 'none';
      }
    });
  });
}

displayProducts();

