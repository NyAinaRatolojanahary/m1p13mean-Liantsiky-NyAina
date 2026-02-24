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
        prix: Math.floor(Math.random() * 100000) + 1000,
        stock: Math.floor(Math.random() * 50) + 1,
        categorieId: categorie._id,
        boutiqueId: boutique._id,
        dateCreation: new Date()
      })
    }
  })
})

print("✅ SEED TERMINE AVEC SUCCES")