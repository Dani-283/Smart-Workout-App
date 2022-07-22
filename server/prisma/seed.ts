import { PrismaClient, Prisma } from '@prisma/client';
// import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function seedExercises() {
  const data: Prisma.ExerciseCreateInput[] = [
    // {
    //   name: 'Bench press',
    //   id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Bench_press',
    // },
    // {
    //   name: 'Deadlift',
    //   id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Deadlift',
    // },
    // {
    //   name: 'Squat',
    //   id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Barbell_squat',
    // },
    // {
    //   name: 'Pull up',
    //   id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Pull_up',
    // },
    // {
    //   name: 'Dumbbell row',
    //   id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Dumbell_row',
    // },
    {
      name: 'Lat pulldown',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#LatPulldown',
    },
    {
      name: 'Dumbbell shoulder press',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Dumbbell_Shoulder_press',
    },
    {
      name: 'Leg press',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Leg_press',
    },
    {
      name: 'Bulgarian split squat',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Bulgarian_split_squat',
    },
    {
      name: 'Leg extension',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Leg_extension',
    },
    {
      name: 'Weighted push up',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Weighted_push_up',
    },
    {
      name: 'Push up',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Push_up',
    },
    {
      name: 'Dumbbell press',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Dumbbell_press',
    },
    {
      name: 'Leg curl',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Leg_curl',
    },
    {
      name: 'One arm cable row',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#One_arm_cable_row',
    },
    {
      name: 'Barbell row',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Barbell_row',
    },
    {
      name: 'Romanian Deadlift (RDL)',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Romanian_Deadlift',
    },
    {
      name: 'Hip thrust',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Hip_thrust',
    },
    {
      name: 'Dumbell curl seated',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Dumbell_curl_seated',
    },
    {
      name: 'Calf raise',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Calf_raise',
    },
    {
      name: 'Cable overhead extension',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Cable_overhead_extension',
    },
    {
      name: 'Cable lateral raise',
      id: 'http://www.semanticweb.org/đani/ontologies/2021/3/workout#Cable_lateral_raise',
    },
  ];

  for (const item of data) {
    const exercise = await prisma.exercise.create({ data: item });
    console.log('Created user with id', exercise.id);
  }
}

async function main() {
  // dotenv.config();
  await seedExercises();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
