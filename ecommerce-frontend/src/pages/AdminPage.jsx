import { useEffect, useState } from 'react';
import { createProduct } from '../api/products';
import { createCategory, getCategories } from '../api/categories';

function AdminPage() {
  const [categories, setCategories] = useState([]);

  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', stock: '', categoryId: '',
  });
  const [productMessage, setProductMessage] = useState(null);
  const [productError, setProductError] = useState(null);

  const [categoryName, setCategoryName] = useState('');
  const [categoryMessage, setCategoryMessage] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    getCategories().then((response) => setCategories(response.data));
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    setProductError(null);
    setProductMessage(null);

    try {
      await createProduct({
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock, 10),
        categoryId: parseInt(productForm.categoryId, 10),
      });
      setProductMessage('Producto creado correctamente');
      setProductForm({ name: '', description: '', price: '', stock: '', categoryId: '' });
    } catch (err) {
      const message = err.response?.data?.details?.join(', ')
        || err.response?.data?.message
        || 'No se pudo crear el producto';
      setProductError(message);
    }
  }

  async function handleCreateCategory(e) {
    e.preventDefault();
    setCategoryError(null);
    setCategoryMessage(null);

    try {
      await createCategory({ name: categoryName });
      setCategoryMessage('Categoría creada correctamente');
      setCategoryName('');
      loadCategories();
    } catch (err) {
      const message = err.response?.data?.message || 'No se pudo crear la categoría';
      setCategoryError(message);
    }
  }

  return (
    <div>
      <h1>Panel de administración</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Nueva categoría</h2>
        <form onSubmit={handleCreateCategory}>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Crear categoría</button>
        </form>
        {categoryMessage && <p style={{ color: 'green' }}>{categoryMessage}</p>}
        {categoryError && <p style={{ color: 'red' }}>{categoryError}</p>}
      </section>

      <section>
        <h2>Nuevo producto</h2>
        <form onSubmit={handleCreateProduct}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Descripción"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
              required
            />
          </div>
          <div>
            <select
              value={productForm.categoryId}
              onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
              required
            >
              <option value="">Seleccioná una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Crear producto</button>
        </form>
        {productMessage && <p style={{ color: 'green' }}>{productMessage}</p>}
        {productError && <p style={{ color: 'red' }}>{productError}</p>}
      </section>
    </div>
  );
}

export default AdminPage;