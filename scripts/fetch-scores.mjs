// Récupère les scores de la Coupe du Monde depuis l'API gratuite
// football-data.org (jeton gratuit) et écrit public/results.json, mappé sur
// les identifiants de matchs de l'application.
//
// Lancé par le workflow GitHub `.github/workflows/fetch-scores.yml`.
// Variable d'environnement requise : FOOTBALL_DATA_TOKEN (secret du dépôt).
//
// Sans jeton, ou en cas d'erreur réseau, le script n'échoue pas : il conserve
// simplement le fichier existant.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { matches } from '../src/data/tournament.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'results.json')

const TOKEN = process.env.FOOTBALL_DATA_TOKEN
const API = 'https://api.football-data.org/v4/competitions/WC/matches'

// Noms anglais (et variantes) de l'API -> code 3 lettres de l'app.
const ALIASES = {
  MEX: ['Mexico'], KOR: ['South Korea', 'Korea Republic'],
  CZE: ['Czech Republic', 'Czechia'], RSA: ['South Africa'],
  CAN: ['Canada'], SUI: ['Switzerland'], QAT: ['Qatar'],
  BIH: ['Bosnia and Herzegovina', 'Bosnia-Herzegovina'], BRA: ['Brazil'],
  MAR: ['Morocco'], SCO: ['Scotland'], HAI: ['Haiti'],
  USA: ['United States', 'USA'], AUS: ['Australia'],
  TUR: ['Turkey', 'Türkiye', 'Turkiye'], PAR: ['Paraguay'], GER: ['Germany'],
  CIV: ['Ivory Coast', "Côte d'Ivoire", 'Cote d Ivoire'], ECU: ['Ecuador'],
  CUW: ['Curaçao', 'Curacao'], NED: ['Netherlands'], JPN: ['Japan'],
  SWE: ['Sweden'], TUN: ['Tunisia'], BEL: ['Belgium'], EGY: ['Egypt'],
  IRN: ['Iran'], NZL: ['New Zealand'], ESP: ['Spain'], URU: ['Uruguay'],
  KSA: ['Saudi Arabia'], CPV: ['Cape Verde', 'Cabo Verde'], FRA: ['France'],
  SEN: ['Senegal'], NOR: ['Norway'], IRQ: ['Iraq'], ARG: ['Argentina'],
  AUT: ['Austria'], ALG: ['Algeria'], JOR: ['Jordan'], POR: ['Portugal'],
  COD: ['DR Congo', 'Congo DR', 'Democratic Republic of Congo'],
  UZB: ['Uzbekistan'], COL: ['Colombia'], ENG: ['England'], CRO: ['Croatia'],
  GHA: ['Ghana'], PAN: ['Panama']
}

const norm = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

// Index normalisé : nom -> code
const NAME_TO_CODE = {}
for (const [code, names] of Object.entries(ALIASES)) {
  NAME_TO_CODE[norm(code)] = code
  for (const n of names) NAME_TO_CODE[norm(n)] = code
}

function resolveCode(team) {
  if (!team) return null
  const candidates = [team.tla, team.name, team.shortName]
  for (const c of candidates) {
    const code = NAME_TO_CODE[norm(c)]
    if (code) return code
  }
  return null
}

// Index des matchs de l'app, orientation domicile>extérieur -> id
const FIXTURES = {}
for (const m of matches) FIXTURES[`${m.home}>${m.away}`] = m.id

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8')).results || {}
  } catch {
    return {}
  }
}

async function save(results) {
  await mkdir(dirname(OUT), { recursive: true })
  const payload = { updated: new Date().toISOString(), results }
  await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n')
}

async function main() {
  const results = await readExisting()

  if (!TOKEN) {
    console.log('FOOTBALL_DATA_TOKEN absent : conservation du fichier existant.')
    await save(results)
    return
  }

  let data
  try {
    const res = await fetch(API, { headers: { 'X-Auth-Token': TOKEN } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data = await res.json()
  } catch (e) {
    console.warn('Échec de récupération des scores :', e.message)
    await save(results)
    return
  }

  let updated = 0
  for (const m of data.matches || []) {
    if (!['IN_PLAY', 'PAUSED', 'FINISHED'].includes(m.status)) continue
    const ft = m.score?.fullTime
    if (!ft || !Number.isFinite(ft.home) || !Number.isFinite(ft.away)) continue

    const hc = resolveCode(m.homeTeam)
    const ac = resolveCode(m.awayTeam)
    if (!hc || !ac) continue

    if (FIXTURES[`${hc}>${ac}`]) {
      results[FIXTURES[`${hc}>${ac}`]] = { h: ft.home, a: ft.away }
      updated += 1
    } else if (FIXTURES[`${ac}>${hc}`]) {
      results[FIXTURES[`${ac}>${hc}`]] = { h: ft.away, a: ft.home }
      updated += 1
    }
  }

  await save(results)
  console.log(`Scores mis à jour : ${updated} match(s), ${Object.keys(results).length} au total.`)
}

main().catch(async (e) => {
  console.warn('Erreur inattendue :', e.message)
  process.exit(0)
})
