import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {Question} from '../interfaces/question.interface';
export class CreateQuestionnaireDto {

  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly questions: Question[];

  @ApiModelProperty()
  readonly shared: string[];

  @ApiModelProperty()
  readonly dateModified: Date;

  @ApiModelProperty()
  readonly completed: string[];

  @ApiModelProperty()
  readonly published: boolean;

  @ApiModelProperty()
  readonly completionTime: number[];
}
