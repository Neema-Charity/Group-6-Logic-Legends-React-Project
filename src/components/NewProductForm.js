import React, { useState } from 'react'

function NewProductForm({ onAddProduct }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        price: ''
    });

    const handleChange = (e) => {
        
        const {name, value, files} = e.target;

        if(name === 'image' && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData({ ...formData, image: e.target.result })
            };
            reader.readAsDataURL(files[0]);
        }else {
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
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='name' name='name' value={formData.name} onChange={handleChange} />
            <input type='taxt' placeholder='description' name='description' value={formData.description} onChange={handleChange} />
            <input type='text' placeholder='category' name='category' value={formData.category} onChange={handleChange} />
            <input type='file' name='image' onChange={handleChange} />
            <input type='number' placeholder='price' name='price' value={formData.price} onChange={handleChange} />
            <button type='submit' className="submit-button">Add Product</button>
        </form>
    );
}

export default NewProductForm
