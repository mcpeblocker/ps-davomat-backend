const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const client = new PrismaClient();

const users = [
  {
    name: "Alisher Ortiqov",
    username: "mcpeblocker",
    password: "okey",
    role: "ADMIN",
  },
  {
    name: "Yo'ldoshbek Xo'jayev",
    username: "khojayev12",
    password: "okey",
    role: "MENTOR",
  },
  {
    name: "Islomong",
    username: "islomxoja",
    password: "okey",
    role: "TEACHER",
  },
];

async function main() {
  console.log("Start seeding...");

  for (let data of users) {
    data.password = bcrypt.hashSync(data.password, 5);
    const user = await client.user.create({ data });
    console.log(`User created with id ${user.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await client.$disconnect();
    process.exit(1);
  });
