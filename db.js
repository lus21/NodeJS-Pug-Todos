import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export function connect(){
    return mongoose.connect(process.env.MLAB, () => {
        useMongoClient: true
    });
}