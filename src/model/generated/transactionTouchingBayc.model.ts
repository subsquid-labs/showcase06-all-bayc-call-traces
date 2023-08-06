import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {IndirectCallToBayc} from "./indirectCallToBayc.model"
import {StateDiff} from "./stateDiff.model"

@Entity_()
export class TransactionTouchingBayc {
    constructor(props?: Partial<TransactionTouchingBayc>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @Column_("text", {nullable: false})
    txnHash!: string

    @Index_()
    @Column_("text", {nullable: false})
    from!: string

    @Index_()
    @Column_("text", {nullable: false})
    to!: string

    @OneToMany_(() => IndirectCallToBayc, e => e.txn)
    calls!: IndirectCallToBayc[]

    @OneToMany_(() => StateDiff, e => e.txn)
    stateDiffs!: StateDiff[]
}
