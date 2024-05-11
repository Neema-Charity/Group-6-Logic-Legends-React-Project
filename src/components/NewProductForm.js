import React, { useState, useEffect } from 'react';

function NewProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    price: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result })
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() === '' || formData.description.trim() === '' || formData.category.trim() === '' || formData.image.trim() === '' || formData.price.trim() === '') {
      alert('Please fill in all fields.');
    } else {
      onAddProduct(formData);

      setFormData({
        name: '',
        description: '',
        category: '',
        image: '',
        price: ''
      });
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' name='name' value={formData.name} onChange={handleChange} />
        <input type='text' placeholder='Description' name='description' value={formData.description} onChange={handleChange} />
        <select name='category' value={formData.category} onChange={handleChange}>
          <option value=''>Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input type='file' name='image' onChange={handleChange} />
        <input type='number' placeholder='Price' name='price' value={formData.price} onChange={handleChange} />
        <button type='submit' className="submit-button">Add Product</button>
      </form>
    </div>
  );
}

export default NewProductForm;
