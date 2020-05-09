import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
export class CreateUserDto {

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly isAdmin?: boolean;

}