// import React, { useState } from 'react';
// import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';

// const AcademicServicesPage = () => {
//     const [selection, setSelection] = useState('');

//     const handleSelection = (choice) => {
//         setSelection(choice);
//     };

//     return (
//         <Container maxWidth="sm">
//             {selection === '' ? (
//                 <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
//                     <Typography variant="h6">Academic Services</Typography>
//                     <Typography variant="body1" style={{ margin: '20px 0' }}>
//                         Do you want to sell or buy an academic service?
//                     </Typography>
//                     <Grid container spacing={2} justifyContent="center">
//                         <Grid item>
//                             <Button variant="contained" color="primary" onClick={() => handleSelection('sell')}>
//                                 Sell
//                             </Button>
//                         </Grid>
//                         <Grid item>
//                             <Button variant="contained" onClick={() => alert('Buy functionality coming soon!')}>
//                                 Buy
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             ) : selection === 'sell' ? (
//                 <SellAcademicServiceForm />
//             ) : null}
//         </Container>
//     );
// };

// const SellAcademicServiceForm = () => {
//     const [serviceName, setServiceName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [serviceImage, setServiceImage] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('serviceName', serviceName);
//         formData.append('description', description);
//         formData.append('price', price);
//         if (serviceImage) {
//             formData.append('serviceImage', serviceImage);
//         }

//         // Simulate sending data to the backend
//         console.log('Form data to be sent to the backend:');
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }

//         // Simulated backend response
//         setTimeout(() => {
//             alert('Academic service uploaded successfully (simulated response)');
//             setServiceName('');
//             setDescription('');
//             setPrice('');
//             setServiceImage(null);
//         }, 1000);
//     };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//                 <Typography variant="h6">Sell Academic Service</Typography>
//                 <form onSubmit={handleSubmit} noValidate>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Service Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 required
//                                 value={serviceName}
//                                 onChange={(e) => setServiceName(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Description"
//                                 variant="outlined"
//                                 fullWidth
//                                 required
//                                 multiline
//                                 rows={4}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Price"
//                                 variant="outlined"
//                                 fullWidth
//                                 required
//                                 value={price}
//                                 onChange={(e) => setPrice(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => setServiceImage(e.target.files[0])}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button type="submit" variant="contained" color="primary">
//                                 Upload Service
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Paper>
//         </Container>
//     );
// };

// export default AcademicServicesPage;

import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

const AcademicServicesPage = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get("/ad");
                setItems(response.data);
            } catch (error) {
                console.error("Failed to fetch items:", error);

            }
        };

        fetchItems();
    }, []);


    
    const filteredItems = items.filter(item => 
        (item.title.toLowerCase().includes(searchQuery) || 
        item.description.toLowerCase().includes(searchQuery) ) && 
        item.category.includes("services")
    );

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Typography variant="h2" gutterBottom>
                Academic Services
            </Typography>
            <TextField
                fullWidth
                label="Search Items"
                variant="outlined"
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
            />
            <Button // Same routing to Sell an item page as creating a new one would be redundant
                variant="contained"
                color="primary"
                onClick={() => navigate('/sell')} // Navigate to the sell page
                style={{ marginBottom: '20px' }}
            >
                Post an Ad
            </Button>
            <Grid container spacing={3}>
                {filteredItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.imageUrl || "/placeholder-image-url.jpg"}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AcademicServicesPage;


