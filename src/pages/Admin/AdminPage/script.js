// Constants
const API_URL = "http://localhost:4545/api";
let token = localStorage.getItem("adminToken");

// DOM Elements
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const navItems = document.querySelectorAll(".sidebar nav ul li");
const pages = document.querySelectorAll(".page");
const productsTable = document.getElementById("products-list");
const addProductForm = document.getElementById("add-product-form");
const filterButtons = document.querySelectorAll(".filter-btn");
const logoutButton = document.getElementById("logout");
const addSizeButton = document.getElementById("add-size");
const addImageButton = document.getElementById("add-image");

// Check Authentication
function checkAuth() {
  if (!token) {
    loginModal.classList.add("active");
  } else {
    loginModal.classList.remove("active");
    loadDashboardData();
  }
}

// Login Handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.user.role === "admin") {
      token = data.token;
      localStorage.setItem("adminToken", token);
      loginModal.classList.remove("active");
      loadDashboardData();
    } else {
      alert("Invalid credentials or not an admin user");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed");
  }
});

// Navigation
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.id === "logout") return;

    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const targetPage = item.getAttribute("data-page");
    pages.forEach((page) => {
      page.classList.remove("active");
      if (page.id === `${targetPage}-page`) {
        page.classList.add("active");
      }
    });

    if (targetPage === "products") {
      loadProducts();
    }
  });
});

// Load Dashboard Data
async function loadDashboardData() {
  try {
    const response = await fetch(`${API_URL}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      const totalProducts = data.products.length;
      const activeProducts = data.products.filter((p) => !p.deletedAt).length;
      const deletedProducts = data.products.filter((p) => p.deletedAt).length;

      document.getElementById("total-products").textContent = totalProducts;
      document.getElementById("active-products").textContent = activeProducts;
      document.getElementById("deleted-products").textContent = deletedProducts;
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
}

// Load Products
async function loadProducts(filter = "all") {
  try {
    const response = await fetch(`${API_URL}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      let products = data.products;
      if (filter === "active") {
        products = products.filter((p) => !p.deletedAt);
      } else if (filter === "deleted") {
        products = products.filter((p) => p.deletedAt);
      }

      productsTable.innerHTML = products
        .map(
          (product) => `
                <tr>
                    <td><img src="${product.images[0]}" alt="${
            product.name
          }" class="product-image"></td>
                    <td>${product.name}</td>
                    <td>$${product.price}</td>
                    <td>${product.type}</td>
                    <td>${product.deletedAt ? "Deleted" : "Active"}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editProduct('${
                          product._id
                        }')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${
                          product.deletedAt
                            ? `<button class="action-btn restore-btn" onclick="restoreProduct('${product._id}')">
                                <i class="fas fa-undo"></i>
                            </button>`
                            : `<button class="action-btn delete-btn" onclick="deleteProduct('${product._id}')">
                                <i class="fas fa-trash"></i>
                            </button>`
                        }
                    </td>
                </tr>
            `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Filter Products
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    loadProducts(button.getAttribute("data-filter"));
  });
});

// Add Product Form Handler
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    product: {
      name: document.getElementById("name").value,
      price: Number(document.getElementById("price").value),
      description: document.getElementById("description").value,
      type: document.getElementById("type").value,
      material: document.getElementById("material").value,
      size: Array.from(document.querySelectorAll(".size-input")).map(
        (input) => ({
          name: input.querySelector('[name="size-name"]').value,
          amount: input.querySelector('[name="size-amount"]').value,
        })
      ),
      images: Array.from(document.querySelectorAll('[name="image"]')).map(
        (input) => input.value
      ),
    },
  };

  try {
    const response = await fetch(`${API_URL}/admin/product/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Product added successfully");
      addProductForm.reset();
      // Switch to products page
      document.querySelector('[data-page="products"]').click();
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product");
  }
});

// Delete Product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`${API_URL}/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      alert("Product deleted successfully");
      loadProducts(
        document.querySelector(".filter-btn.active").getAttribute("data-filter")
      );
      loadDashboardData();
    } else {
      alert("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product");
  }
}

// Restore Product
async function restoreProduct(id) {
  try {
    const response = await fetch(`${API_URL}/admin/product/${id}/restore`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      alert("Product restored successfully");
      loadProducts(
        document.querySelector(".filter-btn.active").getAttribute("data-filter")
      );
      loadDashboardData();
    } else {
      alert("Failed to restore product");
    }
  } catch (error) {
    console.error("Error restoring product:", error);
    alert("Failed to restore product");
  }
}

