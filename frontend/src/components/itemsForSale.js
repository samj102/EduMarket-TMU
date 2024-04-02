import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import api from "../utils/api";

const ItemsForSale = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

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

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Typography variant="h2" gutterBottom>
                Items for Sale
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/sell')} // Navigate to the sell page
                style={{ marginBottom: '20px' }}
            >
                Sell Your Item
            </Button>
            <Grid container spacing={3}>
                {items.map((item) => (
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
                                    {item.name}
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

export default ItemsForSale;


