'use client';

import { Container, Table } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Match {
  id: number;
  EquipeDomicile: string;
  EquipeExterieur: string;
  DateMatch: string;
  HeureMatch: string;
  Competition: string;
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
  Competition: string;
}

export default function Resultats() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [classements, setClassements] = useState<Classement[]>([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/matches?sort=DateMatch:asc&populate=ImageMatch')
      .then(response => {
        setMatches(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matchs:', error);
      });

    axios.get('http://localhost:1337/api/classements?sort=Competition:asc,Position:asc')
      .then(response => {
        setClassements(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des classements:', error);
      });
  }, []);

  const prochainsMatchs = matches.filter(match => !match.EstJoue);
  const derniersResultats = matches.filter(match => match.EstJoue);

  // Regrouper les classements par compétition
  const classementsParCompetition: { [key: string]: Classement[] } = {};
  classements.forEach(ligne => {
    if (!classementsParCompetition[ligne.Competition]) {
      classementsParCompetition[ligne.Competition] = [];
    }
    classementsParCompetition[ligne.Competition].push(ligne);
  });

  return (
    <Container className="mt-4">
      <h1>Calendrier & Résultats</h1>

      <h2 className="mt-4">Prochains Matchs</h2>
      {prochainsMatchs.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Compétition</th>
              <th>Match</th>
              <th>Lieu</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {prochainsMatchs.map(match => (
              <tr key={match.id}>
                <td>{new Date(match.DateMatch).toLocaleDateString()}</td>
                <td>{match.HeureMatch}</td>
                <td>{match.Competition}</td>
                <td>{match.EquipeDomicile} vs {match.EquipeExterieur}</td>
                <td>{match.Lieu}</td>
                <td>
                  {match.ImageMatch && (
                    <Image
                      src={`http://localhost:1337${match.ImageMatch.url}`}
                      alt={`Image du match ${match.EquipeDomicile} vs ${match.EquipeExterieur}`}
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aucun prochain match pour le moment.</p>
      )}

      <h2 className="mt-4">Derniers Résultats</h2>
      {derniersResultats.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Compétition</th>
              <th>Match</th>
              <th>Score</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {derniersResultats.map(match => (
              <tr key={match.id}>
                <td>{new Date(match.DateMatch).toLocaleDateString()}</td>
                <td>{match.Competition}</td>
                <td>{match.EquipeDomicile} {match.ScoreDomicile} - {match.ScoreExterieur} {match.EquipeExterieur}</td>
                <td>{match.ScoreDomicile} - {match.ScoreExterieur}</td>
                <td>
                  {match.ImageMatch && (
                    <Image
                      src={`http://localhost:1337${match.ImageMatch.url}`}
                      alt={`Image du match ${match.EquipeDomicile} vs ${match.EquipeExterieur}`}
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aucun résultat récent pour le moment.</p>
      )}

      <h2 className="mt-4">Classements</h2>
      {Object.keys(classementsParCompetition).length > 0 ? (
        Object.keys(classementsParCompetition).map(competition => (
          <div key={competition} className="mb-5">
            <h3>{competition}</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Équipe</th>
                  <th>Pts</th>
                  <th>J</th>
                  <th>G</th>
                  <th>N</th>
                  <th>P</th>
                  <th>BP</th>
                  <th>BC</th>
                  <th>+/-</th>
                </tr>
              </thead>
              <tbody>
                {classementsParCompetition[competition].map(ligne => (
                  <tr key={ligne.id}>
                    <td>{ligne.Position}</td>
                    <td>{ligne.NomEquipe}</td>
                    <td>{ligne.Points}</td>
                    <td>{ligne.Joues}</td>
                    <td>{ligne.Gagnes}</td>
                    <td>{ligne.Nuls}</td>
                    <td>{ligne.Perdus}</td>
                    <td>{ligne.ButsPour}</td>
                    <td>{ligne.ButsContre}</td>
                    <td>{ligne.DifferenceButs}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <p>Aucun classement disponible pour le moment.</p>
      )}
    </Container>
  );
}