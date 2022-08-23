import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import config from '@config/default';
import { hashPassword } from '@utils/bcrypt.utils';
import { UserRole } from '@interfaces/user/user.interface';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  public role: UserRole;

  @Column({ nullable: true })
  public fullname: string;

  @Column({ nullable: true, unique: true })
  public email: string;

  @Column({ nullable: true, unique: true })
  public phone: string;

  @Column({ nullable: true })
  public password: string;

  @Column({ nullable: true })
  private tempPassword: string;

  @Column({ nullable: true })
  public token: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
  
  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password && this.password !== this.tempPassword) {
      const genSalt = config.app.bcrypt.genSalt;
      this.password = await hashPassword(this.password, genSalt);
      this.tempPassword = this.password;
    }
  }
}
