import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
// import IconButton from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MyAds = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [EditItem, setEditItem] = useState({
    title: "",
    description: "",
    price: 0,
    category: "academic services",
  });
  const tok = localStorage.getItem("login");
  const decode = jwtDecode(tok);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setEditItem({ ...EditItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEditItem({ ...EditItem, images: files });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editform = new FormData();
      editform.append("title", EditItem.title);
      editform.append("description", EditItem.description);
      editform.append("price", EditItem.price);
      editform.append("category", EditItem.category);
      editform.append("post_person_id", EditItem.post_person_id);
      if (EditItem.images && EditItem.images.length > 0) {
        EditItem.images.forEach((file) => {
          editform.append("image", file);
        });
      }

      const response = await api.put(`/ad/${EditItem._id}`, editform, {
        headers: {
          "Content-Type": "multipart/form-data",
          post_person_id: EditItem.post_person_id,
        },
      });
      if (response.status === 200) {
        alert("Ad Changed successfully!");
      } else {
        alert("Ad Change failed");
      }
      setTimeout(() => {
        fetchItems();
      }, 500);
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };

  const fetchItems = async () => {
    try {
      const response = await api.get("/ad");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  const handleDelete = (item) => {
    const config = {
      headers: { post_person_id: item.post_person_id },
    };

    api.delete("/ad/" + item._id, config);
    setTimeout(() => {
      fetchItems();
    }, 500);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    handleClickOpen();
  };

  let itemsDisp;

  const filteredItems = items.filter(
    (item) => item.post_person_id === decode.id
  );
  if (decode.role === "admin") {
    itemsDisp = items;
  } else {
    itemsDisp = filteredItems;
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Ad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change any aspect of your Ad and when done press save!

          </DialogContentText>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={EditItem.title}
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
                  value={EditItem.description}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  label="Price(if applicable)"
                  name="price"
                  value={EditItem.price}
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
                    value={EditItem.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value="academic services">
                      Academic Services
                    </MenuItem>
                    <MenuItem value="items wanted">Items Wanted</MenuItem>
                    <MenuItem value="items for sale">Items for Sale</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <input
                  name="Images"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ marginRight: "10px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button onClick={handleClose} variant="contained" color="info">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Typography variant="h2" gutterBottom>
        MyAds
      </Typography>
      <Grid container spacing={3}>
        {itemsDisp.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ p: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={"http://localhost:8080/ad/" + item.image[0]}
                alt={item.name}
              />
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => handleDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyAds;
