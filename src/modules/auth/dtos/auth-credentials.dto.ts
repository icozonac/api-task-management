import { IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @IsString()
  @MaxLength(64)
  @MinLength(8)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password is too weak. It must contain upper, lower, numbers and symbols.',
    },
  )
  password: string;
}
