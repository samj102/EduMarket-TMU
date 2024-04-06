import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
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

const AcademicServicesPage = () => {
  // State variables
  const [filterPrice, setFilterPrice] = useState("");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const decoded = jwtDecode(localStorage.getItem("login"));

  const navigate = useNavigate();

  // Event handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to handle interested button click
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

  // Event handler for filter by price select change
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

  // Function to fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await api.get("/ad");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Filter items based on search query and category
  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)) &&
      item.category.includes("services")
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px", textAlign: "center" }}>
      {/* Page title */}
      <Typography variant="h2" gutterBottom>
        <span style={{ color: "#4CAF50" }}>A</span>cademic{" "}
        <span style={{ color: "#4CAF50" }}>S</span>ervices
      </Typography>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Search input */}
        <TextField
          label="Search Items"
          variant="outlined"
          onChange={handleSearchChange}
          style={{ marginRight: "10px", width: "200px" }}
        />
        {/* Filter by price select */}
        <FormControl variant="outlined" style={{ marginRight: "10px" }}>
          <InputLabel id="price-filter-label">Filter by Price</InputLabel>
          <Select
            labelId="price-filter-label"
            id="price-filter"
            value={filterPrice}
            onChange={handleFilterPrice}
            label="Filter by Price"
            style={{ width: "200px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"0 - 50"}>0 - 50</MenuItem>
            <MenuItem value={"More than 50"}>More than 50</MenuItem>
          </Select>
        </FormControl>
        {/* Post an ad button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/sell")}
          style={{ height: "55px", marginBottom: "20px" }}
        >
          Post an Ad
        </Button>
      </div>
      {/* Grid of items */}
      <Grid container spacing={3} justifyContent="center">
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card
              sx={{
                border: "2px solid #4caf50",
                borderRadius: "8px",
                height: "100%",
              }}
            >
              {/* Item image */}
              <CardMedia
                sx={{ padding: "1em", objectFit: "contain" }}
                component="img"
                height="140"
                image={
                  process.env.REACT_APP_REQUEST_URL +
                  "/ad/" +
                  (item.image[0] || "uploads/default.png")
                }
                alt={item.name}
              />
              <CardContent>
                {/* Item title */}
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                {/* Item description */}
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                {/* Item price */}
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price}
                </Typography>
              </CardContent>
              {/* Interested button */}
              {decoded.id !== item.post_person_id ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() =>
                    handleInterested(item.post_person_id, item.title)
                  }
                >
                  Interested
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  component={Link}
                  to="/MyAds"
                >
                  Your Post
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AcademicServicesPage;
