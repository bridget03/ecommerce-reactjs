import React, { useState, useEffect, useCallback } from 'react';
import styles from './SearchModal.module.scss';
import { IoMdClose } from 'react-icons/io';
import { getProduct } from '@apis/productService';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(
    debounce(async (query, category) => {
      setLoading(true);
      try {
        const { data } = await getProduct({
          sortType: 0,
          page: 1,
          limit: 100,
        });

        const filteredProducts = data.filter((product) => {
          const matchCategory = product.type
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchName = product.name
            .toLowerCase()
            .includes(query.toLowerCase());
          return matchCategory && matchName;
          //   return matchCategory;
          //   return matchName;
        });

        setListProducts(filteredProducts);
        console.log('object', filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setListProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [] // debounce chỉ khởi tạo một lần
  );

  // Gọi API khi searchTerm hoặc category thay đổi
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchProducts(searchTerm, selectedCategory);
    } else {
      setListProducts([]);
    }
  }, [searchTerm, selectedCategory, fetchProducts]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchProducts(searchTerm, selectedCategory);
    }
  };
  const handleCloseModal = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModal}>
      <div className={styles.modalContent}>
        <IoMdClose className={styles.closeIcon} onClick={onClose} />

        <div className={styles.header}>
          <h2>What Are You Looking For?</h2>
        </div>

        <div className={styles.searchContainer}>
          <select
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value='all'>All categories</option>
            <option value='Hoodies'>Hoodies</option>
            <option value='Jeans'>Jeans</option>
            <option value='Jumpers'>Jumpers</option>
            <option value='Jacket'>Jacket</option>
          </select>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for products'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <div
              onClick={() => setSearchTerm('')}
              className='absolute right-[10px] top-[10px] cursor-pointer'
            >
              <IoMdClose />
            </div>
          </div>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className={styles.popularSearches}>
          <p>TRENDING SEARCHES:</p>
          <div className={styles.trendingTags}>
            <span onClick={() => setSearchTerm('Hoodie')}>Hoodie</span>
            <span onClick={() => setSearchTerm('Jumpers')}>Jumpers</span>
            <span onClick={() => setSearchTerm('Jeans')}>Jeans</span>
            <span onClick={() => setSearchTerm('Jacket')}>Jacket</span>
          </div>
        </div>

        <div className='mt-6 overflow-auto'>
          {loading ? (
            <p className={styles.loadingText}>Loading products...</p>
          ) : listProducts.length > 0 ? (
            <div className=' grid grid-cols-2 gap-8 h-full'>
              {listProducts.map((product) => (
                <div
                  className='flex gap-4 text-left items-center p-2 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out cursor-pointer bg-white'
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    className='max-w-28 max-h-32 object-cover rounded-md transition-transform duration-200'
                    alt={product.name}
                  />
                  <div>
                    <p className='text-lg text-gray-800 transition-colors duration-200 '>
                      {product.name}
                    </p>
                    <p className='text-gray-600 text-sm mt-1'>
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
