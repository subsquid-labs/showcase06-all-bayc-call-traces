module.exports = class Data1691297147424 {
    name = 'Data1691297147424'

    async up(db) {
        await db.query(`CREATE TABLE "indirect_call_to_bayc" ("id" character varying NOT NULL, "direct_caller" text NOT NULL, "sighash" text NOT NULL, "txn_id" character varying, CONSTRAINT "PK_376df478fcd201bf28422da5004" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_a0337b7b5807af6d989c58384e" ON "indirect_call_to_bayc" ("txn_id") `)
        await db.query(`CREATE INDEX "IDX_78ae8d5d1af86fb32ebbcf4a04" ON "indirect_call_to_bayc" ("direct_caller") `)
        await db.query(`CREATE INDEX "IDX_00f1a765920125f66f1a1e5387" ON "indirect_call_to_bayc" ("sighash") `)
        await db.query(`CREATE TABLE "state_diff" ("id" character varying NOT NULL, "key" text NOT NULL, "kind" text NOT NULL, "prev" text, "next" text, "txn_id" character varying, CONSTRAINT "PK_df5f1190d67ff8c8401429c8ba1" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5773f8cff9aeb856f4cfe553da" ON "state_diff" ("txn_id") `)
        await db.query(`CREATE INDEX "IDX_0bac93a415c5da6c1564223103" ON "state_diff" ("key") `)
        await db.query(`CREATE TABLE "transaction_touching_bayc" ("id" character varying NOT NULL, "block" integer NOT NULL, "txn_hash" text NOT NULL, "from" text NOT NULL, "to" text NOT NULL, CONSTRAINT "PK_064702d6b4b2f483e26a668cdb4" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_79df22eb6d2de6e215ec6720f2" ON "transaction_touching_bayc" ("block") `)
        await db.query(`CREATE INDEX "IDX_0a07ee2e4531bddb11dd48bbdd" ON "transaction_touching_bayc" ("txn_hash") `)
        await db.query(`CREATE INDEX "IDX_540b77e395854f844daf9de9f1" ON "transaction_touching_bayc" ("from") `)
        await db.query(`CREATE INDEX "IDX_ff1d6cf642a89515dad0ae8504" ON "transaction_touching_bayc" ("to") `)
        await db.query(`ALTER TABLE "indirect_call_to_bayc" ADD CONSTRAINT "FK_a0337b7b5807af6d989c58384e9" FOREIGN KEY ("txn_id") REFERENCES "transaction_touching_bayc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "state_diff" ADD CONSTRAINT "FK_5773f8cff9aeb856f4cfe553dac" FOREIGN KEY ("txn_id") REFERENCES "transaction_touching_bayc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "indirect_call_to_bayc"`)
        await db.query(`DROP INDEX "public"."IDX_a0337b7b5807af6d989c58384e"`)
        await db.query(`DROP INDEX "public"."IDX_78ae8d5d1af86fb32ebbcf4a04"`)
        await db.query(`DROP INDEX "public"."IDX_00f1a765920125f66f1a1e5387"`)
        await db.query(`DROP TABLE "state_diff"`)
        await db.query(`DROP INDEX "public"."IDX_5773f8cff9aeb856f4cfe553da"`)
        await db.query(`DROP INDEX "public"."IDX_0bac93a415c5da6c1564223103"`)
        await db.query(`DROP TABLE "transaction_touching_bayc"`)
        await db.query(`DROP INDEX "public"."IDX_79df22eb6d2de6e215ec6720f2"`)
        await db.query(`DROP INDEX "public"."IDX_0a07ee2e4531bddb11dd48bbdd"`)
        await db.query(`DROP INDEX "public"."IDX_540b77e395854f844daf9de9f1"`)
        await db.query(`DROP INDEX "public"."IDX_ff1d6cf642a89515dad0ae8504"`)
        await db.query(`ALTER TABLE "indirect_call_to_bayc" DROP CONSTRAINT "FK_a0337b7b5807af6d989c58384e9"`)
        await db.query(`ALTER TABLE "state_diff" DROP CONSTRAINT "FK_5773f8cff9aeb856f4cfe553dac"`)
    }
}
