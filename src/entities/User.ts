import { IsEmail, IsNotEmpty } from "class-validator";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({ name: "email" })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @Column({ name: "first_name" })
  @IsNotEmpty()
  public firstName: string;

  @Column({ name: "last_name" })
  @IsNotEmpty()
  public lastName: string;

  @Column({ name: "password" })
  public password!: string;

  @Column({ name: "salt" })
  public salt!: string;

  @Column({ name: "is_enabled" })
  public isEnabled!: boolean;

  @Column({ name: "invitation_token" })
  public invitationToken!: string;

  @Column({ name: "reset_password_token" })
  public resetPasswordToken!: string;

  @Column({ name: "created_on" })
  public createdOn!: Date;

  @Column({ name: "updated_on" })
  public updatedOn!: Date;

  @Column({ name: "invitation_created_on" })
  public invitationCreatedOn!: Date;

  @Column({ name: "reset_password_created_on" })
  public resetPasswordCreatedOn!: Date;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public async validatePassword(password: string) {
    return true;
    throw new Error("Not implemented");
  }

  public async hashPassword(password: string) {
    throw new Error("Not implemented");
  }

  public sanitize() {
    this.password = "";
    this.salt = "";
    return this;
  }
}
