import React, { useEffect, useState } from 'react';
import NewProductForm from './NewProductForm';
import './AdminPanel.css';

function AdminPanel() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleDeleteProduct = (productId) => {
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        })
            .then(() => setProducts(products.filter(product => product.id !== productId)))
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleAddProduct = (newProduct) => {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then(res => res.json())
            .then(addedProduct => {
                setProducts([...products, addedProduct]);
            })
            .catch(error => console.error('Error adding new product:', error));
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <NewProductForm onAddProduct={handleAddProduct} />
            <div className="product-list">
                <h3>Product List</h3>
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <span>{product.name}</span>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './AdminPanel.css';
// import NewProductForm from './NewProductForm';

// function AdminPanel() {
//   const [products, setProducts] = useState([]);

//   // Fetch products from the server
//   useEffect(() => {
//     fetch('http://localhost:3000/products')
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   // Function to handle adding new products
//   const handleAddProduct = (newProduct) => {
//     fetch('http://localhost:3000/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newProduct),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts([...products, data]);
//         console.log('New Product added', data);
//       })
//       .catch((error) => console.error('Error in adding new product:', error));
//   };

//   // Function to handle deleting products
//   const handleDeleteProduct = (productId) => {
//     fetch(`http://localhost:3000/products/${productId}`, {
//       method: 'DELETE',
//     })
//       .then((res) => {
//         if (res.ok) {
//           setProducts(products.filter((product) => product.id !== productId));
//           console.log('Product deleted successfully');
//         } else {
//           console.error('Error deleting product');
//         }
//       })
//       .catch((error) => console.error('Error in deleting product:', error));
//   };

//   return (
//     <div className="admin-panel">
//       <h2>Admin Panel</h2>
//       <NewProductForm onAddProduct={handleAddProduct} />
//       <div className="product-list">
//         <h3>Product List</h3>
//         {products.map((product) => (
//           <div key={product.id} className="product-item">
//             <span>{product.name}</span>
//             <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//             {/* You can add an "Edit" button here to edit product details */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;
// import React, { useState, useEffect } from 'react';

// function AdminPanel() {
//     const [products, setProducts] = useState([]);
//     const [newProduct, setNewProduct] = useState({
//         name: '',
//         image: '',
//         description: '',
//         price: 0,
//     });

//     useEffect(() => {
//         fetch('http://localhost:3000/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);

//     const handleAddProduct = (event) => {
//         event.preventDefault();
//         fetch('http://localhost:3000/products', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newProduct),
//         })
//         .then(response => response.json())
//         .then(data => {
//             setProducts([...products, data]);
//             setNewProduct({ name: '', image: '', description: '', price: 0 });
//         })
//         .catch(error => console.error('Error adding product:', error));
//     };

//     const handleEditProduct = (updatedProduct) => {
//         fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedProduct),
//         })
//         .then(response => response.json())
//         .then(data => {
//             const updatedProducts = products.map(product => product.id === data.id ? data : product);
//             setProducts(updatedProducts);
//         })
//         .catch(error => console.error('Error editing product:', error));
//     };

//     const handleRemoveProduct = (id) => {
//         fetch(`http://localhost:3000/products/${id}`, {
//             method: 'DELETE',
//         })
//         .then(() => setProducts(products.filter(product => product.id !== id)))
//         .catch(error => console.error('Error removing product:', error));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct({ ...newProduct, [name]: value });
//     };

//     return (
//         <div className="admin-panel">
//             <h2>Admin Panel</h2>
//             <form onSubmit={handleAddProduct}>
//                 <div className="form-group">
//                     <label>Name:
//                         <input
//                             type="text"
//                             name="name"
//                             value={newProduct.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>Image URL:
//                         <input
//                             type="url"
//                             name="image"
//                             value={newProduct.image}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>Description:
//                         <textarea
//                             name="description"
//                             value={newProduct.description}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div className="form-group">
//                     <label>Price:
//                         <input
//                             type="number"
//                             name="price"
//                             value={newProduct.price}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <button type="submit">Add Product</button>
//             </form>

//             <div className="products">
//                 <h3>Current Products</h3>
//                 {products.map(product => (
//                     <div key={product.id} className="product-item">
//                         <h4>{product.name}</h4>
//                         <p>{product.description}</p>
//                         <p>Price: ${product.price}</p>
//                         <button onClick={() => handleEditProduct(product)}>Edit</button>
//                         <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default AdminPanel;
