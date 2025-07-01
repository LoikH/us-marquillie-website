'use client';

import { Container, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Article {
  id: number;
  documentId: string;
  Titre: string;
  Contenu: string;
  DatePublication: string;
}

export default function Actualites() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    axios.get('http://localhost:1337/api/articles')
      .then(response => {
        setArticles(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  if (!isClient) {
    return null; // Ne rien rendre côté serveur
  }

  return (
    <Container className="mt-4">
      <h1>Actualités</h1>
      <Row>
        {articles.map(article => (
          article && (
            <Col md={4} className="mb-4" key={article.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{article.Titre}</Card.Title>
                  <Card.Text>
                    {/* Affichez un extrait du contenu si nécessaire */}
                  </Card.Text>
                  <Card.Link href={`/actualites/${article.documentId}`}>Lire la suite</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
}
