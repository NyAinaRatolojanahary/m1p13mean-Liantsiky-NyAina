// =======================================
// To Use: dans docker mongo container
// docker exec -i mongo mongosh mean-db < seed.js
// =======================================

// 🔴 RESET DATABASE
db.roles.deleteMany({})
db.utilisateurs.deleteMany({})
db.etages.deleteMany({})
db.boxes.deleteMany({})
db.boutiques.deleteMany({})
db.categorieproduits.deleteMany({})
db.produits.deleteMany({})
db.statusdisponibilites.deleteMany({})
db.loyerboxes.deleteMany({})
db.statustraitements.deleteMany({})
db.statuscontrats.deleteMany({})
db.statusdisponibilites.deleteMany({})
db.statusactives.deleteMany({})
db.modepaiements.deleteMany({})
db.jetons.deleteMany({})
db.portefeuilles.deleteMany({})
db.achatjetons.deleteMany({})
db.virementportefeuilles.deleteMany({})
db.typelivraisons.deleteMany({})
db.achats.deleteMany({})
db.achatdetails.deleteMany({})


// =======================================
// ROLES
// =======================================
db.roles.insertMany([
  { _id: ObjectId("69941343dc3e77fec38de666"), nom: "Client", status: 1 },
  { _id: ObjectId("69941343dc3e77fec38de667"), nom: "Boutique", status: 10 },
  { _id: ObjectId("69941343dc3e77fec38de668"), nom: "Admin", status: 20 }
])
// =======================================
// UTILISATEURS
// Mot de passe: sababacute
// =======================================
db.utilisateurs.insertMany([

  // CLIENTS
  {
    nom: "Rakoto",
    prenom: "Jean",
    dtn: new Date("1995-04-12"),
    email: "client1@test.com",
    telephone: "0341234567",
    adresse: "Antananarivo",
    password: "$2b$10$C.PuvhAqEUmycKn7khxVAe2aFv.Ggf.HqaFF/O1AgnIchS.FgUpiq",
    role: ObjectId("69941343dc3e77fec38de666"),
    dateCreation: new Date()
  },
  {
    nom: "Rasoanaivo",
    prenom: "Marie",
    dtn: new Date("1998-02-10"),
    email: "client2@test.com",
    telephone: "0331234567",
    adresse: "Fianarantsoa",
    password: "$2b$10$C.PuvhAqEUmycKn7khxVAe2aFv.Ggf.HqaFF/O1AgnIchS.FgUpiq",
    role: ObjectId("69941343dc3e77fec38de666"),
    dateCreation: new Date()
  },

  // BOUTIQUES (15 pour correspondre aux 15 box)
  ...Array.from({ length: 15 }, (_, i) => ({
    nom: "Shop",
    prenom: "Boutique" + (i + 1),
    dtn: new Date("1990-01-01"),
    email: "boutique" + (i + 1) + "@test.com",
    telephone: "034000000" + i,
    adresse: "Antananarivo",
    password: "$2b$10$C.PuvhAqEUmycKn7khxVAe2aFv.Ggf.HqaFF/O1AgnIchS.FgUpiq",
    role: ObjectId("69941343dc3e77fec38de667"),
    dateCreation: new Date()
  })),

  // ADMINS
  ...Array.from({ length: 5 }, (_, i) => ({
    nom: "Admin",
    prenom: "Admin" + (i + 1),
    dtn: new Date("1985-01-01"),
    email: "admin" + (i + 1) + "@test.com",
    telephone: "032000000" + i,
    adresse: "Antananarivo",
    password: "$2b$10$C.PuvhAqEUmycKn7khxVAe2aFv.Ggf.HqaFF/O1AgnIchS.FgUpiq",
    role: ObjectId("69941343dc3e77fec38de668"),
    dateCreation: new Date()
  }))

])

// =======================================
// ETAGES (3)
// =======================================
for (let i = 1; i <= 3; i++) {
  db.etages.insertOne({
    nom: "Etage " + i,
    dateCreation: new Date()
  })
}

// =======================================
// BOX (5 par étage)
// =======================================
const etages = db.etages.find().toArray()

etages.forEach(etage => {
  for (let i = 1; i <= 5; i++) {
    db.boxes.insertOne({
      nom: "Box " + i + " - " + etage.nom,
      etageId: etage._id,
      dateCreation: new Date()
    })
  }
})

// =======================================
// BOUTIQUES (1 par box)
// =======================================
const boxes = db.boxes.find().toArray()
const boutiqueUsers = db.utilisateurs.find({ role: ObjectId("69941343dc3e77fec38de667") }).toArray()

