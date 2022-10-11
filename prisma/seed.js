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

const groups = [
  {
    grade: 11,
    mentorId: 2,
  },
];

const students = [
  {
    name: "Ollayor Masharipov",
    classId: 1,
  },
];

const extras = [
  {
    name: "Musiqa",
    teacherId: 3,
    classId: 1,
    day: "SUNDAY",
    hour: 17,
    minute: 00,
  },
  {
    name: "Fizika",
    teacherId: 3,
    classId: 1,
    day: "MONDAY",
    hour: 17,
    minute: 00,
  },
];

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
