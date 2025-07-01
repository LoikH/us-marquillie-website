'use client';

import { Container, Nav, Navbar } from "react-bootstrap";
import "../navbar.css";

export default function Navigation() {
  return (
    <Navbar className="navbar-custom" variant="dark">
      <Container>
        <Navbar.Brand href="/">US MARQUILLIES</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" style={{color: "white"}}>Accueil</Nav.Link>
          <Nav.Link href="/actualites" style={{color: "white"}}>Actualités</Nav.Link>
          <Nav.Link href="/equipes" style={{color: "white"}}>Équipes</Nav.Link>
          <Nav.Link href="/resultats" style={{color: "white"}}>Calendrier/Résultats</Nav.Link>
          <Nav.Link href="/club" style={{color: "white"}}>Le Club</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
