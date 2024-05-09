import React, { useState, useEffect } from 'react';

function AdminPanel() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        image: '',
        description: '',
        price: 0,
    });

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddProduct = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .then(data => {
            setProducts([...products, data]);
            setNewProduct({ name: '', image: '', description: '', price: 0 });
        })
        .catch(error => console.error('Error adding product:', error));
    };

    const handleEditProduct = (updatedProduct) => {
        fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => response.json())
        .then(data => {
            const updatedProducts = products.map(product => product.id === data.id ? data : product);
            setProducts(updatedProducts);
        })
        .catch(error => console.error('Error editing product:', error));
    };

    const handleRemoveProduct = (id) => {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
        })
        .then(() => setProducts(products.filter(product => product.id !== id)))
        .catch(error => console.error('Error removing product:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label>Name:
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Image URL:
                        <input
                            type="url"
                            name="image"
                            value={newProduct.image}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description:
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Price:
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>

            <div className="products">
                <h3>Current Products</h3>
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                        <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
