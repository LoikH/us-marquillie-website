'use client';

import { Container, Card, Row, Col } from "react-bootstrap";
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

// Fonction pour rendre un extrait du contenu riche
const renderRichTextExcerpt = (content: any, maxLength: number = 150) => {
  if (!content || !Array.isArray(content)) {
    return "";
  }
  let excerpt = "";
  for (const block of content) {
    if (block.type === 'paragraph' && block.children && block.children.length > 0) {
      for (const child of block.children) {
        if (child.type === 'text') {
          excerpt += child.text;
          if (excerpt.length >= maxLength) {
            return excerpt.substring(0, maxLength) + '...';
          }
        }
      }
    }
  }
  return excerpt;
};

export default function Home() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [prochainsMatchs, setProchainsMatchs] = useState<Match[]>([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/articles?sort=DatePublication:desc&pagination[limit]=2&populate=ImagePrincipale')
      .then(response => {
        setLatestArticles(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des derniers articles:', error);
      });

    axios.get('http://localhost:1337/api/competitions?populate=equipe')
      .then(response => {
        setCompetitions(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des compétitions:', error);
      });

    axios.get('http://localhost:1337/api/matches?filters[EstJoue][$eq]=false&sort=DateMatch:asc&populate=competition')
      .then(response => {
        setProchainsMatchs(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des prochains matchs:', error);
      });
  }, []);

  return (
    <>
      <main>
        <Container className="mt-4">
          <Row className="align-items-center mb-4">
            <Col md={12}>
              <h1>Bienvenue à l'US MARQUILLIES</h1>
              <p>Le club de football passionné de votre région !</p>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <h2>Dernières actualités</h2>
              {latestArticles.map(article => (
                <Card className="mb-3" key={article.id}>
                  <Card.Body>
                    <Row>
                      {article.ImagePrincipale && (
                        <Col xs={4} md={3}>
                          <Image
                            src={`http://localhost:1337${article.ImagePrincipale.url}`}
                            alt={article.Titre}
                            width={100}
                            height={100}
                            objectFit="cover"
                          />
                        </Col>
                      )}
                      <Col>
                        <Card.Title>{article.Titre}</Card.Title>
                        <Card.Text>{renderRichTextExcerpt(article.Contenu)}</Card.Text>
                        <Card.Link href={`/actualites/${article.documentId}`}>Lire la suite</Card.Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={4}>
              <h2>Prochains matchs</h2>
              {competitions.map(competition => {
                const prochainMatch = prochainsMatchs.find(match => match.competition.id === competition.id);
                return (
                  <Card className="mb-3" key={competition.id}>
                    <Card.Header>{competition.equipe.Nom}</Card.Header>
                    <Card.Body>
                      {prochainMatch ? (
                        <>
                          <Card.Title>{prochainMatch.EquipeDomicile} vs {prochainMatch.EquipeExterieur}</Card.Title>
                          <Card.Text>
                            {new Date(prochainMatch.DateMatch).toLocaleDateString()} à {prochainMatch.HeureMatch}
                          </Card.Text>
                        </>
                      ) : (
                        <Card.Text>Aucun match prévu pour le moment.</Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h2>Dernières vidéos TikTok</h2>
              <Row>
                <Col md={6}>
                  <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@us.marquillies/video/7384349564865645856" data-video-id="7384349564865645856" style={{maxWidth: '605px', minWidth: '325px'}} > <section> <a target="_blank" title="@us.marquillies" href="https://www.tiktok.com/@us.marquillies?refer=embed">@us.marquillies</a> <p></p> <a target="_blank" title="♬ son original - US MARQUILLIES" href="https://www.tiktok.com/music/son-original-7384349591553952544?refer=embed">♬ son original - US MARQUILLIES</a> </section> </blockquote>
                </Col>
                <Col md={6}>
                  <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@us.marquillies/video/7381838643734056224" data-video-id="7381838643734056224" style={{maxWidth: '605px', minWidth: '325px'}} > <section> <a target="_blank" title="@us.marquillies" href="https://www.tiktok.com/@us.marquillies?refer=embed">@us.marquillies</a> <p></p> <a target="_blank" title="♬ son original - US MARQUILLIES" href="https://www.tiktok.com/music/son-original-7381838619809942208?refer=embed">♬ son original - US MARQUILLIES</a> </section> </blockquote>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}


