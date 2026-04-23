import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../api/categoriesApi';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from '../api/productsApi';
import ConfirmModal from '../components/modals/ConfirmModal';
import { setCategories, setProducts } from '../redux/actions/shopActions';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const categories = useSelector((state) => state.shop.categories);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    img: '',
    description: '',
    categoryId: ''
  });
  const [editProductId, setEditProductId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        dispatch(setProducts(productsData));
        dispatch(setCategories(categoriesData));
      } catch (error) {
        toast.error('Could not load admin data.');
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (!productForm.categoryId && categories.length > 0) {
      setProductForm((current) => ({
        ...current,
        categoryId: categories[0].id
      }));
    }
  }, [categories, productForm.categoryId]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
    [categories]
  );

  const resetProductForm = () => {
    setEditProductId(null);
    setProductForm({
      name: '',
      price: '',
      img: '',
      description: '',
      categoryId: categories[0]?.id || ''
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((category) => category.id === productForm.categoryId);
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      categoryName: selectedCategory?.name || ''
    };

    try {
      const data = editProductId
        ? await updateProduct(editProductId, payload)
        : await createProduct(payload);

      if (editProductId) {
        dispatch(
          setProducts(products.map((product) => (product.id === editProductId ? data : product)))
        );
      } else {
        dispatch(setProducts([...products, data]));
      }

      resetProductForm();
      toast.success(editProductId ? 'Product updated successfully.' : 'Product created successfully.');
    } catch (error) {
      toast.error('Could not save product.');
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      await deleteProduct(productToDelete.id);
      dispatch(setProducts(products.filter((product) => product.id !== productToDelete.id)));
      toast.success('Product deleted successfully.');
      setProductToDelete(null);
    } catch (error) {
      toast.error('Could not delete product.');
    }
  };

  return (
    <div className="container admin-page">
      <h2 className="page-title">Store Management</h2>

      <div className="admin-form-box">
        <h3>{editProductId ? 'Edit Product' : 'Create Product'}</h3>

        <form onSubmit={handleProductSubmit} className="admin-form">
          <input
            placeholder="Product name"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            required
          />
          <input
            placeholder="Image URL"
            value={productForm.img}
            onChange={(e) => setProductForm({ ...productForm, img: e.target.value })}
            required
          />
          <textarea
            placeholder="Product description"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            rows={4}
          />
          <select
            value={productForm.categoryId}
            onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit" className={`button ${editProductId ? 'button-success' : ''}`}>
            {editProductId ? 'Save Product' : 'Create Product'}
          </button>

          {editProductId && (
            <button
              type="button"
              className="button button-secondary"
              onClick={resetProductForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{categoryMap[product.categoryId] || product.categoryName}</td>
              <td>{product.price} KZT</td>
              <td className="table-actions">
                <button
                  type="button"
                  className="button button-inline"
                  onClick={() => {
                    setEditProductId(product.id);
                    setProductForm({
                      name: product.name,
                      price: product.price,
                      img: product.img,
                      description: product.description || '',
                      categoryId: product.categoryId
                    });
                    window.scrollTo(0, 0);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="button button-danger button-inline"
                  onClick={() => setProductToDelete(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        title="Delete product?"
        description="This product will be permanently removed from the catalog."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default AdminPage;
