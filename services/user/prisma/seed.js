const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        profession: "Administrator",
        role: "ADMIN",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("password", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: "Yoga",
        profession: "Backend Developer",
        email: "christianuswibisono@gmail.com",
        password: bcrypt.hashSync("password", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })