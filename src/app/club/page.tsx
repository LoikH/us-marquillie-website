'use client';

import { Container, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ClubData {
  Histoire: any; // Contenu riche
  Adresse: string;
  Telephone: string;
  Email: string;
  LienCarte: string;
}

// Fonction pour rendre le contenu riche de Strapi (réutilisée)
const renderRichText = (content: any) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index}>{block.children.map((child: any, i: number) => {
          if (child.type === 'text') {
            return <span key={i}>{child.text}</span>;
          }
          return null;
        })}</p>;
      case 'heading':
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index}>{block.children.map((child: any, i: number) => {
          if (child.type === 'text') {
            return <span key={i}>{child.text}</span>;
          }
          return null;
        })}</HeadingTag>;
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
