import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
const API_URL = 'http://localhost:4545/api';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, active: 0, deleted: 0 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [addForm, setAddForm] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    material: '',
    size: [{ name: '', amount: '' }],
    images: [''],
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:4545/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success && data.user && data.user.role === 'admin') {
        // Thêm dòng này để lưu token vào localStorage
        localStorage.setItem('adminToken', data.token);
        window.location.href = '/admin/fekhach';
      } else if (data.success === false) {
        setError(data.message || 'Đăng nhập thất bại!');
      } else {
        setError('Bạn không có quyền truy cập trang này!');
      }
    } catch (err) {
      setError('Đăng nhập thất bại!');
    }
  };
  // Fetch products and stats
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log('API response:', data);
      if (data.success) {
        let filtered = data.products;
        if (filter === 'active')
          filtered = filtered.filter((p) => !p.deletedAt);
        if (filter === 'deleted')
          filtered = filtered.filter((p) => p.deletedAt);
        setProducts(filtered);
        setStats({
          total: data.products.length,
          active: data.products.filter((p) => !p.deletedAt).length,
          deleted: data.products.filter((p) => p.deletedAt).length,
        });
      }
    } catch (err) {
      console.log('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab, filter]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (!addForm.name.trim()) {
        alert('Please enter product name');
        return;
      }
      if (!addForm.price) {
        alert('Please enter product price');
        return;
      }
      if (!addForm.material.trim()) {
        alert('Please enter product material');
        return;
      }

      const productData = {
        name: addForm.name.trim(),
        price: Number(addForm.price),
        description: addForm.description.trim(),
        type: addForm.type.trim(),
        material: addForm.material.trim(),
        size: addForm.size
          .filter((sz) => sz.name.trim() && sz.amount)
          .map((sz) => ({
            name: sz.name.trim(),
            amount: sz.amount,
          })),
        images: addForm.images.filter((img) => img.trim()),
      };

      // Log dữ liệu trước khi gửi
      console.log('Sending product data:', productData);

      const res = await fetch(`${API_URL}/admin/product/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      console.log('Server response:', data);

      if (data.success) {
        alert('Product added successfully');
        // Reset form
        setAddForm({
          name: '',
          price: '',
          description: '',
          type: '',
          material: '',
          size: [{ name: '', amount: '' }],
          images: [''],
        });
        setActiveTab('products');
        fetchProducts();
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };
  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;
    try {
      const res = await fetch(`${API_URL}/admin/product/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert('Product deleted successfully');
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Restore Product
  const handleRestoreProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/product/${id}/restore`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert('Product restored successfully');
        fetchProducts();
      } else {
        alert('Failed to restore product');
      }
    } catch (err) {
      alert('Failed to restore product');
    }
  };

  // Edit Product Modal
  const openEditModal = (product) => {
    setEditProduct({
      ...product,
      size: product.size || [{ name: '', amount: '' }],
      images: product.images || [''],
    });
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!editProduct.name.trim()) {
        alert('Please enter product name');
        return;
      }
      if (!editProduct.price) {
        alert('Please enter product price');
        return;
      }
      if (!editProduct.material.trim()) {
        alert('Please enter product material');
        return;
      }

      // Chuẩn bị dữ liệu
      const productData = {
        name: editProduct.name.trim(),
        price: Number(editProduct.price),
        description: editProduct.description.trim(),
        type: editProduct.type.trim(),
        material: editProduct.material.trim(),
        size: editProduct.size
          .filter((sz) => sz.name.trim() && sz.amount)
          .map((sz) => ({
            name: sz.name.trim(),
            amount: sz.amount,
          })),
        images: editProduct.images.filter((img) => img.trim()),
      };

      console.log('Sending edit data:', productData);

      const res = await fetch(`${API_URL}/admin/product/${editProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData), // Gửi trực tiếp productData
      });

      const data = await res.json();
      console.log('Edit response:', data);

      if (data.success) {
        alert('Product updated successfully');
        closeEditModal();
        fetchProducts(); // Cập nhật lại danh sách sản phẩm
      } else {
        alert(data.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Helpers for dynamic fields
  const handleAddSize = () =>
    setAddForm((f) => ({
      ...f,
      size: [...f.size, { name: '', amount: '' }],
    }));
  const handleAddImage = () =>
    setAddForm((f) => ({
      ...f,
      images: [...f.images, ''],
    }));
  const handleSizeChange = (idx, key, value) =>
    setAddForm((f) => {
      const size = [...f.size];
      size[idx][key] = value;
      return { ...f, size };
    });
  const handleImageChange = (idx, value) =>
    setAddForm((f) => {
      const images = [...f.images];
      images[idx] = value;
      return { ...f, images };
    });

  // Similar helpers for editProduct
  const handleEditSizeChange = (idx, key, value) =>
    setEditProduct((p) => {
      const size = [...p.size];
      size[idx][key] = value;
      return { ...p, size };
    });
  const handleEditImageChange = (idx, value) =>
    setEditProduct((p) => {
      const images = [...p.images];
      images[idx] = value;
      return { ...p, images };
    });
  const handleEditAddSize = () =>
    setEditProduct((p) => ({
      ...p,
      size: [...p.size, { name: '', amount: '' }],
    }));
  const handleEditAddImage = () =>
    setEditProduct((p) => ({
      ...p,
      images: [...p.images, ''],
    }));
  console.log('activeTab:', activeTab, 'products:', products);
  // UI
  return (
    <div className='container'>
      {/* Sidebar */}
      <div className='sidebar'>
        <div className='logo'>
          <h2>SATO STORE ADMIN</h2>
        </div>
        <nav>
          <ul>
            <li
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className='fas fa-home'></i> <span>Dashboard</span>
            </li>
            <li
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => {
                setActiveTab('products');
                setFilter('all');
              }}
            >
              <i className='fas fa-box'></i> <span>Products</span>
            </li>
            <li
              className={activeTab === 'add-product' ? 'active' : ''}
              onClick={() => setActiveTab('add-product')}
            >
              <i className='fas fa-plus'></i> <span>Add Product</span>
            </li>
            <li id='logout' onClick={handleLogout}>
              <i className='fas fa-sign-out-alt'></i> <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className='main-content'>
        {/* Header */}
        <header>
          <div className='header-title'>
            <h1>SATO STORE</h1>
          </div>
          <div className='user-info'>
            <span id='username'>Admin</span>
          </div>
        </header>

        {/* Content Area */}
        <div className='content'>
          {/* Dashboard Page */}
          {activeTab === 'dashboard' && (
            <div id='dashboard-page' className='page active'>
              <div className='stats'>
                <div className='stat-card'>
                  <h3>Total Products</h3>
                  <p id='total-products'>{stats.total}</p>
                </div>
                <div className='stat-card'>
                  <h3>Active Products</h3>
                  <p id='active-products'>{stats.active}</p>
                </div>
                <div className='stat-card'>
                  <h3>Deleted Products</h3>
                  <p id='deleted-products'>{stats.deleted}</p>
                </div>
              </div>
            </div>
          )}

          {/* Products Page */}
          {activeTab === 'products' && (
            <div
              id='products-page'
              className='page'
              style={{ display: 'block' }}
            >
              <div className='products-header'>
                <h2>Products List</h2>
                <div className='filters'>
                  <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`filter-btn ${
                      filter === 'active' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`filter-btn ${
                      filter === 'deleted' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('deleted')}
                  >
                    Deleted
                  </button>
                </div>
              </div>
              <div
                className='products-table'
                style={{ border: '1px solid red' }}
              >
                <table style={{ border: '1px solid blue' }}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className='product-image'
                              style={{ width: '50px', height: '50px' }}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.type}</td>
                          <td>{product.deletedAt ? 'Deleted' : 'Active'}</td>
                          <td className='action-buttons'>
                            <button
                              onClick={() => openEditModal(product)}
                              className='btn edit-btn'
                            >
                              Edit
                            </button>
                            {product.deletedAt ? (
                              <button
                                onClick={() =>
                                  handleRestoreProduct(product._id)
                                }
                                className='btn restore-btn'
                              >
                                Restore
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className='btn delete-btn'
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add Product Page */}
          {activeTab === 'add-product' && (
            <div
              id='add-product-page'
              className='page '
              style={{ display: 'block' }}
            >
              <h2 className='text-xl mb-4' style={{ marginBottom: '35px' }}>
                Add New Product
              </h2>
              <form id='add-product-form' onSubmit={handleAddProduct}>
                <div className='form-group'>
                  <label htmlFor='name'>Product Name *</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    minLength={3}
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='price'>Price *</label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    required
                    min={0}
                    step={0.01}
                    value={addForm.price}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, price: e.target.value }))
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    id='description'
                    name='description'
                    value={addForm.description}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, description: e.target.value }))
                    }
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='type'>Type *</label>
                  <input
                    type='text'
                    id='type'
                    name='type'
                    required
                    value={addForm.type}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, type: e.target.value }))
                    }
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='material'>Material *</label>
                  <input
                    type='text'
                    id='material'
                    name='material'
                    required
                    value={addForm.material}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, material: e.target.value }))
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>Sizes *</label>
                  <div className='sizes-container'>
                    {addForm.size.map((sz, idx) => (
                      <div className='size-input' key={idx}>
                        <input
                          type='text'
                          name='size-name'
                          placeholder='Size (e.g. S)'
                          required
                          value={sz.name}
                          onChange={(e) =>
                            handleSizeChange(idx, 'name', e.target.value)
                          }
                        />
                        <input
                          type='number'
                          name='size-amount'
                          placeholder='Amount'
                          required
                          min={0}
                          value={sz.amount}
                          onChange={(e) =>
                            handleSizeChange(idx, 'amount', e.target.value)
                          }
                        />
                      </div>
                    ))}
                    <button type='button' onClick={handleAddSize}>
                      Add Size
                    </button>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Images *</label>
                  <div className='images-container'>
                    {addForm.images.map((img, idx) => (
                      <input
                        key={idx}
                        type='url'
                        name='image'
                        placeholder='Image URL'
                        required
                        value={img}
                        onChange={(e) => handleImageChange(idx, e.target.value)}
                      />
                    ))}
                    <button type='button' onClick={handleAddImage}>
                      Add Image
                    </button>
                  </div>
                </div>
                <button type='submit'>Add Product</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editProduct && (
        <div id='edit-modal' className='modal' style={{ display: 'block' }}>
          <div className='modal-content'>
            <h2>Edit Product</h2>
            <form id='edit-product-form' onSubmit={handleEditProduct}>
              <div className='form-group'>
                <label htmlFor='edit-name'>Product Name *</label>
                <input
                  type='text'
                  id='edit-name'
                  name='name'
                  required
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className='form-group'>
                <label htmlFor='edit-price'>Price *</label>
                <input
                  type='number'
                  id='edit-price'
                  name='price'
                  required
                  min={0}
                  step={0.01}
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, price: e.target.value }))
                  }
                />
              </div>
              <div className='form-group'>
                <label htmlFor='edit-description'>Description</label>
                <textarea
                  id='edit-description'
                  name='description'
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className='form-group'>
                <label htmlFor='edit-type'>Type *</label>
                <input
                  type='text'
                  id='edit-type'
                  name='type'
                  required
                  value={editProduct.type}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, type: e.target.value }))
                  }
                />
              </div>
              <div className='form-group'>
                <label htmlFor='edit-material'>Material *</label>
                <input
                  type='text'
                  id='edit-material'
                  name='material'
                  required
                  value={editProduct.material}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, material: e.target.value }))
                  }
                />
              </div>
              <div className='form-group'>
                <label>Sizes *</label>
                <div className='sizes-container'>
                  {editProduct.size.map((sz, idx) => (
                    <div className='size-input' key={idx}>
                      <input
                        type='text'
                        name='size-name'
                        required
                        value={sz.name}
                        onChange={(e) =>
                          handleEditSizeChange(idx, 'name', e.target.value)
                        }
                      />
                      <input
                        type='number'
                        name='size-amount'
                        required
                        min={0}
                        value={sz.amount}
                        onChange={(e) =>
                          handleEditSizeChange(idx, 'amount', e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button type='button' onClick={handleEditAddSize}>
                    Add Size
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <label>Images *</label>
                <div className='images-container'>
                  {editProduct.images.map((img, idx) => (
                    <input
                      key={idx}
                      type='url'
                      name='image'
                      required
                      value={img}
                      onChange={(e) =>
                        handleEditImageChange(idx, e.target.value)
                      }
                    />
                  ))}
                  <button type='button' onClick={handleEditAddImage}>
                    Add Image
                  </button>
                </div>
              </div>
              <div className='modal-buttons'>
                <button type='submit' className='submit-btn'>
                  Save Changes
                </button>
                <button
                  type='button'
                  className='cancel-btn'
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
