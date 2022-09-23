import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";

function Header() {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="link" to="dashboard">
            Movielens
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link id="RouterNavLink" className="nav-link" to="dashboard">
              Dashboard
            </Link>
            <Link id="RouterNavLink" className="nav-link" to="movies">
              Movies
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
