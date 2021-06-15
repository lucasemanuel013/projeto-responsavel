import { Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'

import { v4 as uuid } from 'uuid'
import { Responsavel } from './Responsavel';

@Entity('despesas')
class Despesa {

  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'id_responsavel' })
  @ManyToOne(() => Responsavel)
  responsavel: Responsavel;

  @Column()
  id_responsavel: string;

  @Column()
  data_compra: Date;

  @Column()
  local_compra: string;

  @Column()
  valor: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Despesa }