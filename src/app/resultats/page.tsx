'use client';

import { Container, Table, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Competition {
  id: number;
  Nom: string;
  equipe: {
    Nom: string;
  };
}

interface Match {
  id: number;
  EquipeDomicile: string;
  EquipeExterieur: string;
  DateMatch: string;
  HeureMatch: string;
  competition: {
    id: number;
  };
  Lieu: string;
  ScoreDomicile: number | null;
  ScoreExterieur: number | null;
  EstJoue: boolean;
  ImageMatch: {
    url: string;
    width: number;
    height: number;
  };
}

interface Classement {
  id: number;
  Position: number;
  NomEquipe: string;
  Points: number;
  Joues: number;
  Gagnes: number;
  Nuls: number;
  Perdus: number;
  ButsPour: number;
  ButsContre: number;
  DifferenceButs: number;
  competition: {
    id: number;
  };
}

export default function Resultats() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [classements, setClassements] = useState<Classement[]>([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/competitions?populate=equipe')
      .then(response => {
        setCompetitions(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des compétitions:', error);
      });

    axios.get('http://localhost:1337/api/matches?populate[0]=ImageMatch&populate[1]=competition')
      .then(response => {
        setMatches(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matchs:', error);
      });

    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/classements?populate=competition&sort=Position:asc`)
      .then(response => {
        setClassements(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des classements:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h1>Résultats & Classements</h1>

      {competitions.map(competition => {
        const prochainsMatchs = matches.filter(match => match.competition.id === competition.id && !match.EstJoue);
        const derniersResultats = matches.filter(match => match.competition.id === competition.id && match.EstJoue);
        const classementCompetition = classements.filter(ligne => ligne.competition.id === competition.id);

        return (
          <div key={competition.id} className="mb-5">
            <h2>{competition.equipe.Nom} - {competition.Nom}</h2>

            <Row>
              <Col md={6}>
                <h3>Prochains Matchs</h3>
                {prochainsMatchs.length > 0 ? (
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prochainsMatchs.map(match => (
                        <tr key={match.id}>
                          <td>{new Date(match.DateMatch).toLocaleDateString()}</td>
                          <td>{match.EquipeDomicile} vs {match.EquipeExterieur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Aucun prochain match.</p>
                )}

                <h3>Derniers Résultats</h3>
                {derniersResultats.length > 0 ? (
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Match</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {derniersResultats.map(match => (
                        <tr key={match.id}>
                          <td>{new Date(match.DateMatch).toLocaleDateString()}</td>
                          <td>{match.EquipeDomicile} vs {match.EquipeExterieur}</td>
                          <td>{match.ScoreDomicile} - {match.ScoreExterieur}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Aucun résultat récent.</p>
                )}
              </Col>

              <Col md={6}>
                <h3>Classement</h3>
                {classementCompetition.length > 0 ? (
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Pos.</th>
                        <th>Équipe</th>
                        <th>Pts</th>
                        <th>J</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classementCompetition.map(ligne => (
                        <tr key={ligne.id}>
                          <td>{ligne.Position}</td>
                          <td>{ligne.NomEquipe}</td>
                          <td>{ligne.Points}</td>
                          <td>{ligne.Joues}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Aucun classement disponible.</p>
                )}
              </Col>
            </Row>
          </div>
        );
      })}
    </Container>
  );
}
