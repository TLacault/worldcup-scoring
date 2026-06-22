// Règles de score :
//   - score exact deviné            -> 3 points
//   - bon résultat (1/N/2), y compris match nul deviné -> 1 point
//   - sinon                          -> 0 point
//
// Un pronostic n'est comptabilisé que lorsqu'un score réel a été saisi.

function isComplete(s) {
  return s && Number.isFinite(s.h) && Number.isFinite(s.a)
}

// Points d'un match. Renvoie `null` tant qu'aucun score réel n'est saisi
// (le match n'entre alors pas dans le calcul du total).
export function matchPoints(pred, result) {
  if (!isComplete(result)) return null
  if (!isComplete(pred)) return 0
  if (pred.h === result.h && pred.a === result.a) return 3
  return Math.sign(pred.h - pred.a) === Math.sign(result.h - result.a) ? 1 : 0
}

// Agrège les points sur une liste de matchs.
export function tally(matches, predictions, results) {
  const stats = { total: 0, exact: 0, correct: 0, played: 0 }
  for (const m of matches) {
    const pts = matchPoints(predictions[m.id], results[m.id])
    if (pts === null) continue
    stats.played += 1
    stats.total += pts
    if (pts === 3) stats.exact += 1
    else if (pts === 1) stats.correct += 1
  }
  return stats
}
