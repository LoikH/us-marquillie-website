'use client';

import { Container, Row, Col, Card } from "react-bootstrap";

export default function Club() {
  return (
    <Container className="mt-4">
      <h1>Le Club US MARQUILLIE</h1>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Notre Histoire</Card.Title>
              <Card.Text>
                Fondé en [Année de fondation], l'US Marquillie est un club de football ancré dans la communauté locale. Depuis ses débuts, le club s'est engagé à promouvoir les valeurs sportives et le développement des jeunes talents.
                <br /><br />
                Au fil des ans, l'US Marquillie a connu de nombreux succès, gravissant les échelons et formant des générations de footballeurs passionnés. Notre histoire est riche de moments mémorables, de victoires partagées et d'un esprit d'équipe inébranlable.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Contactez-nous</Card.Title>
              <Card.Text>
                <strong>Adresse :</strong> [Adresse du Stade/Siège Social]
                <br />
                <strong>Téléphone :</strong> [Numéro de Téléphone]
                <br />
                <strong>Email :</strong> [Adresse Email]
                <br /><br />
                N'hésitez pas à nous contacter pour toute question ou information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Où nous trouver ?</Card.Title>
              <div style={{ height: '400px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Emplacement pour la carte Google Maps ou autre service de cartographie.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
