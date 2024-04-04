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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AcademicServicesPage = () => {
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
        navigate(`/chat`);
      } else {
        const data = {
          sender: decoded.id,
          receiver: authorID,
          message: `I am interested in buying your item, ${postTitle}`,
        };
        await api.post("/chat", data);
        navigate("/chat");
      }
    } catch (e) {
      console.log(e);
    }
  }

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
      <Button // Same routing to Sell an item page as creating a new one would be redundant
        variant="contained"
        color="primary"
        onClick={() => navigate("/sell")} // Navigate to the sell page
        style={{ marginBottom: "20px" }}
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
                image={"http://localhost:8080/ad/" + item.image[0]}
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
