'use client';

import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Tiktok, Instagram } from 'react-bootstrap-icons';
import Link from 'next/link';
import "../footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>US MARQUILLIES</h5>
            <p>Petit Village, Grande Passion.</p>
            <div className="social-icons d-flex">
              <a href="https://www.tiktok.com/@us.marquillies" target="_blank" rel="noopener noreferrer"><Tiktok /></a>
              <a href="https://www.facebook.com/USMarquilliesfootball" target="_blank" rel="noopener noreferrer"><Facebook /></a>
              <a href="https://www.instagram.com/us.marquillies" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Liens Rapides</h5>
            <ul className="list-unstyled">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/actualites">Actualités</Link></li>
              <li><Link href="/equipes">Équipes</Link></li>
              <li><Link href="/resultats">Calendrier/Résultats</Link></li>
              <li><Link href="/club">Le Club</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <p>
              Stade Municipal<br />
              Rue de la bourse, 59147 Marquillies<br />
              Email: <a href="mailto:contact.usmarquillies@gmail.com">contact.usmarquillies@gmail.com</a>
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} US Marquillies. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