// Edit Product
// Edit Product Modal Elements
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-product-form");
const editAddSizeButton = document.getElementById("edit-add-size");
const editAddImageButton = document.getElementById("edit-add-image");

// Edit Product
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      const product = data.product;

      // Fill form with product data
      document.getElementById("edit-product-id").value = product._id;
      document.getElementById("edit-name").value = product.name;
      document.getElementById("edit-price").value = product.price;
      document.getElementById("edit-description").value = product.description;
      document.getElementById("edit-type").value = product.type;
      document.getElementById("edit-material").value = product.material;

      // Load sizes
      const sizesContainer = document.getElementById("edit-sizes-container");
      sizesContainer.innerHTML = product.size
        .map(
          (size) => `
                <div class="size-input">
                    <input type="text" name="size-name" value="${size.name}" required>
                    <input type="number" name="size-amount" value="${size.amount}" required>
                    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `
        )
        .join("");

      // Load images
      const imagesContainer = document.getElementById("edit-images-container");
      imagesContainer.innerHTML = product.images
        .map(
          (image) => `
                <div class="image-input">
                    <input type="url" name="image" value="${image}" required>
                    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `
        )
        .join("");

      // Show modal
      editModal.classList.add("active");
    }
  } catch (error) {
    console.error("Error loading product:", error);
    alert("Failed to load product");
  }
}

// Close Edit Modal
function closeEditModal() {
  editModal.classList.remove("active");
  editForm.reset();
}

// Add Size in Edit Modal
editAddSizeButton.addEventListener("click", () => {
  const sizeInput = document.createElement("div");
  sizeInput.className = "size-input";
  sizeInput.innerHTML = `
        <input type="text" name="size-name" placeholder="Size (e.g. S)" required>
        <input type="number" name="size-amount" placeholder="Amount" required>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  document.getElementById("edit-sizes-container").appendChild(sizeInput);
});

// Add Image in Edit Modal
editAddImageButton.addEventListener("click", () => {
  const imageInput = document.createElement("div");
  imageInput.className = "image-input";
  imageInput.innerHTML = `
        <input type="url" name="image" placeholder="Image URL" required>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  document.getElementById("edit-images-container").appendChild(imageInput);
});

// Handle Edit Form Submit
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productId = document.getElementById("edit-product-id").value;

  const formData = {
    product: {
      name: document.getElementById("edit-name").value,
      price: Number(document.getElementById("edit-price").value),
      description: document.getElementById("edit-description").value,
      type: document.getElementById("edit-type").value,
      material: document.getElementById("edit-material").value,
      size: Array.from(
        document.querySelectorAll("#edit-sizes-container .size-input")
      ).map((input) => ({
        name: input.querySelector('[name="size-name"]').value,
        amount: input.querySelector('[name="size-amount"]').value,
      })),
      images: Array.from(
        document.querySelectorAll('#edit-images-container [name="image"]')
      ).map((input) => input.value),
    },
  };

  try {
    const response = await fetch(`${API_URL}/admin/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Product updated successfully");
      closeEditModal();
      loadProducts(
        document.querySelector(".filter-btn.active").getAttribute("data-filter")
      );
    } else {
      alert("Failed to update product");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product");
  }
});
// Add Size Input
addSizeButton.addEventListener("click", () => {
  const sizeInput = document.createElement("div");
  sizeInput.className = "size-input";
  sizeInput.innerHTML = `
        <input type="text" name="size-name" placeholder="Size (e.g. S)" required>
        <input type="number" name="size-amount" placeholder="Amount" required>
        <button type="button" class="remove-size" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  document
    .querySelector(".sizes-container")
    .insertBefore(sizeInput, addSizeButton);
});

// Add Image Input
addImageButton.addEventListener("click", () => {
  const imageInput = document.createElement("div");
  imageInput.className = "image-input";
  imageInput.innerHTML = `
        <input type="url" name="image" placeholder="Image URL" required>
        <button type="button" class="remove-image" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
  document
    .querySelector(".images-container")
    .insertBefore(imageInput, addImageButton);
});

// Logout Handler
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  token = null;
  checkAuth();
});

// Initial Load
checkAuth();
