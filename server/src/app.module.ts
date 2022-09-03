import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { SetModule } from './modules/set/set.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [WorkoutModule, ExerciseModule, SetModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
