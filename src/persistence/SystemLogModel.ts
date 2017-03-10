let 
    mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,

    SystemLogSchema = new Schema(
        {
            _id: { type: String, unique: true },
            time: { type: Date, required: true, index: true, 'default': Date.now },
            server: { type: String, required: true, index: true },
            type: { type: String, required: true },
            severity: { type: Number, required: true, min: 0, max: 1000, 'default': 1 },
            details: { type: Mixed, required: false }
        },
        {
            collection: 'system_logs',
            autoIndex: true,
            strict: true
        }
    );

    SystemLogSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

module.exports = function(connection) {
    return connection.model('SystemLog', SystemLogSchema);
}
