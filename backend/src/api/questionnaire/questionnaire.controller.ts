import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import {ApiBearerAuth} from '@nestjs/swagger';
import {CreateQuestionnaireDto} from './dto/create-questionnaire.dto';
import {QuestionnaireService} from './questionnaire.service';

@ApiBearerAuth()
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  getAll(): Promise<CreateQuestionnaireDto[]> {
    return this.questionnaireService.getAll();
  }

  @Get('/:email')
  getByUser(@Param() userEmail: {email: string}): Promise<CreateQuestionnaireDto[]> {
    return this.questionnaireService.getByUser(userEmail.email);
  }

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto): Promise<string> {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Put()
  update(@Body() createQuestionnaireDto: CreateQuestionnaireDto): Promise<CreateQuestionnaireDto> {
    return this.questionnaireService.update(createQuestionnaireDto);
  }

  @Delete('/:id')
  delete(@Param() id: {id: string}): Promise<CreateQuestionnaireDto> {
    return this.questionnaireService.deleteById(id.id);
  }
}
