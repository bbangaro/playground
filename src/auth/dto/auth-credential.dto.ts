import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'username only accepts english and number',
  })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
