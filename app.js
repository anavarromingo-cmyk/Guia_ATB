/*
 * app.js
 *
 * Contiene los datos y la lógica para la aplicación de guía antimicrobiana.
 * Esta aplicación es sólo orientativa; verifique siempre las pautas con la guía oficial.
 */

// Base de datos de regímenes empíricos por diagnóstico.
// Cada entrada contiene un nombre de diagnóstico y una lista de pautas.
const diagnosesData = [
  {
    name: "Adenitis cervical aguda no estreptocócica",
    regimens: [
      {
        scenario: "No ingreso",
        antibiotic: "Cefadroxilo",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 2,
        duration: "7 días",
        notes: "",
        reference: "【22732211749419†L50-L67】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Cloxacilina",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 4,
        duration: "2-3 días IV + 4-5 días VO (total 7 días)",
        notes:
          "Si ingreso en hospitalización a domicilio utilizar cefazolina 100 mg/kg/día en 3 dosis/día",
        reference: "【22732211749419†L50-L67】",
      },
    ],
  },
  {
    name: "Apendicitis aguda",
    regimens: [
      {
        scenario: "Gangrenosa sin perforación",
        antibiotic: "Cefoxitina",
        route: "IV",
        dose_mgkg_day: "120",
        doses_per_day: 3,
        duration: "1 día",
        notes: "",
        reference: "【22732211749419†L69-L98】",
      },
      {
        scenario: "Complicada",
        antibiotic: "Piperacilina‑tazobactam",
        route: "IV",
        dose_mgkg_day: "300",
        doses_per_day: 3,
        duration: "5-10 días (pauta completa IV)",
        notes: "",
        reference: "【22732211749419†L69-L98】",
      },
      {
        scenario: "Alergia a penicilina tipo I",
        antibiotic: "Gentamicina + Metronidazol",
        route: "IV",
        dose_mgkg_day: "5-7.5 + 30",
        doses_per_day: 1,
        duration: "Según tipo de apendicitis",
        notes: "Precisa monitorización",
        reference: "【22732211749419†L69-L98】",
      },
    ],
  },
  {
    name: "Absceso cerebral",
    regimens: [
      {
        scenario: "Diseminación hematógena (bacteriemia/endocarditis)",
        antibiotic: "Ceftriaxona + Metronidazol + Vancomicina",
        route: "IV",
        dose_mgkg_day: "100 + 40 + 45-60",
        doses_per_day: 1,
        duration: "4 semanas IV + 2 semanas VO (total 6 semanas; valorar 8 semanas)",
        notes: "",
        reference: "【22732211749419†L109-L130】",
      },
      {
        scenario: "Traumatismo/origen desconocido/postoperatorio neurocirugía",
        antibiotic: "Ceftazidima o Meropenem + Vancomicina",
        route: "IV",
        dose_mgkg_day: "150 o 60-120 + 45-60",
        doses_per_day: 3,
        duration: "4 semanas IV + 2 semanas VO",
        notes: "Usar ceftazidima si posibilidad de Pseudomonas; usar meropenem si afectación grave",
        reference: "【22732211749419†L131-L171】",
      },
    ],
  },
  {
    name: "Infecciones bucodentales",
    regimens: [
      {
        scenario: "No ingreso (1ª elección)",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "40-50",
        doses_per_day: 3,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L173-L190】",
      },
      {
        scenario: "No ingreso (alergia a betalactámicos)",
        antibiotic: "Metronidazol",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L173-L190】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "1-2 días IV + 5-6 días VO (total 5-7 días)",
        notes: "Sustituir por amoxicilina‑clavulánico VO 40-50 mg/kg/día en 3 dosis/día o asociar metronidazol si no hay mejoría en 48 h",
        reference: "【22732211749419†L173-L194】",
      },
    ],
  },
  {
    name: "Celulitis preseptal",
    regimens: [
      {
        scenario: "No ingreso (lesión externa)",
        antibiotic: "Cefadroxilo",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L218-L236】",
      },
      {
        scenario: "No ingreso (sin lesión externa)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L218-L236】",
      },
      {
        scenario: "Ingreso (lesión externa)",
        antibiotic: "Cloxacilina",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 4,
        duration: "2-3 días IV + 4-5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L218-L236】",
      },
      {
        scenario: "Ingreso (sin lesión externa)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "2-3 días IV + 4-5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L218-L236】",
      },
    ],
  },
  {
    name: "Celulitis orbitaria",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Ceftriaxona + Clindamicina",
        route: "IV",
        dose_mgkg_day: "50-100 + 40",
        doses_per_day: 1,
        duration: "3-4 días IV + 3-7 días VO (total 7-10 días)",
        notes: "",
        reference: "【22732211749419†L222-L236】",
      },
    ],
  },
  {
    name: "Infecciones cervicales profundas",
    regimens: [
      {
        scenario: "Periamigdalino",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "1-2 días IV + 8-9 días VO (total 10 días)",
        notes: "",
        reference: "【22732211749419†L250-L274】",
      },
      {
        scenario: "No periamigdalino",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "3-5 días IV + 5-11 días VO (total 10-14 días)",
        notes: "",
        reference: "【22732211749419†L250-L274】",
      },
      {
        scenario: "Afectación grave",
        antibiotic: "Ceftriaxona + Clindamicina",
        route: "IV",
        dose_mgkg_day: "50-100 + 40",
        doses_per_day: 1,
        duration: "3-5 días IV + 5-11 días VO (total 10-14 días)",
        notes: "Compromiso severo de la vía aérea",
        reference: "【22732211749419†L250-L274】",
      },
    ],
  },
  {
    name: "Infecciones cutáneas (celulitis, erisipela, etc.)",
    regimens: [
      {
        scenario: "No ingreso (1ª elección)",
        antibiotic: "Cefadroxilo",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 2,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "No ingreso (sospecha SARM)",
        antibiotic: "Trimetoprim‑sulfametoxazol",
        route: "VO",
        dose_mgkg_day: "8-10 (TMP)",
        doses_per_day: 2,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "No ingreso (sospecha anaerobios)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "40-50",
        doses_per_day: 3,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "No ingreso (alergia a penicilina)",
        antibiotic: "Clindamicina",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "Ingreso (1ª elección)",
        antibiotic: "Cloxacilina",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 3,
        duration: "2-3 días IV + 4-8 días VO (total 7-10 días)",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "Ingreso (sospecha SARM)",
        antibiotic: "Trimetoprim‑sulfametoxazol",
        route: "IV",
        dose_mgkg_day: "15-20 (TMP)",
        doses_per_day: 2,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "Ingreso (sospecha anaerobios)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
      {
        scenario: "Ingreso (alergia a penicilina)",
        antibiotic: "Clindamicina",
        route: "IV",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L277-L321】",
      },
    ],
  },
  {
    name: "Impétigo no complicado",
    regimens: [
      {
        scenario: "1ª elección",
        antibiotic: "Ácido fusídico",
        route: "Tópico",
        dose_mgkg_day: "-",
        doses_per_day: 3,
        duration: "5 días",
        notes: "Aplicación tópica",
        reference: "【22732211749419†L321-L334】",
      },
      {
        scenario: "Con afectación nasal",
        antibiotic: "Mupirocina",
        route: "Tópico",
        dose_mgkg_day: "-",
        doses_per_day: 3,
        duration: "5 días",
        notes: "Aplicación tópica",
        reference: "【22732211749419†L321-L334】",
      },
      {
        scenario: "Mala evolución",
        antibiotic: "Ozenoxacino",
        route: "Tópico",
        dose_mgkg_day: "-",
        doses_per_day: 2,
        duration: "5 días",
        notes: "Aplicación tópica",
        reference: "【22732211749419†L321-L334】",
      },
    ],
  },
  {
    name: "Fascitis necrotizante",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Piperacilina‑tazobactam + Clindamicina",
        route: "IV",
        dose_mgkg_day: "400 + 40",
        doses_per_day: 6,
        duration: "Según evolución",
        notes:
          "Requiere desbridamiento quirúrgico inmediato y profilaxis antitetánica/antirrábica si procede",
        reference: "【22732211749419†L335-L347】",
      },
    ],
  },
  {
    name: "Encefalitis",
    regimens: [
      {
        scenario: "<3 meses",
        antibiotic: "Aciclovir",
        route: "IV",
        dose_mgkg_day: "60",
        doses_per_day: 3,
        duration: "21 días",
        notes: "En caso de VHS, prolongar según evolución",
        reference: "【22732211749419†L384-L401】",
      },
      {
        scenario: "3 meses–12 años",
        antibiotic: "Aciclovir",
        route: "IV",
        dose_mgkg_day: "45",
        doses_per_day: 3,
        duration: "21 días",
        notes: "",
        reference: "【22732211749419†L384-L401】",
      },
      {
        scenario: ">12 años",
        antibiotic: "Aciclovir",
        route: "IV",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "21 días",
        notes: "",
        reference: "【22732211749419†L384-L401】",
      },
    ],
  },
  {
    name: "Faringoamigdalitis aguda estreptocócica",
    regimens: [
      {
        scenario: "<27 kg",
        antibiotic: "Penicilina V",
        route: "VO",
        dose_mgkg_day: "250 mg/dosis",
        doses_per_day: 2,
        duration: "10 días",
        notes: "",
        reference: "【22732211749419†L404-L437】",
      },
      {
        scenario: "≥27 kg",
        antibiotic: "Penicilina V",
        route: "VO",
        dose_mgkg_day: "500 mg/dosis",
        doses_per_day: 2,
        duration: "10 días",
        notes: "",
        reference: "【22732211749419†L404-L437】",
      },
      {
        scenario: "Amoxicilina",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "40-50",
        doses_per_day: 3,
        duration: "10 días (máx. 1 g/día)",
        notes: "",
        reference: "【22732211749419†L418-L420】",
      },
      {
        scenario: "Intolerancia oral <27 kg",
        antibiotic: "Penicilina G benzatina",
        route: "IM",
        dose_mgkg_day: "600000 UI (dosis única)",
        doses_per_day: 1,
        duration: "Única dosis",
        notes: "",
        reference: "【22732211749419†L424-L426】",
      },
      {
        scenario: "Intolerancia oral ≥27 kg",
        antibiotic: "Penicilina G benzatina",
        route: "IM",
        dose_mgkg_day: "1200000 UI (dosis única)",
        doses_per_day: 1,
        duration: "Única dosis",
        notes: "",
        reference: "【22732211749419†L427-L428】",
      },
      {
        scenario: "Alergia penicilina tipo I",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "20",
        doses_per_day: 1,
        duration: "3 días",
        notes: "",
        reference: "【22732211749419†L430-L433】",
      },
      {
        scenario: "Alergia penicilina no tipo I",
        antibiotic: "Cefuroxima‑axetilo",
        route: "VO",
        dose_mgkg_day: "20",
        doses_per_day: 2,
        duration: "10 días",
        notes: "",
        reference: "【22732211749419†L435-L438】",
      },
    ],
  },
  {
    name: "Neumonía con patrón típico (paciente vacunado)",
    regimens: [
      {
        scenario: "No ingreso (1ª elección)",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "80",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L1033-L1055】",
      },
      {
        scenario: "No ingreso (alergia penicilina tipo I)",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "10",
        doses_per_day: 1,
        duration: "3 días",
        notes: "",
        reference: "【22732211749419†L1033-L1055】",
      },
      {
        scenario: "No ingreso (alergia penicilina no tipo I)",
        antibiotic: "Cefuroxima‑axetilo",
        route: "VO",
        dose_mgkg_day: "30",
        doses_per_day: 2,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L1033-L1055】",
      },
      {
        scenario: "Ingreso (1ª elección)",
        antibiotic: "Ampicilina",
        route: "IV",
        dose_mgkg_day: "200",
        doses_per_day: 4,
        duration: "2 días IV + 5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L1053-L1058】",
      },
      {
        scenario: "Ingreso (alergia penicilina tipo I)",
        antibiotic: "Levofloxacino",
        route: "IV",
        dose_mgkg_day: "<5 años: 20; ≥5 años: 10",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "Dosificación según edad (<5 o ≥5 años)",
        reference: "【22732211749419†L1059-L1066】",
      },
      {
        scenario: "Ingreso (alergia penicilina no tipo I)",
        antibiotic: "Cefuroxima",
        route: "IV",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "5-7 días",
        notes: "",
        reference: "【22732211749419†L1067-L1070】",
      },
    ],
  },
  {
    name: "Neumonía con patrón atípico",
    regimens: [
      {
        scenario: "No ingreso (≤5 años)",
        antibiotic: "Sin antibiótico",
        route: "",
        dose_mgkg_day: "",
        doses_per_day: 0,
        duration: "",
        notes: "Mayoría de casos son de origen viral",
        reference: "【22732211749419†L1071-L1079】",
      },
      {
        scenario: "No ingreso (>5 años)",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "10",
        doses_per_day: 1,
        duration: "3 días",
        notes: "",
        reference: "【22732211749419†L1071-L1079】",
      },
    ],
  },
  {
    name: "Neumonía con fracaso terapéutico",
    regimens: [
      {
        scenario: "No ingreso",
        antibiotic: "Amoxicilina‑clavulánico ± Azitromicina",
        route: "VO",
        dose_mgkg_day: "80 ± 10",
        doses_per_day: 3,
        duration: "5-7 días",
        notes: "Añadir azitromicina (10 mg/kg/día) si se sospecha coinfección por Mycoplasma",
        reference: "【22732211749419†L1080-L1094】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Ampicilina",
        route: "IV",
        dose_mgkg_day: "200",
        doses_per_day: 4,
        duration: "2 días IV + 5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L1095-L1101】",
      },
    ],
  },
  {
    name: "Neumonía con sospecha de S. aureus",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Cefotaxima + Vancomicina",
        route: "IV",
        dose_mgkg_day: "200 + 45-60",
        doses_per_day: 4,
        duration: "7-14 días",
        notes: "Añadir vancomicina si se sospecha de S. aureus; ajustar según necrosis",
        reference: "【22732211749419†L1102-L1116】",
      },
    ],
  },
  {
    name: "Neumonía con derrame pleural",
    regimens: [
      {
        scenario: "Ingreso (no empiema)",
        antibiotic: "Ampicilina o Penicilina G sódica",
        route: "IV",
        dose_mgkg_day: "200 o 300000-400000 UI",
        doses_per_day: 4,
        duration: "2-3 días IV + 6-7 días VO (total 10 días tras desaparición de la fiebre)",
        notes: "Pasar a VO si el paciente lleva 2 días afebril y retirado el tubo",
        reference: "【22732211749419†L1131-L1168】",
      },
      {
        scenario: "Ingreso (empiema)",
        antibiotic: "Ampicilina o Penicilina G sódica",
        route: "IV/VO",
        dose_mgkg_day: "200 o 300000-400000 UI",
        doses_per_day: 4,
        duration: "2-3 días IV + 2-4 semanas VO (total 2-4 semanas)",
        notes: "",
        reference: "【22732211749419†L1131-L1168】",
      },
    ],
  },
  {
    name: "Neumonía en paciente inmunodeprimido no oncológico",
    regimens: [
      {
        scenario: "No ingreso",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80",
        doses_per_day: 3,
        duration: "2 días IV + 5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L1169-L1175】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Cefotaxima + Vancomicina",
        route: "IV",
        dose_mgkg_day: "200 + 60",
        doses_per_day: 4,
        duration: "2 días IV + 5 días VO (total 7 días)",
        notes: "",
        reference: "【22732211749419†L1176-L1189】",
      },
    ],
  },
  {
    name: "Neumonía necrosante o absceso pulmonar",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Ampicilina o Cefotaxima + Clindamicina",
        route: "IV",
        dose_mgkg_day: "250-300 o 200-300 + 40",
        doses_per_day: 4,
        duration:
          "Si absceso <6 cm: 4 semanas o al menos 2 semanas tras desaparición de la fiebre; si >6 cm: hasta que disminuya a <6 cm",
        notes: "Pasar a VO si el paciente lleva 2 días afebril y estable",
        reference: "【22732211749419†L1236-L1272】",
      },
    ],
  },
  {
    name: "Neumonía aspirativa",
    regimens: [
      {
        scenario: "No ingreso",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80",
        doses_per_day: 3,
        duration: "5 días",
        notes: "",
        reference: "【22732211749419†L1274-L1290】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Amoxicilina‑clavulánico o Clindamicina",
        route: "IV",
        dose_mgkg_day: "100 o 40",
        doses_per_day: 3,
        duration: "2 días IV + 5-8 días VO (total 7-10 días)",
        notes: "",
        reference: "【22732211749419†L1274-L1293】",
      },
      {
        scenario: "Ingreso (fracaso terapéutico)",
        antibiotic: "Meropenem",
        route: "IV",
        dose_mgkg_day: "60",
        doses_per_day: 3,
        duration: "2 días IV + 8 días VO (total 10 días)",
        notes: "",
        reference: "【22732211749419†L1294-L1300】",
      },
    ],
  },

  // Diagnósticos adicionales para asegurar exhaustividad según la guía.
  {
    name: "Fibrosis quística – exacerbación",
    regimens: [
      {
        scenario: "No ingreso (sin Pseudomonas)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 3,
        duration: "14‑21 días",
        notes: "Mantener aerosolterapia antibiótica según rutina",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "No ingreso (con Pseudomonas)",
        antibiotic: "Ciprofloxacino",
        route: "VO",
        dose_mgkg_day: "40",
        doses_per_day: 2,
        duration: "14‑21 días",
        notes: "Mantener aerosolterapia antibiótica; ajustar según cultivo",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Ingreso (sin Pseudomonas)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 3,
        duration: "14‑21 días",
        notes: "Mantener aerosolterapia antibiótica según rutina",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Ingreso (con Pseudomonas)",
        antibiotic: "Ceftazidima + Tobramicina",
        route: "IV",
        dose_mgkg_day: "200-300 + 10",
        doses_per_day: 3,
        duration: "14‑21 días",
        notes: "Añadir tobramicina 10 mg/kg/día en dosis única",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Fractura abierta",
    regimens: [
      {
        scenario: "Poca contaminación",
        antibiotic: "Cefazolina",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 3,
        duration: "Hasta 24 h tras cierre quirúrgico",
        notes: "Irrigación abundante y profilaxis antitetánica",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Conminuta y contaminada",
        antibiotic: "Cefazolina + Gentamicina",
        route: "IV",
        dose_mgkg_day: "100-150 + 5-7.5",
        doses_per_day: 4,
        duration: "2‑5 días",
        notes: "Gentamicina en dosis única diaria",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Fiebre botonosa (infección transmitida por garrapata)",
    regimens: [
      {
        scenario: "1ª elección",
        antibiotic: "Doxiciclina",
        route: "VO",
        dose_mgkg_day: "5",
        doses_per_day: 2,
        duration: "1 día",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "2ª elección",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "10",
        doses_per_day: 1,
        duration: "3 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Tíbola (infección transmitida por garrapata)",
    regimens: [
      {
        scenario: "1ª elección",
        antibiotic: "Doxiciclina",
        route: "VO",
        dose_mgkg_day: "5",
        doses_per_day: 2,
        duration: "7‑10 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "2ª elección",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "10",
        doses_per_day: 1,
        duration: "5 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Enfermedad de Lyme precoz",
    regimens: [
      {
        scenario: "≤8 años",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "50",
        doses_per_day: 3,
        duration: "14 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: ">8 años",
        antibiotic: "Doxiciclina",
        route: "VO",
        dose_mgkg_day: "4",
        doses_per_day: 2,
        duration: "14 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Herpes simple oral (inmunodeprimido)",
    regimens: [
      {
        scenario: "Tratamiento",
        antibiotic: "Aciclovir",
        route: "VO",
        dose_mgkg_day: "60",
        doses_per_day: 3,
        duration: "7‑10 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Neutropenia febril",
    regimens: [
      {
        scenario: "Paciente estable sin anaerobios",
        antibiotic: "Cefepime",
        route: "IV",
        dose_mgkg_day: "150",
        doses_per_day: 3,
        duration: "Hasta negativización de cultivos",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Paciente estable con anaerobios",
        antibiotic: "Piperacilina‑tazobactam",
        route: "IV",
        dose_mgkg_day: "300-400",
        doses_per_day: 3,
        duration: "Hasta negativización de cultivos",
        notes: "Alternativa: Meropenem 120 mg/kg/día IV en 3 dosis",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Paciente inestable",
        antibiotic: "Vancomicina + Amikacina",
        route: "IV",
        dose_mgkg_day: "45-60 + 15-22.5",
        doses_per_day: 4,
        duration: "Hasta estabilidad clínica",
        notes: "Añadir amikacina 15-22.5 mg/kg/día en dosis única",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Herpes simple mucocutáneo grave o visceral",
    regimens: [
      {
        scenario: "Tratamiento",
        antibiotic: "Aciclovir",
        route: "IV",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "≥7 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Varicela‑Zóster (inmunodeprimido)",
    regimens: [
      {
        scenario: "Tratamiento",
        antibiotic: "Aciclovir",
        route: "IV",
        dose_mgkg_day: "30",
        doses_per_day: 3,
        duration: "≥7 días",
        notes: "Alternativa de dosis: 1500 mg/m²/día en 3 dosis",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Sospecha de infección por CMV",
    regimens: [
      {
        scenario: "Tratamiento",
        antibiotic: "Ganciclovir",
        route: "IV",
        dose_mgkg_day: "10",
        doses_per_day: 2,
        duration: "Según carga viral",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Sospecha de infección por VHH‑6",
    regimens: [
      {
        scenario: "Tratamiento",
        antibiotic: "Foscarnet",
        route: "IV",
        dose_mgkg_day: "120-180",
        doses_per_day: 3,
        duration: "Según carga viral",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Mastoiditis aguda",
    regimens: [
      {
        scenario: "No complicada",
        antibiotic: "Cefuroxima",
        route: "IV",
        dose_mgkg_day: "100-150",
        doses_per_day: 3,
        duration: "5 días IV + 7‑9 días VO",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Complicaciones intratemporales/implante coclear",
        antibiotic: "Ceftriaxona ± Vancomicina",
        route: "IV",
        dose_mgkg_day: "100 + 45-60",
        doses_per_day: 1,
        duration: "4 semanas IV + 2 semanas VO",
        notes: "Añadir vancomicina si mal estado general",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Complicaciones intracraneales",
        antibiotic: "Ceftriaxona + Metronidazol",
        route: "IV",
        dose_mgkg_day: "100 + 40",
        doses_per_day: 1,
        duration: "6‑8 semanas",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Meningitis aguda",
    regimens: [
      {
        scenario: "≤7 días",
        antibiotic: "Ampicilina + Cefotaxima",
        route: "IV",
        dose_mgkg_day: "300 + 150",
        doses_per_day: 3,
        duration: "7‑10 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "8 días‑1 mes",
        antibiotic: "Ampicilina + Cefotaxima",
        route: "IV",
        dose_mgkg_day: "300 + 200",
        doses_per_day: 3,
        duration: "7‑14 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "1‑3 meses",
        antibiotic: "Ampicilina + Cefotaxima",
        route: "IV",
        dose_mgkg_day: "300 + 300",
        doses_per_day: 4,
        duration: "10‑14 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: ">3 meses",
        antibiotic: "Cefotaxima o Ceftriaxona + Vancomicina",
        route: "IV",
        dose_mgkg_day: "300 o 100 + 45-60",
        doses_per_day: 4,
        duration: "10‑21 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Meningitis tuberculosa",
    regimens: [
      {
        scenario: "Fase intensiva (2 meses)",
        antibiotic: "Isoniazida + Rifampicina + Pirazinamida + Etambutol",
        route: "VO",
        dose_mgkg_day: "15 + 20 + 40 + 25",
        doses_per_day: 1,
        duration: "2 meses",
        notes: "Añadir prednisona 1‑2 mg/kg/día en 2 dosis",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Fase de mantenimiento (10 meses)",
        antibiotic: "Isoniazida + Rifampicina",
        route: "VO",
        dose_mgkg_day: "15 + 20",
        doses_per_day: 1,
        duration: "10 meses",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Mordeduras animales o humanas",
    regimens: [
      {
        scenario: "Profilaxis (no infección)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "40-50",
        doses_per_day: 3,
        duration: "3‑5 días",
        notes: "Si alergia tipo I: ciprofloxacino 20-30 mg/kg/día VO en 2 dosis + clindamicina 30 mg/kg/día VO en 3 dosis",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Infección estable (ambulatorio)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "40-50",
        doses_per_day: 3,
        duration: "7‑10 días",
        notes: "Si alergia tipo I: ciprofloxacino 20-30 mg/kg/día VO en 2 dosis + clindamicina 30 mg/kg/día VO en 3 dosis",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Caso grave (ingreso)",
        antibiotic: "Piperacilina‑tazobactam",
        route: "IV",
        dose_mgkg_day: "300",
        doses_per_day: 3,
        duration: "2‑3 días IV + 4‑7 días VO",
        notes: "Alternativa: Ciprofloxacino 20-30 mg/kg/día IV en 2 dosis + clindamicina 30 mg/kg/día IV en 3 dosis",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Otitis externa",
    regimens: [
      {
        scenario: "No complicada",
        antibiotic: "Ciprofloxacino (tópico)",
        route: "Tópico",
        dose_mgkg_day: "-",
        doses_per_day: 2,
        duration: "5 días",
        notes: "Aplicar 4 gotas por oreja 2 veces al día",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Con celulitis/pericondritis",
        antibiotic: "Ciprofloxacino",
        route: "VO",
        dose_mgkg_day: "20-40",
        doses_per_day: 2,
        duration: "7 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
      {
        scenario: "Fúngica",
        antibiotic: "Clotrimazol (tópico)",
        route: "Tópico",
        dose_mgkg_day: "-",
        doses_per_day: 2,
        duration: "14‑21 días",
        notes: "",
        reference: "【802141843899208†screenshot】",
      },
    ],
  },
  {
    name: "Otitis media aguda",
    regimens: [
      {
        scenario: "No ingreso (factores de riesgo o <2 años)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 2,
        duration: "10 días",
        notes:
          "Usar en <2 años, otitis bilateral en 2‑6 meses, otalgia intensa, fiebre >39ºC, otitis supurada o pacientes con factores de riesgo",
        reference: "【22732211749419†L749-L773】",
      },
      {
        scenario: "No ingreso (sin factores de riesgo, >2 años, leve‑moderada)",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "Pacientes >2 años con otitis media aguda leve o moderada sin factores de riesgo",
        reference: "【22732211749419†L749-L773】",
      },
      {
        scenario: "Persistencia de síntomas o recurrencia",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 2,
        duration: "10 días",
        notes: "Fracaso terapéutico con amoxicilina o existencia de conjuntivitis purulenta",
        reference: "【22732211749419†L768-L773】",
      },
      {
        scenario: "Fracaso terapéutico con amoxicilina‑clavulánico",
        antibiotic: "Ceftriaxona",
        route: "IM",
        dose_mgkg_day: "50",
        doses_per_day: 1,
        duration: "3 días",
        notes: "Administrar 50 mg/kg/día IM durante 3 días",
        reference: "【22732211749419†L785-L788】",
      },
      {
        scenario: "Alergia penicilina tipo I",
        antibiotic: "Azitromicina",
        route: "VO",
        dose_mgkg_day: "10",
        doses_per_day: 1,
        duration: "3 días",
        notes: "Hipersensibilidad inmediata a betalactámicos",
        reference: "【22732211749419†L787-L788】",
      },
      {
        scenario: "Alergia penicilina no tipo I",
        antibiotic: "Cefuroxima‑axetilo",
        route: "VO",
        dose_mgkg_day: "20-30",
        doses_per_day: 2,
        duration: "10 días",
        notes: "Hipersensibilidad no inmediata a betalactámicos",
        reference: "【22732211749419†L787-L789】",
      },
      {
        scenario: "Otitis con otorrea en portadores de drenaje transtimpánico",
        antibiotic: "Ciprofloxacino tópico + Amoxicilina",
        route: "Tópico/VO",
        dose_mgkg_day: "4 gotas + 80-90",
        doses_per_day: 2,
        duration: "5-7 días",
        notes: "Aplicar 4 gotas de ciprofloxacino ótico 2 veces/día; añadir amoxicilina 80-90 mg/kg/día VO en 2-3 dosis si <2 años o fiebre",
        reference: "【22732211749419†L790-L797】",
      },
      {
        scenario: "Ingreso (<2 meses inestable)",
        antibiotic: "Ceftriaxona",
        route: "IV",
        dose_mgkg_day: "50",
        doses_per_day: 1,
        duration: "10 días (2-3 días IV + 7-8 días VO)",
        notes: "Sustituir por cefotaxima 200 mg/kg/día IV en 3 dosis si <15 días de vida, prematuro o con colestasis",
        reference: "【22732211749419†L799-L813】",
      },
    ],
  },
  {
    name: "Sinusitis aguda",
    regimens: [
      {
        scenario: "No ingreso (con factores de riesgo)",
        antibiotic: "Amoxicilina‑clavulánico",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 3,
        duration: "7 días",
        notes: "Para <2 años, afectación frontal/esfenoidal, inmunodeprimidos o patología de base, celulitis preseptal leve, o refractarios a amoxicilina",
        reference: "【22732211749419†L977-L989】",
      },
      {
        scenario: "No ingreso (sin factores de riesgo)",
        antibiotic: "Amoxicilina",
        route: "VO",
        dose_mgkg_day: "80-90",
        doses_per_day: 3,
        duration: "7 días",
        notes: "Pacientes >2 años con sinusitis maxilar sin criterios de gravedad",
        reference: "【22732211749419†L990-L992】",
      },
      {
        scenario: "Ingreso",
        antibiotic: "Ceftriaxona + Metronidazol",
        route: "IV",
        dose_mgkg_day: "100 + 40",
        doses_per_day: 1,
        duration: "6 semanas (4 IV + 2 VO)",
        notes: "Usar 1-2 dosis de ceftriaxona más metronidazol 40 mg/kg/día en 3 dosis; valorar 8 semanas en abscesos múltiples o no drenados",
        reference: "【22732211749419†L994-L1001】",
      },
    ],
  },
  {
    name: "Infección urinaria",
    regimens: [
      {
        scenario: "Cistitis (no ingreso)",
        antibiotic: "Fosfomicina cálcica",
        route: "VO",
        dose_mgkg_day: "100",
        doses_per_day: 3,
        duration: "3-5 días",
        notes: "En menores de 15 años; evitar amoxicilina u otras cefalosporinas de 1ª generación como tratamiento empírico",
        reference: "【22732211749419†L979-L1007】",
      },
      {
        scenario: "Cistitis (>15 años)",
        antibiotic: "Fosfomicina trometamol",
        route: "VO",
        dose_mgkg_day: "3 g (dosis única)",
        doses_per_day: 1,
        duration: "1 día",
        notes: "En adolescentes y adultos jóvenes",
        reference: "【22732211749419†L979-L1007】",
      },
      {
        scenario: "Pielonefritis (>3 meses, no ingreso)",
        antibiotic: "Cefixima",
        route: "VO",
        dose_mgkg_day: "8",
        doses_per_day: 1,
        duration: "7-10 días",
        notes: "Usar cefixima VO 8 mg/kg/día en una dosis",
        reference: "【22732211749419†L979-L1007】",
      },
      {
        scenario: "Pielonefritis (ingreso)",
        antibiotic: "Ampicilina + Gentamicina o Cefotaxima",
        route: "IV",
        dose_mgkg_day: "150 + 4 o 100",
        doses_per_day: 3,
        duration: "1-2 días IV + 6-8 días VO (total 7-10 días)",
        notes: "En lactantes y niños según edad: asociar gentamicina 4-7,5 mg/kg/día en dosis única o cefotaxima 100-150 mg/kg/día en 2-3 dosis si insuficiencia renal",
        reference: "【22732211749419†L979-L1007】",
      },
    ],
  },
  {
    name: "Infección por válvula de derivación ventrículo-peritoneal",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Cefotaxima + Vancomicina",
        route: "IV",
        dose_mgkg_day: "300 + 45-60",
        doses_per_day: 3,
        duration: "7 días (mínimo)",
        notes: "Precisa monitorización y ajuste según cultivos; retirar dispositivo infectado si procede",
        reference: "【22732211749419†L950-L966】",
      },
    ],
  },
  {
    name: "Sepsis shock séptico (<3 meses)",
    regimens: [
      {
        scenario: "Sin meningitis",
        antibiotic: "Ampicilina + Gentamicina",
        route: "IV",
        dose_mgkg_day: "150-200 + 4-7.5",
        doses_per_day: 3,
        duration: "7-14 días",
        notes: "Dosis y duración varían según edad: ≤7 días 150 mg/kg/día + 4 mg/kg/día; 8-28 días 150 mg/kg/día + 5-7,5 mg/kg/día; 1-3 meses 200 mg/kg/día + 5-7,5 mg/kg/día",
        reference: "【22732211749419†L874-L887】",
      },
      {
        scenario: "Con meningitis",
        antibiotic: "Ampicilina + Cefotaxima",
        route: "IV",
        dose_mgkg_day: "300 + 150-300",
        doses_per_day: 3,
        duration: "14-21 días",
        notes: "En sepsis neonatal con meningitis; aumentar dosis de cefotaxima (150-300 mg/kg/día) según edad",
        reference: "【22732211749419†L889-L895】",
      },
    ],
  },
  {
    name: "Sepsis origen comunitario (>3 meses)",
    regimens: [
      {
        scenario: "Sin meningitis",
        antibiotic: "Cefotaxima o Ceftriaxona",
        route: "IV",
        dose_mgkg_day: "200 o 100",
        doses_per_day: 4,
        duration: "7-10 días",
        notes: "Usar cefotaxima 200 mg/kg/día en 4 dosis o ceftriaxona 100 mg/kg/día en 1-2 dosis/día",
        reference: "【22732211749419†L911-L915】",
      },
      {
        scenario: "Con sospecha de meningitis",
        antibiotic: "Cefotaxima + Vancomicina",
        route: "IV",
        dose_mgkg_day: "300 + 45-60",
        doses_per_day: 4,
        duration: "10-14 días",
        notes: "Añadir vancomicina 45-60 mg/kg/día en 4 dosis cuando se sospeche meningitis neumocócica; precisa monitorización",
        reference: "【22732211749419†L916-L921】",
      },
      {
        scenario: "Shock tóxico (origen desconocido)",
        antibiotic: "Cefotaxima + Clindamicina + Penicilina G o Ampicilina",
        route: "IV",
        dose_mgkg_day: "200 + 40 + 300000 UI o 200",
        doses_per_day: 4,
        duration: "7-10 días",
        notes: "Añadir clindamicina 40 mg/kg/día en 3-4 dosis; usar penicilina G 300.000 UI/kg/día en 6 dosis o ampicilina 200 mg/kg/día en 4 dosis según microorganismo (S. pyogenes). Para S. aureus añadir cloxacilina 200 mg/kg/día IV en 4 dosis",
        reference: "【22732211749419†L922-L932】",
      },
      {
        scenario: "Sospecha de foco abdominal",
        antibiotic: "Piperacilina‑tazobactam o Cefotaxima + Metronidazol ± Ampicilina",
        route: "IV",
        dose_mgkg_day: "400 o 200 + 40 ± 200",
        doses_per_day: 4,
        duration: "10-21 días",
        notes: "En sepsis abdominal añadir metronidazol 40 mg/kg/día en 4 dosis; en caso de Enterococcus resistente a ampicilina añadir vancomicina",
        reference: "【22732211749419†L933-L945】",
      },
      {
        scenario: "Pacientes crónicos u hospitalizados / BLEE",
        antibiotic: "Piperacilina‑tazobactam o Meropenem + Vancomicina",
        route: "IV",
        dose_mgkg_day: "400 o 60 + 45-60",
        doses_per_day: 3,
        duration: "10-14 días",
        notes: "Usar piperacilina‑tazobactam 400 mg/kg/día en 4 dosis o meropenem 60 mg/kg/día en 3 dosis; añadir vancomicina 45-60 mg/kg/día en 4 dosis para BLEE o dispositivos permanentes",
        reference: "【22732211749419†L956-L964】",
      },
      {
        scenario: "Infección relacionada con catéter, sin otro factor de riesgo",
        antibiotic: "Cefotaxima + Vancomicina",
        route: "IV",
        dose_mgkg_day: "200 + 45-60",
        doses_per_day: 3,
        duration: "10-14 días",
        notes: "Retirar o reemplazar catéter si es posible; precisa monitorización",
        reference: "【22732211749419†L965-L967】",
      },
    ],
  },
  {
    name: "Neumonía grave (UCIP)",
    regimens: [
      {
        scenario: "Ingreso en UCIP",
        antibiotic: "Cefotaxima o Ceftriaxona + Vancomicina + Clindamicina",
        route: "IV",
        dose_mgkg_day: "200 o 100 + 45-60 + 40",
        doses_per_day: 4,
        duration: "10-14 días",
        notes: "Para pacientes con neumonía adquirida grave, cavitación o requiriendo intubación; ajustar según antibiograma y evolución",
        reference: "【22732211749419†L911-L921】",
      },
    ],
  },
  {
    name: "Neumonía con gravedad clínica, cavitación o intubación muy prolongada",
    regimens: [
      {
        scenario: "Ingreso",
        antibiotic: "Ampicilina o Cefotaxima + Clindamicina",
        route: "IV",
        dose_mgkg_day: "250-300 o 200-300 + 40",
        doses_per_day: 4,
        duration: "≥14 días",
        notes: "Basado en pautas de neumonía necrosante/absceso pulmonar; prolongar tratamiento hasta resolución radiológica",
        reference: "【22732211749419†L1236-L1272】",
      },
    ],
  },
  {
    name: "Otro diagnóstico (consultar guía)",
    regimens: [
      {
        scenario: "Consulte la guía",
        antibiotic: "—",
        route: "",
        dose_mgkg_day: "",
        doses_per_day: 0,
        duration: "",
        notes: "Diagnóstico no incluido en la base; revisar la guía",
        reference: "",
      },
    ],
  },
];

// Base de datos por antibiótico con dosis generales y algunas indicaciones.
const antibioticData = [
  {
    name: "Amoxicilina",
    general: "40-50 mg/kg/día VO en 3 dosis (máx. 1 g/día)",
    indications: [
      {
        indication: "Infecciones bucodentales (1ª elección)",
        dose: "40-50 mg/kg/día VO en 3 dosis",
      },
      {
        indication: "Faringoamigdalitis aguda estreptocócica",
        dose: "40-50 mg/kg/día VO en 3 dosis, máximo 1 g/día",
      },
      {
        indication: "Neumonía patrón típico (paciente vacunado, no ingreso)",
        dose: "80 mg/kg/día VO en 2 dosis",
      },
      {
        indication: "Enfermedad de Lyme (≤8 años)",
        dose: "50 mg/kg/día VO en 3 dosis (14 días)",
      },
    ],
  },
  {
    name: "Amoxicilina‑clavulánico",
    general: "80-100 mg/kg/día (según vía) en 3 dosis",
    indications: [
      {
        indication: "Celulitis preseptal (sin lesión externa)",
        dose: "80-90 mg/kg/día VO en 2-3 dosis",
      },
      {
        indication: "Infecciones cervicales profundas",
        dose: "100 mg/kg/día IV en 3 dosis",
      },
      {
        indication: "Infecciones bucodentales (ingreso)",
        dose: "100 mg/kg/día IV en 3 dosis",
      },
      {
        indication: "Neumonía aspirativa (no ingreso)",
        dose: "80 mg/kg/día VO en 3 dosis (5 días)",
      },
      {
        indication: "Neumonía aspirativa (ingreso)",
        dose: "100 mg/kg/día IV en 3 dosis; luego VO 5-8 días",
      },
    ],
  },
  {
    name: "Cefadroxilo",
    general: "30 mg/kg/día VO en 2 dosis",
    indications: [
      {
        indication: "Adenitis cervical aguda no estreptocócica (no ingreso)",
        dose: "30 mg/kg/día VO en 2 dosis (7 días)",
      },
      {
        indication: "Celulitis preseptal (lesión externa, no ingreso)",
        dose: "30 mg/kg/día VO en 2 dosis (5-7 días)",
      },
      {
        indication: "Infecciones cutáneas (celulitis, erisipela, etc.)",
        dose: "30 mg/kg/día VO en 2 dosis (5 días)",
      },
    ],
  },
  {
    name: "Cloxacilina",
    general: "100-150 mg/kg/día (IV/VO) en 3-4 dosis",
    indications: [
      {
        indication: "Adenitis cervical aguda (ingreso)",
        dose: "100-150 mg/kg/día IV en 4 dosis; 2-3 días IV + 4-5 días VO",
      },
      {
        indication: "Celulitis preseptal (lesión externa, ingreso)",
        dose: "100-150 mg/kg/día IV en 4 dosis (total 7 días)",
      },
      {
        indication: "Infecciones cutáneas (ingreso, 1ª elección)",
        dose: "100-150 mg/kg/día IV en 3-4 dosis; 2-3 días IV + 4-8 días VO",
      },
    ],
  },
  {
    name: "Ampicilina",
    general: "200 mg/kg/día IV en 4 dosis",
    indications: [
      {
        indication: "Neumonía patrón típico (ingreso)",
        dose: "200 mg/kg/día IV en 4 dosis; 2 días IV + 5 días VO",
      },
      {
        indication: "Neumonía fracaso terapéutico (ingreso)",
        dose: "200 mg/kg/día IV en 4 dosis; 2 días IV + 5 días VO",
      },
      {
        indication: "Neumonía con derrame pleural",
        dose: "200 mg/kg/día IV en 4 dosis",
      },
      {
        indication: "Neumonía necrosante/absceso pulmonar",
        dose: "250-300 mg/kg/día IV en 4 dosis",
      },
    ],
  },
  {
    name: "Cefuroxima",
    general: "30 mg/kg/día VO en 2 dosis o 100 mg/kg/día IV en 3 dosis",
    indications: [
      {
        indication: "Neumonía patrón típico (alergia no tipo I, no ingreso)",
        dose: "30 mg/kg/día VO en 2 dosis (5 días)",
      },
      {
        indication: "Neumonía patrón típico (alergia no tipo I, ingreso)",
        dose: "100 mg/kg/día IV en 3 dosis",
      },
    ],
  },
  {
    name: "Ceftriaxona",
    general: "50-100 mg/kg/día IV en 1-2 dosis",
    indications: [
      {
        indication: "Absceso cerebral (diseminación hematógena)",
        dose: "100 mg/kg/día IV en 1-2 dosis",
      },
      {
        indication: "Celulitis orbitaria",
        dose: "50-100 mg/kg/día IV en 1-2 dosis",
      },
      {
        indication: "Infecciones cervicales profundas (afectación grave)",
        dose: "50-100 mg/kg/día IV en 1-2 dosis",
      },
    ],
  },
  {
    name: "Piperacilina‑tazobactam",
    general: "300-400 mg/kg/día IV en 3-6 dosis",
    indications: [
      {
        indication: "Apendicitis aguda complicada",
        dose: "300 mg/kg/día IV en 3 dosis (5-10 días)",
      },
      {
        indication: "Fascitis necrotizante",
        dose: "400 mg/kg/día IV en 6 dosis",
      },
      {
        indication: "Neutropenia febril con sospecha de anaerobios",
        dose: "300-400 mg/kg/día IV en 3-4 dosis",
      },
    ],
  },
  {
    name: "Trimetoprim‑sulfametoxazol",
    general: "8-20 mg/kg/día de trimetoprim (VO o IV)",
    indications: [
      {
        indication: "Infecciones cutáneas con sospecha SARM (no ingreso)",
        dose: "8-10 mg/kg/día (TMP) VO en 2 dosis",
      },
      {
        indication: "Infecciones cutáneas con sospecha SARM (ingreso)",
        dose: "15-20 mg/kg/día (TMP) IV en 2 dosis",
      },
    ],
  },
  {
    name: "Azitromicina",
    general: "10-20 mg/kg/día VO en 1 dosis",
    indications: [
      {
        indication: "Neumonía patrón atípico (>5 años)",
        dose: "10 mg/kg/día VO en 1 dosis durante 3 días",
      },
      {
        indication: "Neumonía fracaso terapéutico",
        dose: "10 mg/kg/día VO en 1 dosis (se añade a amoxicilina‑clavulánico)",
      },
      {
        indication: "Faringoamigdalitis (alergia tipo I)",
        dose: "20 mg/kg/día VO en 1 dosis durante 3 días",
      },
    ],
  },
  {
    name: "Metronidazol",
    general: "30-40 mg/kg/día VO/IV en 3-4 dosis",
    indications: [
      {
        indication: "Infecciones bucodentales (alergia betalactámicos)",
        dose: "30 mg/kg/día VO en 3 dosis",
      },
      {
        indication: "Apendicitis complicada (alergia penicilina tipo I)",
        dose: "30 mg/kg/día IV en 3 dosis",
      },
      {
        indication: "Infecciones cervicales profundas (afectación grave, asociada)",
        dose: "40 mg/kg/día IV en 3-4 dosis",
      },
    ],
  },
  {
    name: "Vancomicina",
    general: "45-60 mg/kg/día IV en 3-4 dosis",
    indications: [
      {
        indication: "Absceso cerebral",
        dose: "45-60 mg/kg/día IV en 4 dosis",
      },
      {
        indication: "Neumonía con sospecha de S. aureus",
        dose: "45-60 mg/kg/día IV en 3-4 dosis",
      },
      {
        indication: "Neumonía en paciente inmunodeprimido (ingreso)",
        dose: "60 mg/kg/día IV en 4 dosis",
      },
    ],
  },
  {
    name: "Clindamicina",
    general: "30-40 mg/kg/día IV/VO en 3-4 dosis",
    indications: [
      {
        indication: "Celulitis orbitaria",
        dose: "40 mg/kg/día IV en 3-4 dosis (asociada a ceftriaxona)",
      },
      {
        indication: "Infecciones cervicales profundas (afectación grave)",
        dose: "40 mg/kg/día IV en 3-4 dosis",
      },
      {
        indication: "Infecciones cutáneas (alergia penicilina)",
        dose: "30 mg/kg/día VO/IV en 3-4 dosis",
      },
      {
        indication: "Fascitis necrotizante",
        dose: "40 mg/kg/día IV en 4 dosis (asociada)",
      },
    ],
  },
  {
    name: "Levofloxacino",
    general: "10-20 mg/kg/día IV/VO (ajustar por edad)",
    indications: [
      {
        indication: "Neumonía patrón típico (alergia penicilina tipo I, ingreso)",
        dose: "<5 años: 20 mg/kg/día IV en 2 dosis; ≥5 años: 10 mg/kg/día IV en 1 dosis",
      },
    ],
  },
  {
    name: "Gentamicina",
    general: "5-7.5 mg/kg/día IV en 1 dosis",
    indications: [
      {
        indication: "Apendicitis complicada (alergia penicilina tipo I)",
        dose: "5-7.5 mg/kg/día IV en 1 dosis",
      },
    ],
  },
  {
    name: "Meropenem",
    general: "60 mg/kg/día IV en 3 dosis",
    indications: [
      {
        indication: "Absceso cerebral (traumatismo/origen desconocido)",
        dose: "60-120 mg/kg/día IV en 3 dosis (asociado a vancomicina)",
      },
      {
        indication: "Neumonía aspirativa (fracaso terapéutico)",
        dose: "60 mg/kg/día IV en 3 dosis; luego VO",
      },
      {
        indication: "Neutropenia febril (paciente inestable)",
        dose: "Meropenem IV en perfusión prolongada (ver guía)",
      },
    ],
  },
];

// Tabla de sensibilidad por microorganismo.
// Cada entrada incluye el microorganismo y un objeto con antibióticos y porcentaje de cepas sensibles.
const agentSensitivity = [
  {
    name: "E. coli",
    sensitivity: {
      "Ampicilina": 45,
      "Amoxicilina‑clavulánico (ITU)": 94,
      "Cefotaxima": 94,
      "Ertapenem": 94,
      "Ciprofloxacino": 97,
      "Gentamicina": 95,
      "Fosfomicina": 98,
      "Nitrofurantoína": 99,
    },
  },
  {
    name: "K. pneumoniae",
    sensitivity: {
      "Ampicilina": 10,
      "Amoxicilina‑clavulánico (ITU)": 50,
      "Cefotaxima": 92,
      "Ertapenem": 100,
      "Ciprofloxacino": 81,
      "Gentamicina": 100,
      "Fosfomicina": 0,
      "Nitrofurantoína": 15,
    },
  },
  {
    name: "K. oxytoca",
    sensitivity: {
      "Ampicilina": 10,
      "Amoxicilina‑clavulánico (ITU)": 100,
      "Cefotaxima": 100,
      "Ertapenem": 100,
      "Ciprofloxacino": 87,
      "Gentamicina": 75,
      "Fosfomicina": 50,
      "Nitrofurantoína": 50,
    },
  },
  {
    name: "Enterobacter spp",
    sensitivity: {
      "Ampicilina": 0,
      "Amoxicilina‑clavulánico (ITU)": 13,
      "Cefotaxima": 80,
      "Ertapenem": 93,
      "Ciprofloxacino": 87,
      "Gentamicina": 93,
      "Fosfomicina": 40,
      "Nitrofurantoína": 0,
    },
  },
  {
    name: "Proteus mirabilis",
    sensitivity: {
      "Ampicilina": 91,
      "Amoxicilina‑clavulánico (ITU)": 100,
      "Cefotaxima": 100,
      "Ertapenem": 100,
      "Ciprofloxacino": 100,
      "Gentamicina": 100,
      "Fosfomicina": 0,
      "Nitrofurantoína": 0,
    },
  },
  {
    name: "H. influenzae",
    sensitivity: {
      "Ampicilina": 83,
      "Cefotaxima": 100,
      "Azitromicina": 53,
    },
  },
  {
    name: "P. aeruginosa",
    sensitivity: {
      "Ceftazidima": 88,
      "Cefepime": 95,
      "Piperacilina‑tazobactam": 91,
      "Imipenem": 86,
      "Meropenem": 91,
      "Amikacina": 98,
      "Tobramicina": 97,
      "Ciprofloxacino": 81,
    },
  },
  {
    name: "P. aeruginosa FQ",
    sensitivity: {
      "Ceftazidima": 89,
      "Cefepime": 100,
      "Piperacilina‑tazobactam": 82,
      "Imipenem": 63,
      "Meropenem": 89,
      "Amikacina": 100,
      "Tobramicina": 100,
      "Ciprofloxacino": 0,
    },
  },
  {
    name: "S. pneumoniae / S. pyogenes",
    sensitivity: {
      "Penicilina": 100,
      "Cefotaxima": 100,
      "Eritromicina": 60,
      "Clindamicina": 80,
      "Levofloxacino": 93,
    },
  },
  {
    name: "E. faecalis",
    sensitivity: {
      "Ampicilina": 97,
      "Vancomicina": 100,
      "Linezolid": 100,
      "Sinergia Gentamicina": 90,
    },
  },
  {
    name: "S. aureus",
    sensitivity: {
      "Cloxacilina": 81,
      "Eritromicina": 67,
      "Clindamicina": 79,
      "Linezolid": 100,
      "Daptomicina": 100,
      "Vancomicina": 100,
      "Cotrimoxazol": 81,
    },
  },
  {
    name: "S. aureus FQ",
    sensitivity: {
      "Cloxacilina": 92,
      "Eritromicina": 42,
      "Clindamicina": 73,
      "Linezolid": 100,
      "Daptomicina": 100,
      "Vancomicina": 100,
      "Cotrimoxazol": 85,
    },
  },
  {
    name: "Estafilococo coagulasa negativo",
    sensitivity: {
      "Cloxacilina": 30,
      "Eritromicina": 30,
      "Clindamicina": 30,
      "Linezolid": 97,
      "Daptomicina": 96,
      "Vancomicina": 100,
      "Cotrimoxazol": 97,
    },
  },
];

/**
 * Calcula las dosis totales y por toma a partir de una pauta, el peso del paciente y el número de dosis/día.
 *
 * @param {string} doseStr Cadena con la dosis en mg/kg/día (puede ser rango o texto).
 * @param {number} weight Peso del paciente en kg.
 * @param {number} dosesPerDay Número de dosis diarias.
 * @returns {string} Descripción de la dosis total y por toma en mg.
 */
function computeDoses(doseStr, weight, dosesPerDay) {
  // Si no hay dosis numérica o no hay peso, no calcular.
  if (!doseStr || !weight || dosesPerDay === 0) {
    return '';
  }
  // Extraer números (rango o único) de la cadena.
  const match = doseStr.match(/\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?/);
  if (!match) {
    return '';
  }
  const part = match[0];
  if (part.includes('-')) {
    const [minStr, maxStr] = part.split('-');
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
    const totalMin = min * weight;
    const totalMax = max * weight;
    const perDoseMin = totalMin / dosesPerDay;
    const perDoseMax = totalMax / dosesPerDay;
    return `${totalMin.toFixed(1)}‑${totalMax.toFixed(1)} mg/día (≈${perDoseMin.toFixed(1)}‑${perDoseMax.toFixed(1)} mg/toma)`;
  } else {
    const dose = parseFloat(part);
    const total = dose * weight;
    const perDose = total / dosesPerDay;
    return `${total.toFixed(1)} mg/día (≈${perDose.toFixed(1)} mg/toma)`;
  }
}

/**
 * Rellena el datalist de diagnósticos.
 */
function populateDiagnoses() {
  const datalist = document.getElementById('diagnosis-list');
  diagnosesData.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.name;
    datalist.appendChild(option);
  });
}

/**
 * Muestra el resultado de la pauta elegida en función del diagnóstico y peso.
 */
function showRegimenResult(evt) {
  evt.preventDefault();
  const weightInput = document.getElementById('weight');
  const diagnosisInput = document.getElementById('diagnosis');
  const weight = parseFloat(weightInput.value);
  const diagnosisName = diagnosisInput.value.trim();
  const resultContainer = document.getElementById('regimen-result');
  resultContainer.innerHTML = '';
  if (!diagnosisName) {
    resultContainer.innerHTML =
      '<div class="alert alert-danger">Debe seleccionar un diagnóstico.</div>';
    return;
  }
  const diagnosis = diagnosesData.find((d) => d.name.toLowerCase() === diagnosisName.toLowerCase());
  if (!diagnosis) {
    resultContainer.innerHTML =
      '<div class="alert alert-danger">Diagnóstico no encontrado en la base de datos.</div>';
    return;
  }
  // Crear tabla para mostrar los regímenes.
  const table = document.createElement('table');
  table.className = 'table table-bordered result-table';
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Escenario</th>
      <th>Antibiótico(s)</th>
      <th>Vía</th>
      <th>Dosis (mg/kg/día)</th>
      <th>Nº de dosis/día</th>
      <th>Dosis total (aprox.)</th>
      <th>Duración</th>
      <th>Notas</th>
      <th>Referencia</th>
    </tr>`;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  diagnosis.regimens.forEach((reg) => {
    const tr = document.createElement('tr');
    const doseTotal = computeDoses(reg.dose_mgkg_day, weight, reg.doses_per_day);
    tr.innerHTML = `
      <td>${reg.scenario}</td>
      <td>${reg.antibiotic}</td>
      <td>${reg.route}</td>
      <td>${reg.dose_mgkg_day}</td>
      <td>${reg.doses_per_day || ''}</td>
      <td>${doseTotal}</td>
      <td>${reg.duration || ''}</td>
      <td>${reg.notes || ''}</td>
      <td><a href="${getPdfLink(reg.reference)}" target="_blank">ver</a></td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  resultContainer.appendChild(table);
}

/**
 * Devuelve la URL del PDF con ancla a una referencia, si se conoce.
 *
 * La referencia es la cita en formato tether ID y líneas. Extraemos sólo el tether ID (antes del †)
 * y construimos un enlace que abra el PDF. Si no se puede extraer, enlaza al PDF sin ancla.
 *
 * @param {string} ref Texto de referencia tipo 【tether†Lstart-Lend】
 */
function getPdfLink(ref) {
  // Extraer el identificador del tether (número antes del símbolo †)
  const match = ref && ref.match(/【(\d+)†/);
  if (match) {
    // No existe un enlace directo a esa posición en el PDF; simplemente abrimos el PDF
    return 'https://raw.githubusercontent.com/anavarromingo-cmyk/Guia_ATB/main/ATB_HNJS.pdf';
  }
  return 'https://raw.githubusercontent.com/anavarromingo-cmyk/Guia_ATB/main/ATB_HNJS.pdf';
}

/**
 * Rellena la lista de antibióticos y configura la búsqueda.
 */
function populateAntibiotics() {
  const searchInput = document.getElementById('antibiotic-search');
  const listContainer = document.getElementById('antibiotic-list');
  const detailsContainer = document.getElementById('antibiotic-details');
  function renderList(filter = '') {
    listContainer.innerHTML = '';
    const filtered = antibioticData.filter((ab) =>
      ab.name.toLowerCase().includes(filter.toLowerCase())
    );
    filtered.forEach((ab) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'list-group-item list-group-item-action';
      item.textContent = ab.name;
      item.addEventListener('click', () => {
        renderDetails(ab);
      });
      listContainer.appendChild(item);
    });
  }
  function renderDetails(antibiotic) {
    detailsContainer.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = antibiotic.name;
    const general = document.createElement('p');
    general.innerHTML = `<strong>Dosis general:</strong> ${antibiotic.general}`;
    const indicationsList = document.createElement('ul');
    indicationsList.className = 'list-unstyled';
    antibiotic.indications.forEach((ind) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${ind.indication}:</strong> ${ind.dose}`;
      indicationsList.appendChild(li);
    });
    cardBody.appendChild(title);
    cardBody.appendChild(general);
    cardBody.appendChild(indicationsList);
    card.appendChild(cardBody);
    detailsContainer.appendChild(card);
  }
  // Inicializar lista completa
  renderList();
  // Añadir evento de búsqueda
  searchInput.addEventListener('input', (ev) => {
    renderList(ev.target.value);
    detailsContainer.innerHTML = '';
  });
}


/**
 * Rellena la lista de agentes y configura la búsqueda de sensibilidades.
 * Muestra una tabla de antibióticos con porcentaje de sensibilidad, coloreando
 * cada celda en función del valor (alto ≥90%, medio 70‑89%, bajo <70%).
 */
function populateAgents() {
  const searchInput = document.getElementById('agent-search');
  const listContainer = document.getElementById('agent-list');
  const detailsContainer = document.getElementById('agent-details');
  if (!searchInput || !listContainer) return;
  function renderList(filter = '') {
    listContainer.innerHTML = '';
    const filtered = agentSensitivity.filter((ag) =>
      ag.name.toLowerCase().includes(filter.toLowerCase())
    );
    filtered.forEach((ag) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'list-group-item list-group-item-action';
      btn.textContent = ag.name;
      btn.addEventListener('click', () => {
        renderDetails(ag);
      });
      listContainer.appendChild(btn);
    });
  }
  function renderDetails(agent) {
    detailsContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'sensitivity-table';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Antibiótico</th><th>Sensibilidad (%)</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    Object.entries(agent.sensitivity).forEach(([ab, perc]) => {
      const tr = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = ab;
      const percCell = document.createElement('td');
      percCell.textContent = perc;
      // Asignar clase según porcentaje
      if (perc >= 90) {
        percCell.classList.add('high');
      } else if (perc >= 70) {
        percCell.classList.add('medium');
      } else {
        percCell.classList.add('low');
      }
      tr.appendChild(nameCell);
      tr.appendChild(percCell);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    detailsContainer.appendChild(table);
  }
  // Inicializar lista
  renderList();
  searchInput.addEventListener('input', (ev) => {
    renderList(ev.target.value);
    detailsContainer.innerHTML = '';
  });
}

// Asignar eventos y rellenar datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  populateDiagnoses();
  populateAntibiotics();
  // Rellenar agentes sólo si el campo existe
  if (document.getElementById('agent-search')) {
    populateAgents();
  }
  document.getElementById('regimen-form').addEventListener('submit', showRegimenResult);

  // Configurar navegación por pestañas
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (ev) {
      ev.preventDefault();
      // Utilizar this para obtener el enlace pulsado
      const targetId = this.getAttribute('data-target');
      if (!targetId) return;
      // Cambiar pestaña activa
      document.querySelectorAll('.tab-section').forEach((section) => {
        if (section.id === targetId) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
      // Actualizar enlace activo
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
