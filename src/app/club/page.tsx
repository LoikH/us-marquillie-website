'use client';

import { Container, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface StrapiBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
  level?: number; // Ajout de la propriété optionnelle 'level' pour les titres
}

interface ClubData {
  Histoire: StrapiBlock[];
  Adresse: string;
  Telephone: string;
  Email: string;
  LienCarte: string;
}

// Fonction pour rendre le contenu riche de Strapi (réutilisée)
const renderRichText = (content: StrapiBlock[]) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index}>{block.children.map((child) => child.text)}</p>;
      case 'heading':
        switch (block.level) {
          case 1: return <h1 key={index}>{block.children.map((child) => child.text)}</h1>;
          case 2: return <h2 key={index}>{block.children.map((child) => child.text)}</h2>;
          case 3: return <h3 key={index}>{block.children.map((child) => child.text)}</h3>;
          case 4: return <h4 key={index}>{block.children.map((child) => child.text)}</h4>;
          case 5: return <h5 key={index}>{block.children.map((child) => child.text)}</h5>;
          case 6: return <h6 key={index}>{block.children.map((child) => child.text)}</h6>;
          default: return <p key={index}>{block.children.map((child) => child.text)}</p>;
        }
      default:
        return null;
    }
  });
};

export default function Club() {
  const [clubData, setClubData] = useState<ClubData | null>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/club`)
      .then(response => {
        setClubData(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données du club:', error);
      });
  }, []);

  if (!clubData) {
    return <p>Chargement...</p>;
  }

  return (
    <Container className="mt-4">
      <h1>Le Club US MARQUILLIES</h1>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Notre Histoire</Card.Title>
              <div>{renderRichText(clubData.Histoire)}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Contactez-nous</Card.Title>
              <Card.Text>
                <strong>Adresse :</strong> {clubData.Adresse}
                <br />
                <strong>Téléphone :</strong> {clubData.Telephone}
                <br />
                <strong>Email :</strong> {clubData.Email}
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
              <div dangerouslySetInnerHTML={{ __html: clubData.LienCarte }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
