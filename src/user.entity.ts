import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Bazada 'users' degan jadval ochiladi
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: 500 }) // Yangi kirgan odamda 500 token bo'ladi
  balance: number;

  @Column({ nullable: true })
  picture: string;
}