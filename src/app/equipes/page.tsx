'use client';

import { Container, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface StrapiBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
  level?: number; // Ajout de la propriété optionnelle 'level' pour les titres
}

interface Equipe {
  id: number;
  Nom: string;
  Division: string;
  Description: StrapiBlock[];
  Photo: {
    url: string;
    width: number;
    height: number;
  };
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
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${equipe.Photo.url}`}
                      alt={`Logo ${equipe.Nom}`}
                      width={equipe.Photo.width}
                      height={equipe.Photo.height}
                      layout="responsive"
                    />
                  </div>
                )}
                <div>{renderRichText(equipe.Description)}</div>
                <Card.Link href="#">Voir l&apos;effectif</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}