boxes.forEach((box, index) => {
  db.boutiques.insertOne({
    nom: "Boutique " + (index + 1),
    description: "Description boutique " + (index + 1),
    boxId: box._id,
    proprietaireId: boutiqueUsers[index]._id,
    dateCreation: new Date()
  })
})

// =======================================
// CATEGORIES (10)
// =======================================
const nomsCategories = [
  "Electronique",
  "Vetements",
  "Chaussures",
  "Accessoires",
  "Maison",
  "Beauté",
  "Sport",
  "Jouets",
  "Informatique",
  "Alimentation"
]

nomsCategories.forEach(nom => {
  db.categorieproduits.insertOne({
    nom,
    dateCreation: new Date()
  })
})

// =======================================
// PRODUITS
// 5 produits par catégorie par boutique
// =======================================
const boutiques = db.boutiques.find().toArray()
const categories = db.categorieproduits.find().toArray()

boutiques.forEach(boutique => {
  categories.forEach(categorie => {
    for (let i = 1; i <= 5; i++) {
      db.produits.insertOne({
        nom: "Produit " + i + " - " + categorie.nom,
        details: "Description produit " + i,
        prixActuel: Math.floor(Math.random() * 100000) + 1000,
        stock: Math.floor(Math.random() * 50) + 1,
        categorieId: categorie._id,
        boutiqueId: boutique._id,
        dateCreation: new Date()
      })
    }
  })
})

// =======================================
// STATUS TRAITEMENT
// =======================================
db.statustraitements.insertMany([
  { _id: ObjectId("69941343dc3e77fec38de888"), nom: "En cours", code: 10 },
  { _id: ObjectId("69941343dc3e77fec38de889"), nom: "Termine", code: 20 }
])

// =======================================
// STATUS CONTRAT
// =======================================
db.statuscontrats.insertMany([
  { nom: "Non paye", code: 0 },
  { nom: "Paye", code: 10 }
])

// =======================================
// STATUS DISPONIBILITE
// =======================================
db.statusdisponibilites.insertMany([
  { nom: "Disponible", code: 10 },
  { nom: "Occupe", code: 20 },
  { nom: "En maintenance", code: 30 }
])

// =======================================
// STATUS ACTIVE
// =======================================
db.statusactives.insertMany([
  { _id: ObjectId("69941343dc3e77fec38de777"), nom: "Active", code: 10 },
  { _id: ObjectId("69941343dc3e77fec38de778"), nom: "Desactive", code: 0 }
])

// =======================================
// MODE PAIEMENT
// =======================================
db.modepaiements.insertMany([
  { _id: ObjectId("69941343dc3e77fec38de999"), nom: "Mvola" },
  { _id: ObjectId("69941343dc3e77fec38de99a"), nom: "OrangeMoney" }
])

// =======================================
// JETONS
// =======================================
const activeStatus = db.statusactives.findOne({ code: 10 })
db.jetons.insertMany([
  { nom: "Pack 10 Jetons", montant: 10, status: activeStatus._id },
  { nom: "Pack 50 Jetons", montant: 50, status: activeStatus._id },
  { nom: "Pack 100 Jetons", montant: 100, status: activeStatus._id }
])

// =======================================
// PORTEFEUILLES
// =======================================
const allUsers = db.utilisateurs.find().toArray()
allUsers.forEach(user => {
  db.portefeuilles.insertOne({
    userId: user._id,
    solde: Math.floor(Math.random() * 500) + 50,
    createdAt: new Date(),
    updatedAt: new Date()
  })
})

// =======================================
// ACHAT JETONS (Exemple)
// =======================================
const client1 = db.utilisateurs.findOne({ email: "client1@test.com" })
const jetonPack = db.jetons.findOne({ montant: 50 })
const statusEncours = db.statustraitements.findOne({ code: 10 })
const modeMvola = db.modepaiements.findOne({ nom: "Mvola" })

db.achatjetons.insertOne({
  clientId: client1._id,
  modePaiementId: modeMvola._id,
  referenceVirement: "REF-TEST-001",
  dateDemande: new Date(),
  dateTraiter: null,
  note: "Achat de test",
  status: statusEncours._id,
  jetons: [
    {
      jetonId: jetonPack._id,
      prixUnitaire: 500,
      nombre: 1,
      total: 500
    }
  ],
  montantTotal: 500
})

// =======================================
// TYPE LIVRAISON
// =======================================
db.typelivraisons.insertMany([
  { nom: "Standard", commission: 1000 },
  { nom: "Express", commission: 5000 }
])


print("✅ SEED TERMINE AVEC SUCCES")