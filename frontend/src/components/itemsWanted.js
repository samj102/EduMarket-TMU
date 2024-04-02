import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

const ItemsWanted = () => {
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
        item.category.includes("wanted")
    );

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Typography variant="h2" gutterBottom>
                Items Wanted
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
                Looking for something?
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

export default ItemsWanted;


