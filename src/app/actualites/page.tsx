'use client';

import { Container, Card } from "react-bootstrap";
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

// Fonction pour rendre le contenu riche de Strapi (copiée depuis la page de détail)
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

export default function Actualites() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=DatePublication:desc&populate=ImagePrincipale`)
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
      <h1>Actualités du Club</h1>
      {
        articles.length > 0 ? (
          articles.map(article => (
            article && (
              <Card className="mb-4" key={article.id}>
                <Card.Body>
                  <h2>{article.Titre}</h2>
                  <p className="text-muted">Publié le {new Date(article.DatePublication).toLocaleDateString()}</p>
                  {article.ImagePrincipale && (
                    <div className="mb-3">
                      <Image
                        src={`http://localhost:1337${article.ImagePrincipale.url}`}
                        alt={article.Titre}
                        width={600}
                        height={400}
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div>{renderRichText(article.Contenu)}</div>
                </Card.Body>
              </Card>
            )
          ))
        ) : (
          <p>Aucune actualité disponible pour le moment.</p>
        )
      }
    </Container>
  );
}
