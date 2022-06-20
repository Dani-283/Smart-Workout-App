import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
  imports: [WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
// import { WorkoutModule } from './modules/workout/workout.module';

// @Module({
//   imports: [
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, 'public'),
//     }),
//     WorkoutModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
