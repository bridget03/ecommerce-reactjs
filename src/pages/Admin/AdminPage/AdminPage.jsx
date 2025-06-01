import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    material: '',
    size: [{ name: '', amount: '' }],
    images: [''],
  });
  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    revenueByStatus: {
      pending: {
        totalAmount: 0,
        count: 0,
      },
    },
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
  console.log('????????????????????????????????', orders);
  // Fetch products and stats
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
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

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        console.log('list orders:ssssssssssssssss', data.orders);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Fetch revenue statistics
  const fetchRevenue = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/orders/revenue`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log('API Response:', data);

      if (data.success) {
        console.log('Revenue Data:', {
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
          revenueByStatus: data.revenueByStatus,
        });

        setRevenue(data);

        // Log state after update
        console.log('Revenue State after update:', {
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
          pending: data.revenueByStatus?.pending,
        });
      } else {
        console.error('Failed to fetch revenue:', data.message);
      }
    } catch (err) {
      console.error('Error fetching revenue:', err);
    }
  };

  // Log revenue state when it changes
  useEffect(() => {
    console.log('Current Revenue State:', revenue);
  }, [revenue]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchRevenue();
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
            <li
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <i className='fas fa-shopping-cart'></i> <span>Orders</span>
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
                  <h3>Tổng doanh thu</h3>
                  <p>
                    {(revenue?.totalRevenue || 0).toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <div className='stat-card'>
                  <h3>Doanh thu từ đơn chờ xử lý</h3>
                  <p>
                    {(
                      revenue?.revenueByStatus?.pending?.totalAmount || 0
                    ).toLocaleString('vi-VN')}{' '}
                    VNĐ
                  </p>
                </div>
                <div className='stat-card'>
                  <h3>Tổng đơn hàng</h3>
                  <p>{revenue?.totalOrders || 0}</p>
                </div>
                <div className='stat-card'>
                  <h3>Đơn hàng chờ xử lý</h3>
                  <p>{revenue?.revenueByStatus?.pending?.count || 0}</p>
                </div>
                <div className='stat-card'>
                  <h3>Tổng sản phẩm</h3>
                  <p>{stats.total}</p>
                </div>
                <div className='stat-card'>
                  <h3>Sản phẩm hoạt động</h3>
                  <p>{stats.active}</p>
                </div>
                <div className='stat-card'>
                  <h3>Sản phẩm đã xóa</h3>
                  <p>{stats.deleted}</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className='charts-container'>
                {/* Revenue by Status Bar Chart */}
                <div className='chart-card'>
                  <h3>Thống kê doanh thu theo trạng thái</h3>
                  <div className='chart-wrapper'>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart
                        data={[
                          {
                            name: 'Chờ xử lý',
                            amount:
                              revenue?.revenueByStatus?.pending?.totalAmount ||
                              0,
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            value.toLocaleString('vi-VN') + ' VNĐ'
                          }
                        />
                        <Legend />
                        <Bar dataKey='amount' fill='#8884d8' name='Doanh thu' />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Orders by Status Pie Chart */}
                <div className='chart-card'>
                  <h3>Thống kê đơn hàng theo trạng thái</h3>
                  <div className='chart-wrapper'>
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Chờ xử lý',
                              value:
                                revenue?.revenueByStatus?.pending?.count || 0,
                            },
                            {
                              name: 'Khác',
                              value:
                                (revenue?.totalOrders || 0) -
                                (revenue?.revenueByStatus?.pending?.count || 0),
                            },
                          ]}
                          cx='50%'
                          cy='50%'
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill='#8884d8'
                          dataKey='value'
                        >
                          <Cell fill='#8884d8' />
                          <Cell fill='#82ca9d' />
                        </Pie>
                        <Tooltip
                          formatter={(value) => value.toLocaleString('vi-VN')}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Products Status Pie Chart */}
                <div className='chart-card'>
                  <h3>Thống kê trạng thái sản phẩm</h3>
                  <div className='chart-wrapper'>
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Đang hoạt động',
                              value: stats.active,
                            },
                            {
                              name: 'Đã xóa',
                              value: stats.deleted,
                            },
                          ]}
                          cx='50%'
                          cy='50%'
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill='#8884d8'
                          dataKey='value'
                        >
                          <Cell fill='#82ca9d' />
                          <Cell fill='#ff8042' />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
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
                <h2>Danh sách sản phẩm</h2>
                <div className='filters'>
                  <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`filter-btn ${
                      filter === 'active' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('active')}
                  >
                    Hoạt động
                  </button>
                  <button
                    className={`filter-btn ${
                      filter === 'deleted' ? 'active' : ''
                    }`}
                    onClick={() => setFilter('deleted')}
                  >
                    Đã xóa
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
                      <th>Ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                          Không có sản phẩm nào.
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
                          <td>{product.deletedAt ? 'Đã xóa' : 'Hoạt động'}</td>
                          <td className='action-buttons'>
                            <button
                              onClick={() => openEditModal(product)}
                              className='btn edit-btn'
                            >
                              Sửa
                            </button>
                            {product.deletedAt ? (
                              <button
                                onClick={() =>
                                  handleRestoreProduct(product._id)
                                }
                                className='btn restore-btn'
                              >
                                Khôi phục
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className='btn delete-btn'
                              >
                                Xóa
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
                Thêm sản phẩm mới
              </h2>
              <form id='add-product-form' onSubmit={handleAddProduct}>
                <div className='form-group'>
                  <label htmlFor='name'>Tên sản phẩm *</label>
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
                  <label htmlFor='price'>Giá *</label>
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
                  <label htmlFor='description'>Mô tả</label>
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
                  <label htmlFor='type'>Loại *</label>
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
                  <label htmlFor='material'>Chất liệu *</label>
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
                  <label>Kích cỡ *</label>
                  <div className='sizes-container'>
                    {addForm.size.map((sz, idx) => (
                      <div className='size-input' key={idx}>
                        <input
                          type='text'
                          name='size-name'
                          placeholder='Kích cỡ (ví dụ: S)'
                          required
                          value={sz.name}
                          onChange={(e) =>
                            handleSizeChange(idx, 'name', e.target.value)
                          }
                        />
                        <input
                          type='number'
                          name='size-amount'
                          placeholder='Số lượng'
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
                      Thêm kích cỡ
                    </button>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Ảnh *</label>
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
                      Thêm ảnh
                    </button>
                  </div>
                </div>
                <button type='submit'>Thêm sản phẩm</button>
              </form>
            </div>
          )}

          {/* Orders Page */}
          {activeTab === 'orders' && (
            <div id='orders-page' className='page' style={{ display: 'block' }}>
              <div className='orders-header'>
                <h2>Danh sách đơn hàng</h2>
              </div>
              <div className='orders-table'>
                <table>
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Ngày đặt</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center' }}>
                          Không có đơn hàng nào.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.shippingAddress.fullName}</td>
                          <td>{order.shippingAddress.email}</td>
                          <td>{order.shippingAddress.phone}</td>
                          <td>{order.totalAmount} VNĐ</td>
                          <td>{order.orderStatus}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className='btn view-btn'
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editProduct && (
        <div id='edit-modal' className='modal' style={{ display: 'block' }}>
          <div className='modal-content'>
            <h2>Sửa sản phẩm</h2>
            <form id='edit-product-form' onSubmit={handleEditProduct}>
              <div className='form-group'>
                <label htmlFor='edit-name'>Tên sản phẩm *</label>
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
                <label htmlFor='edit-price'>Giá *</label>
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
                <label htmlFor='edit-description'>Mô tả</label>
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
                <label htmlFor='edit-type'>Loại *</label>
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
                <label htmlFor='edit-material'>Chất liệu *</label>
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
                <label>Kích cỡ *</label>
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
                    Thêm Size
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <label>Ảnh *</label>
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
                    Thêm ảnh
                  </button>
                </div>
              </div>
              <div className='modal-buttons'>
                <button type='submit' className='submit-btn'>
                  Lưu thay đổi
                </button>
                <button
                  type='button'
                  className='cancel-btn'
                  onClick={closeEditModal}
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-content order-detail-modal'>
            <h2>Chi tiết đơn hàng</h2>
            <div className='order-info'>
              <h3>Thông tin khách hàng</h3>
              <p>
                <strong>Họ tên:</strong>{' '}
                {selectedOrder.shippingAddress.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.shippingAddress.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{' '}
                {selectedOrder.shippingAddress.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong>{' '}
                {selectedOrder.shippingAddress.address}
              </p>

              <h3>Thông tin đơn hàng</h3>
              <p>
                <strong>Mã đơn hàng:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{' '}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedOrder.orderStatus}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {selectedOrder.totalAmount} VNĐ
              </p>

              <h3>Danh sách sản phẩm</h3>
              <div className='order-items'>
                <table>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Kích cỡ</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className='product-info'>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='product-image'
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price} VNĐ</td>
                        <td>{item.price * item.quantity} VNĐ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='modal-buttons'>
              <button
                className='cancel-btn'
                onClick={() => setShowOrderModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
