import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let SystemEventMongoDbSchema = function(collection?: string) {
    collection = collection || 'event_log';

    let schema = new Schema(
        {
            _id: { type: String },
            time: { type: Date, required: true, index: true },
            correlation_id: { type: String, required: false },
            source: { type: String, required: false, index: true },
            type: { type: String, required: true },
            severity: { type: Number, required: true, min: 0, max: 1000 },
            message: { type: String, required: true },
            details: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
