import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Creating a navbar for the app
function myNavbar() {
  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);
  console.log(decoded);
  console.log(decoded.role);

  if (decoded.role === "admin") {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              {/* endpoint for items-wanted */}
              <Nav.Link as={Link} to="/api/items-for-sale">
                Items For Sale
              </Nav.Link>
              <Nav.Link as={Link} to="/api/items-wanted">
                Items Wanted
              </Nav.Link>
              <Nav.Link as={Link} to="/api/academic-services">
                Academic Services
              </Nav.Link>
              <Nav.Link
                className="mx-auto navbar-brand"
                as={Link}
                to="/all-users"
              >
                Manage Users
              </Nav.Link>
              <Nav.Link className="d-flex" as={Link} to="/edit-profile">
                Edit Profile
              </Nav.Link>
              <Nav.Link className="d-flex" as={Link} to="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </>
    );
  } else {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              {/* endpoint for items-wanted */}
              <Nav.Link as={Link} to="/api/items-for-sale">
                Items For Sale
              </Nav.Link>
              <Nav.Link as={Link} to="/api/items-wanted">
                Items Wanted
              </Nav.Link>
              <Nav.Link as={Link} to="/api/academic-services">
                Academic Services
              </Nav.Link>
              <Nav.Link className="d-flex" as={Link} to="/edit-profile">
                Edit Profile
              </Nav.Link>
              <Nav.Link className="d-flex" as={Link} to="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </>
    );
  }
}

export default myNavbar;
