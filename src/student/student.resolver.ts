import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { Student } from 'src/entities';
import { CreateStudentInput } from './student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query((returns) => [StudentType])
  async students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
