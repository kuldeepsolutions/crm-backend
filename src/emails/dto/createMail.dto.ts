import { IsNotEmpty, IsString } from "class-validator"

export class createMailDto{
    @IsString()
    @IsNotEmpty()
    sentTo: String
    subject: String
    text: String 
}