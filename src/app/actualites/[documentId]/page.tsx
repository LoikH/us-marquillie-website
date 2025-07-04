'use client';

import { Container, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface StrapiBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
  level?: number; // Ajout de la propriété optionnelle 'level' pour les titres
}

interface Article {
  id: number;
  documentId: string;
  Titre: string;
  Contenu: StrapiBlock[];
  DatePublication: string;
  ImagePrincipale: {
    url: string;
    width: number;
    height: number;
  };
}

// Fonction pour rendre le contenu riche de Strapi
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
      // Ajoutez d'autres types de blocs (list, image, etc.) si nécessaire
      default:
        return null;
    }
  });
};

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const params = useParams();
  const documentId = params.documentId;

  useEffect(() => {
    if (documentId) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles/${documentId}?populate=ImagePrincipale`)
        .then(response => {
          setArticle(response.data.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération de l'article:", error);
        });
    }
  }, [documentId]);

  if (!article) {
    return <p>Chargement...</p>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h1>{article.Titre}</h1>
          <p className="text-muted">Publié le {new Date(article.DatePublication).toLocaleDateString()}</p>
          <Row>
            <Col md={8}>
              <div>{renderRichText(article.Contenu)}</div>
            </Col>
            <Col md={4}>
              {article.ImagePrincipale && (
                <Image
                  src={article.ImagePrincipale.url}
                  alt={article.Titre}
                  width={article.ImagePrincipale.width}
                  height={article.ImagePrincipale.height}
                  layout="responsive"
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

