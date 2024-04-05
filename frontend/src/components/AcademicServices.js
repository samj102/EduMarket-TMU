import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AcademicServicesPage = () => {
  const [filterPrice, setFilterPrice] = useState("");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const decoded = jwtDecode(localStorage.getItem("login"));

  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  async function handleInterested(authorID, postTitle) {
    const res = await api.get(`/chat/${decoded.id}/${authorID}`);

    try {
      if (res.data.length > 0) {
        const data = {
          sender: decoded.id,
          message: `I am interested in your item, ${postTitle}`,
        };
        await api.put(`/chat/${res.data[0]._id}`, data);
        alert("Message sent! Go to chat to see the conversation.");
      } else {
        const data = {
          sender: decoded.id,
          receiver: authorID,
          message: `I am interested in buying your item, ${postTitle}`,
        };
        await api.post("/chat", data);
        alert("Message sent! Go to chat to see the conversation.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleFilterPrice = async (event) => {
    const filter = event.target.value;
    const response = await api.get("/ad");
    if (filter === "0 - 50") {
      setItems(response.data.filter((item) => item.price <= 50));
    } else if (filter === "More than 50") {
      setItems(response.data.filter((item) => item.price > 50));
    } else {
      setItems(response.data);
    }
    setFilterPrice(filter);
  };

  const fetchItems = async () => {
    try {
      const response = await api.get("/ad");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)) &&
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
        style={{ marginBottom: "20px" }}
      />
      <FormControl
        variant="outlined"
        style={{
          width: "150px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        <InputLabel id="price-filter-label">Filter by Price</InputLabel>
        <Select
          labelId="price-filter-label"
          id="price-filter"
          value={filterPrice} // Add state for selected price filter
          onChange={handleFilterPrice}
          label="Filter by Price"
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"0 - 50"}>0 - 50</MenuItem>
          <MenuItem value={"More than 50"}>More than 50</MenuItem>
        </Select>
      </FormControl>
      <Button // Same routing to Sell an item page as creating a new one would be redundant
        variant="contained"
        color="primary"
        onClick={() => navigate("/sell")} // Navigate to the sell page
        style={{ height: "55px", marginBottom: "20px" }}
      >
        Post an Ad
      </Button>
      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ p: 2 }}>
              <CardMedia
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                component="img"
                height="140"
                image={
                  "http://localhost:8080/ad/" +
                  (item.image[0] || "uploads/default.png")
                }
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price}
                </Typography>
              </CardContent>
              {decoded.id != item.post_person_id ? (
                <button
                  className="button-interested"
                  onClick={() =>
                    handleInterested(item.post_person_id, item.title)
                  }
                >
                  Interested
                </button>
              ) : (
                <button className="button-ownPost">Your Post</button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AcademicServicesPage;
