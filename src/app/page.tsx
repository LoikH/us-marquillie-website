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

export default function Home() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Récupère les 2 derniers articles, triés par date de publication
    axios.get('http://localhost:1337/api/articles?sort=DatePublication:desc&pagination[limit]=2')
      .then(response => {
        setLatestArticles(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des derniers articles:', error);
      });
  }, []);

  return (
    <>
      <main>
        <Container className="mt-4">
          <Row className="align-items-center mb-4">
            <Col md={12}>
              <h1>Bienvenue à l'US MARQUILLIE</h1>
              <p>Le club de football passionné de votre région !</p>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <h2>Dernières actualités</h2>
              {latestArticles.map(article => (
                <Card className="mb-3" key={article.id}>
                  <Card.Body>
                    <Card.Title>{article.Titre}</Card.Title>
                    <Card.Link href={`/actualites/${article.documentId}`}>Lire la suite</Card.Link>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={4}>
              <h2>Prochains matchs</h2>
              <Card>
                <Card.Body>
                  <Card.Title>US Marquillie vs FC Adversaire</Card.Title>
                  <Card.Text>
                    Dimanche 30 juin 2025 à 15h00
                  </Card.Text>
                </Card.Body>
              </Card>
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

