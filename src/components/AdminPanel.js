import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./AdminPanel.css";

function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    image: '',
    in_stock: 0
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    image: '',
    in_stock: 0
  });

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setAdminProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handlePasswordSubmission = (e) => {
    e.preventDefault();
    const passwordExpected = 'password';
    if (password === passwordExpected) {
      setAuthenticated(true);
    } else {
      alert('Wrong Password');
    }
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setAdminProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      console.log('Product deleted:', productId);
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = adminProducts.find(product => product.id === productId);
    setSelectedProduct(productToEdit);
    setEditedProduct(productToEdit);
    
    document.getElementById("edit-product-form").scrollIntoView({ behavior: "smooth" });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateProduct = () => {
    fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
    .then(res => res.json())
    .then(updatedProduct => {
      setSelectedProduct(updatedProduct);
      const updatedProducts = adminProducts.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      setAdminProducts(updatedProducts);
      console.log('Product updated successfully:', updatedProduct);
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: name === "in_stock" ? parseInt(value) : value
    }));
  };

  const handleAddProduct = () => {
    fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
    .then(res => res.json())
    .then(data => {
      setAdminProducts(prevProducts => [...prevProducts, data]);
      setNewProduct({
        name: '',
        description: '',
        category: '',
        price: 0,
        image: '',
        in_stock: 0
      });
    })
    .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div className="admin-panel-container">
      <h1>ADMIN PANEL</h1>
      <form onSubmit={handlePasswordSubmission}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Authenticate</button>
      </form>
      {authenticated && (
        <>
          <p>Add a new product below:</p>
          <div className="new-product-form">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Product Category"
              value={newProduct.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="in_stock"
              placeholder="In Stock"
              value={newProduct.in_stock}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleAddProduct}>Add Product</button>
          </div>
          <p>Current Products:</p>
          <div className='products-list-container'>
            {adminProducts.map(product => (
              <div className="product-card" key={product.id}>
                <img className='product-image' src={product.image} alt={product.name} />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ksh:{product.price}</p>
                  <p>In Stock: {product.in_stock}</p>
                </div>
                <div className="button-container">
                  <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  <button className="edit-button" onClick={() => handleEditProduct(product.id)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedProduct && (
        <div id="edit-product-form" className="edit-product-form">
          <h3>Edit Product</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={editedProduct.name}
            onChange={handleEditInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={editedProduct.description}
            onChange={handleEditInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Product Category"
            value={editedProduct.category}
            onChange={handleEditInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={editedProduct.price}
            onChange={handleEditInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={editedProduct.image}
            onChange={handleEditInputChange}
          />
          <input
            type="number"
            name="in_stock"
            placeholder="In Stock"
            value={editedProduct.in_stock}
            onChange={handleEditInputChange}
          />
          <button type="button" onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
      <p className='nnnn'><Link to="/"> Back</Link></p>  
    </div>
  );
}

export default AdminPanel;
