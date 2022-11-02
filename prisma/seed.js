const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const client = new PrismaClient();

const mentors = require("./mentors.json");
const teachers = require("./teachers.json");
const admins = require("./admins.json");

const groups = require("./classes.json");
const students = require("./students.json");

const users = [...mentors, ...teachers, ...admins];

const extras = require('./extras.json');

async function main() {
  console.log("Start seeding...");

  for (let data of users) {
    data.password = bcrypt.hashSync(data.password, 5);
    const user = await client.user.create({ data });
    console.log(`User created with id ${user.id}`);
  }

  for (let data of groups) {
    const group = await client.class.create({ data });
    console.log(`Group created with id ${group.id}`);
  }

  for (let data of students) {
    const student = await client.student.create({ data });
    console.log(`Student created with id ${student.id}`);
  }

  for (let data of extras) {
    const extra = await client.extra.create({ data });
    console.log(`Extra created with id ${extra.id}`);
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
