import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

/**
 * FormComponent is a functional component that renders a form for creating an ad.
 * It allows users to input ad details such as title, description, price, category, and images.
 * When the form is submitted, it sends the ad data to the server for processing.
 */
const FormComponent = () => {
  // Retrieve token from local storage
  const tok = localStorage.getItem("login");
  // Decode the token to get user information
  const decode = jwtDecode(tok);
  // Use the navigate hook from react-router-dom to handle navigation
  const navigate = useNavigate();

  // Initialize form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "academic services",
    post_person_id: decode.id,
    images: [],
  });

  /**
   * Handle form input change
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle image input change
   * @param {Event} e - The image input change event
   */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  /**
   * Handle form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new FormData object to send the form data
      const formDataWithImages = new FormData();
      formDataWithImages.append("title", formData.title);
      formDataWithImages.append("description", formData.description);
      formDataWithImages.append("price", formData.price);
      formDataWithImages.append("category", formData.category);
      formDataWithImages.append("post_person_id", formData.post_person_id);

      // Append each image file to the FormData object
      if (formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          formDataWithImages.append(`image`, formData.images[index]);
        });
      }

      // Send the form data to the server using the api.post method
      const response = await api.post("/ad", formDataWithImages, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response status
      if (response.status === 200) {
        alert("Ad submitted successfully!");
        navigate("/home");
      } else {
        alert("Ad submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Create Your Ad</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price(if applicable)"
              name="price"
              value={formData.price}
              onChange={handleChange}
              variant="outlined"
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="academic services">Academic Services</MenuItem>
                <MenuItem value="items wanted">Items Wanted</MenuItem>
                <MenuItem value="items for sale">Items for Sale</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormComponent;
