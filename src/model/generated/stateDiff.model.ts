import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {TransactionTouchingBayc} from "./transactionTouchingBayc.model"

@Entity_()
export class StateDiff {
    constructor(props?: Partial<StateDiff>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => TransactionTouchingBayc, {nullable: true})
    txn!: TransactionTouchingBayc

    @Index_()
    @Column_("text", {nullable: false})
    key!: string

    @Column_("text", {nullable: false})
    kind!: string

    @Column_("text", {nullable: true})
    prev!: string | undefined | null

    @Column_("text", {nullable: true})
    next!: string | undefined | null
}
