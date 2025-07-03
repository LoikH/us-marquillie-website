'use client';

import { Container, Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Article {
  id: number;
  documentId: string;
  Titre: string;
  Contenu: any; // Le contenu riche est un objet complexe
  DatePublication: string;
  ImagePrincipale: {
    url: string;
    width: number;
    height: number;
  };
}

// Fonction pour rendre le contenu riche de Strapi (copiée depuis la page de détail)
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
