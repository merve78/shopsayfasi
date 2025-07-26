
    const categoryButtons = document.getElementById('category-buttons');
    const subCategoryButtons = document.getElementById('sub-categories');
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');

    let allProducts = [];
    let cart = [];

    async function fetchCategories() {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await res.json();

      // “Tüm Ürünler” butonu
      const allBtn = createButton('Tüm Ürünler');
      allBtn.addEventListener('click', () => displayProducts(allProducts));
      categoryButtons.appendChild(allBtn);

      // “Ürünlere Göre Filtrele” butonu
      const filterBtn = createButton('Ürünlere Göre Filtrele');
      filterBtn.addEventListener('click', () => {
        subCategoryButtons.classList.toggle('hidden');
      });
      categoryButtons.appendChild(filterBtn);

      // Alt kategori listesini oluştur (li olarak)
      categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        li.className = 'cursor-pointer hover:text-blue-600 transition hover:underline px-2 py-1 rounded hover:bg-gray-100';
        li.addEventListener('click', () => {
          const filtered = allProducts.filter(p => p.category === category);
          displayProducts(filtered);
          subCategoryButtons.classList.add('hidden');
        });
        subCategoryButtons.querySelector('ul').appendChild(li);
      });
    }

    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products');
      allProducts = await res.json();
      displayProducts(allProducts);
    }

    function displayProducts(products) {
      productList.innerHTML = '';

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer';

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="h-40 mx-auto object-contain" />
          <h2 class="mt-2 font-bold text-black text-sm">${product.title}</h2>
          <p class="text-green-600 font-semibold text-lg">$${product.price}</p>
          <button class="mt-2 bg-white border-2  border-[#a39cdf] text-[#a39cdf] text-shadow-md font-semibold px-3 py-1 rounded add-to-cart">
            Sepete Ekle
          </button>
        `;

        card.addEventListener('click', () => showProductDetail(product));
        card.querySelector('.add-to-cart').addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart(product);
        });

        productList.appendChild(card);
      });
    }

    function createButton(name) {
      const btn = document.createElement('button');
      btn.textContent = name;
      btn.className = 'px-4 py-2 bg-[#f4d00a] text-black rounded  transition';
      return btn;
    }

    function addToCart(product) {
      cart.push(product);
      alert(`"${product.title}" sepete eklendi!`);
    }

    function showProductDetail(product) {
      const modal = document.getElementById('modal');
      const content = document.getElementById('modal-content');

      content.innerHTML = `
        <img src="${product.image}" class="h-40 mx-auto object-contain" />
        <h2 class="text-xl font-bold mt-4">${product.title}</h2>
        <p class="text-green-600 font-semibold my-2">$${product.price}</p>
        <p class="text-gray-700">${product.description}</p>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
    }

    searchInput.addEventListener('input', e => {
      const searchText = e.target.value.toLowerCase();
      const filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchText));
      displayProducts(filtered);
    });

    document.addEventListener('DOMContentLoaded', () => {
      fetchCategories();
      fetchProducts();
    });

    const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

function updateCartUI() {
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center border-b pb-2';

    itemDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-contain" />
        <div class="text-sm">
          <p class="font-semibold text-[#802c6e]">${item.title}</p>
          <p class="text-green-600">$${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button onclick="removeFromCart(${index})" class="text-red-600 hover:underline text-sm">Sil</button>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotal.textContent = `Toplam: $${total.toFixed(2)}`;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

cartButton.addEventListener('click', () => {
  updateCartUI();
  cartModal.classList.remove('hidden');
  cartModal.classList.add('flex');
});

function closeCart() {
  cartModal.classList.add('hidden');
}

