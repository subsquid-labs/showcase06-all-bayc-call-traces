import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {TransactionTouchingBayc} from "./transactionTouchingBayc.model"

@Entity_()
export class IndirectCallToBayc {
    constructor(props?: Partial<IndirectCallToBayc>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => TransactionTouchingBayc, {nullable: true})
    txn!: TransactionTouchingBayc

    @Index_()
    @Column_("text", {nullable: false})
    directCaller!: string

    @Index_()
    @Column_("text", {nullable: false})
    sighash!: string
}
