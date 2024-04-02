import React, { useState } from 'react';
import api from '../utils/api';

const FormComponent = ({ postPersonId }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        post_person_id: postPersonId,
        images: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithImages = new FormData();
            formDataWithImages.append('title', formData.title);
            formDataWithImages.append('description', formData.description);
            formDataWithImages.append('price', formData.price);
            formDataWithImages.append('category', formData.category);
            formDataWithImages.append('post_person_id', formData.post_person_id);
            formData.images.forEach((image, index) => {
                formDataWithImages.append(`image${index}`, image);
            });
            const response = await api.post("/ad", formDataWithImages, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); // Sending form data with images to the backend endpoint
            if (response.status === 200) {
                // Handle success
                console.log('Ad submitted successfully!');
            } else {
                // Handle error
                console.error('Ad submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
            />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormComponent;
