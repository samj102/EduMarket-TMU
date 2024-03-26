import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';

const UploadItemPage = () => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [itemImage, setItemImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('description', description);
        formData.append('price', price);
        if (itemImage) {
            formData.append('itemImage', itemImage);
        }

        // Simulate sending data to the backend
        console.log('Form data to be sent to the backend:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        //Simulating a successful submission
        setTimeout(() => {
            alert('Item uploaded successfully (simulated response)');
            setItemName('');
            setDescription('');
            setPrice('');
            setItemImage(null);
        }, 1000);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6">Upload Item for Sale</Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Item Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setItemImage(e.target.files[0])}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Upload Item
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default UploadItemPage;
