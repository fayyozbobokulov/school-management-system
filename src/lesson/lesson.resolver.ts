import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/entities';
import { StudentService } from '../student/student.service';
import { CreateAssignStudentsToLessonInput } from './create-assign-students.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  async lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('createAssignStudentsToLessonInput')
    createAssignStudentsToLessonInput: CreateAssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      createAssignStudentsToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    return this.studentService.getManyStudents(lesson.students);
  }
}
