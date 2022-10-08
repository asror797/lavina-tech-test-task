import { Entity , PrimaryGeneratedColumn , Column, CreateDateColumn , UpdateDateColumn } from "typeorm"


@Entity({
   name:"books"
})

export class Books {
   @PrimaryGeneratedColumn("uuid")
   id:string

   @Column({
      type:"text",
      nullable:false
   })
   title:string

   @Column({
      type:"varchar",
      length:64,
      nullable:false

   })
   publish_date:string

   @Column({
      type:"int",
      nullable:false
   })
   number_of_pages:number

   @Column({
      type:"integer",
      default:0,
      nullable:false
   })
   status:number

   @Column({
      type:"varchar",
      length:32,
      nullable:false
   })
   isbn:string

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}