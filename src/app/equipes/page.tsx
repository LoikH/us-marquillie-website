'use client';

import { Container, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Equipe {
  id: number;
  Nom: string;
  Division: string;
  Description: any; // Contenu riche
  Photo: {
    url: string;
    width: number;
    height: number;
  };
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

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/equipes?populate=Photo`)
      .then(response => {
        setEquipes(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des équipes:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h1>Nos Équipes</h1>
      <Row>
        {equipes.map(equipe => (
          <Col md={6} className="mb-4" key={equipe.id}>
            <Card>
              <Card.Body>
                <Card.Title>{equipe.Nom} ({equipe.Division})</Card.Title>
                {equipe.Photo && (
                  <div className="text-center mb-3">
                    <Image
                      src={`http://localhost:1337${equipe.Photo.url}`}
                      alt={`Logo ${equipe.Nom}`}
                      width={equipe.Photo.width}
                      height={equipe.Photo.height}
                      layout="responsive"
                    />
                  </div>
                )}
                <div>{renderRichText(equipe.Description)}</div>
                <Card.Link href="#">Voir l'effectif</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
