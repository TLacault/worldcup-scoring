// Données officielles de la phase de groupes de la Coupe du Monde 2026.
// 12 groupes (A-L) de 4 équipes, 72 matchs au total.
//
// `kickoff` est l'instant UTC du coup d'envoi (ISO 8601). L'heure de Paris
// est calculée à l'affichage (voir utils/datetime.js), ce qui gère
// automatiquement les matchs nord-américains qui débutent après minuit
// heure de Paris.
//
// Source : calendrier publié (heures GMT) converti en UTC.

export const groups = [
  { id: 'A', teams: ['MEX', 'KOR', 'CZE', 'RSA'] },
  { id: 'B', teams: ['CAN', 'SUI', 'QAT', 'BIH'] },
  { id: 'C', teams: ['BRA', 'MAR', 'SCO', 'HAI'] },
  { id: 'D', teams: ['USA', 'AUS', 'TUR', 'PAR'] },
  { id: 'E', teams: ['GER', 'CIV', 'ECU', 'CUW'] },
  { id: 'F', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  { id: 'G', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  { id: 'H', teams: ['ESP', 'URU', 'KSA', 'CPV'] },
  { id: 'I', teams: ['FRA', 'SEN', 'NOR', 'IRQ'] },
  { id: 'J', teams: ['ARG', 'AUT', 'ALG', 'JOR'] },
  { id: 'K', teams: ['POR', 'COD', 'UZB', 'COL'] },
  { id: 'L', teams: ['ENG', 'CRO', 'GHA', 'PAN'] }
]

export const matches = [
  // Groupe A
  { id: 'A1', group: 'A', home: 'MEX', away: 'RSA', kickoff: '2026-06-11T19:00:00Z' },
  { id: 'A2', group: 'A', home: 'KOR', away: 'CZE', kickoff: '2026-06-12T02:00:00Z' },
  { id: 'A3', group: 'A', home: 'CZE', away: 'RSA', kickoff: '2026-06-18T16:00:00Z' },
  { id: 'A4', group: 'A', home: 'MEX', away: 'KOR', kickoff: '2026-06-19T01:00:00Z' },
  { id: 'A5', group: 'A', home: 'CZE', away: 'MEX', kickoff: '2026-06-25T01:00:00Z' },
  { id: 'A6', group: 'A', home: 'RSA', away: 'KOR', kickoff: '2026-06-25T01:00:00Z' },

  // Groupe B
  { id: 'B1', group: 'B', home: 'CAN', away: 'BIH', kickoff: '2026-06-12T19:00:00Z' },
  { id: 'B2', group: 'B', home: 'QAT', away: 'SUI', kickoff: '2026-06-13T19:00:00Z' },
  { id: 'B3', group: 'B', home: 'SUI', away: 'BIH', kickoff: '2026-06-18T19:00:00Z' },
  { id: 'B4', group: 'B', home: 'CAN', away: 'QAT', kickoff: '2026-06-18T22:00:00Z' },
  { id: 'B5', group: 'B', home: 'SUI', away: 'CAN', kickoff: '2026-06-24T19:00:00Z' },
  { id: 'B6', group: 'B', home: 'BIH', away: 'QAT', kickoff: '2026-06-24T19:00:00Z' },

  // Groupe C
  { id: 'C1', group: 'C', home: 'BRA', away: 'MAR', kickoff: '2026-06-13T22:00:00Z' },
  { id: 'C2', group: 'C', home: 'HAI', away: 'SCO', kickoff: '2026-06-14T01:00:00Z' },
  { id: 'C3', group: 'C', home: 'SCO', away: 'MAR', kickoff: '2026-06-19T22:00:00Z' },
  { id: 'C4', group: 'C', home: 'BRA', away: 'HAI', kickoff: '2026-06-20T00:30:00Z' },
  { id: 'C5', group: 'C', home: 'SCO', away: 'BRA', kickoff: '2026-06-24T22:00:00Z' },
  { id: 'C6', group: 'C', home: 'MAR', away: 'HAI', kickoff: '2026-06-24T22:00:00Z' },

  // Groupe D
  { id: 'D1', group: 'D', home: 'USA', away: 'PAR', kickoff: '2026-06-13T01:00:00Z' },
  { id: 'D2', group: 'D', home: 'AUS', away: 'TUR', kickoff: '2026-06-14T04:00:00Z' },
  { id: 'D3', group: 'D', home: 'USA', away: 'AUS', kickoff: '2026-06-19T19:00:00Z' },
  { id: 'D4', group: 'D', home: 'TUR', away: 'PAR', kickoff: '2026-06-20T03:00:00Z' },
  { id: 'D5', group: 'D', home: 'TUR', away: 'USA', kickoff: '2026-06-26T02:00:00Z' },
  { id: 'D6', group: 'D', home: 'PAR', away: 'AUS', kickoff: '2026-06-26T02:00:00Z' },

  // Groupe E
  { id: 'E1', group: 'E', home: 'GER', away: 'CUW', kickoff: '2026-06-14T17:00:00Z' },
  { id: 'E2', group: 'E', home: 'CIV', away: 'ECU', kickoff: '2026-06-14T23:00:00Z' },
  { id: 'E3', group: 'E', home: 'GER', away: 'CIV', kickoff: '2026-06-20T20:00:00Z' },
  { id: 'E4', group: 'E', home: 'ECU', away: 'CUW', kickoff: '2026-06-21T03:00:00Z' },
  { id: 'E5', group: 'E', home: 'ECU', away: 'GER', kickoff: '2026-06-25T20:00:00Z' },
  { id: 'E6', group: 'E', home: 'CUW', away: 'CIV', kickoff: '2026-06-25T20:00:00Z' },

  // Groupe F
  { id: 'F1', group: 'F', home: 'NED', away: 'JPN', kickoff: '2026-06-14T20:00:00Z' },
  { id: 'F2', group: 'F', home: 'SWE', away: 'TUN', kickoff: '2026-06-15T02:00:00Z' },
  { id: 'F3', group: 'F', home: 'NED', away: 'SWE', kickoff: '2026-06-20T17:00:00Z' },
  { id: 'F4', group: 'F', home: 'TUN', away: 'JPN', kickoff: '2026-06-21T04:00:00Z' },
  { id: 'F5', group: 'F', home: 'JPN', away: 'SWE', kickoff: '2026-06-25T23:00:00Z' },
  { id: 'F6', group: 'F', home: 'TUN', away: 'NED', kickoff: '2026-06-25T23:00:00Z' },

  // Groupe G
  { id: 'G1', group: 'G', home: 'BEL', away: 'EGY', kickoff: '2026-06-15T19:00:00Z' },
  { id: 'G2', group: 'G', home: 'IRN', away: 'NZL', kickoff: '2026-06-16T01:00:00Z' },
  { id: 'G3', group: 'G', home: 'BEL', away: 'IRN', kickoff: '2026-06-21T19:00:00Z' },
  { id: 'G4', group: 'G', home: 'NZL', away: 'EGY', kickoff: '2026-06-22T01:00:00Z' },
  { id: 'G5', group: 'G', home: 'EGY', away: 'IRN', kickoff: '2026-06-27T03:00:00Z' },
  { id: 'G6', group: 'G', home: 'NZL', away: 'BEL', kickoff: '2026-06-27T03:00:00Z' },

  // Groupe H
  { id: 'H1', group: 'H', home: 'ESP', away: 'CPV', kickoff: '2026-06-15T16:00:00Z' },
  { id: 'H2', group: 'H', home: 'KSA', away: 'URU', kickoff: '2026-06-15T22:00:00Z' },
  { id: 'H3', group: 'H', home: 'ESP', away: 'KSA', kickoff: '2026-06-21T16:00:00Z' },
  { id: 'H4', group: 'H', home: 'URU', away: 'CPV', kickoff: '2026-06-21T22:00:00Z' },
  { id: 'H5', group: 'H', home: 'CPV', away: 'KSA', kickoff: '2026-06-27T00:00:00Z' },
  { id: 'H6', group: 'H', home: 'URU', away: 'ESP', kickoff: '2026-06-27T00:00:00Z' },

  // Groupe I
  { id: 'I1', group: 'I', home: 'FRA', away: 'SEN', kickoff: '2026-06-16T19:00:00Z' },
  { id: 'I2', group: 'I', home: 'IRQ', away: 'NOR', kickoff: '2026-06-16T22:00:00Z' },
  { id: 'I3', group: 'I', home: 'FRA', away: 'IRQ', kickoff: '2026-06-22T21:00:00Z' },
  { id: 'I4', group: 'I', home: 'NOR', away: 'SEN', kickoff: '2026-06-23T00:00:00Z' },
  { id: 'I5', group: 'I', home: 'NOR', away: 'FRA', kickoff: '2026-06-26T19:00:00Z' },
  { id: 'I6', group: 'I', home: 'SEN', away: 'IRQ', kickoff: '2026-06-26T19:00:00Z' },

  // Groupe J
  { id: 'J1', group: 'J', home: 'ARG', away: 'ALG', kickoff: '2026-06-17T01:00:00Z' },
  { id: 'J2', group: 'J', home: 'AUT', away: 'JOR', kickoff: '2026-06-17T04:00:00Z' },
  { id: 'J3', group: 'J', home: 'ARG', away: 'AUT', kickoff: '2026-06-22T17:00:00Z' },
  { id: 'J4', group: 'J', home: 'JOR', away: 'ALG', kickoff: '2026-06-23T03:00:00Z' },
  { id: 'J5', group: 'J', home: 'ALG', away: 'AUT', kickoff: '2026-06-28T02:00:00Z' },
  { id: 'J6', group: 'J', home: 'JOR', away: 'ARG', kickoff: '2026-06-28T02:00:00Z' },

  // Groupe K
  { id: 'K1', group: 'K', home: 'POR', away: 'COD', kickoff: '2026-06-17T17:00:00Z' },
  { id: 'K2', group: 'K', home: 'UZB', away: 'COL', kickoff: '2026-06-18T02:00:00Z' },
  { id: 'K3', group: 'K', home: 'POR', away: 'UZB', kickoff: '2026-06-23T17:00:00Z' },
  { id: 'K4', group: 'K', home: 'COL', away: 'COD', kickoff: '2026-06-24T02:00:00Z' },
  { id: 'K5', group: 'K', home: 'COL', away: 'POR', kickoff: '2026-06-27T23:30:00Z' },
  { id: 'K6', group: 'K', home: 'COD', away: 'UZB', kickoff: '2026-06-27T23:30:00Z' },

  // Groupe L
  { id: 'L1', group: 'L', home: 'ENG', away: 'CRO', kickoff: '2026-06-17T20:00:00Z' },
  { id: 'L2', group: 'L', home: 'GHA', away: 'PAN', kickoff: '2026-06-17T23:00:00Z' },
  { id: 'L3', group: 'L', home: 'ENG', away: 'GHA', kickoff: '2026-06-23T20:00:00Z' },
  { id: 'L4', group: 'L', home: 'PAN', away: 'CRO', kickoff: '2026-06-23T23:00:00Z' },
  { id: 'L5', group: 'L', home: 'PAN', away: 'ENG', kickoff: '2026-06-27T21:00:00Z' },
  { id: 'L6', group: 'L', home: 'CRO', away: 'GHA', kickoff: '2026-06-27T21:00:00Z' }
]
