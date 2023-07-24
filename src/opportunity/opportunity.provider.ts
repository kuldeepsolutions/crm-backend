import {Mongoose} from 'mongoose';
import { OpportunitySchema } from './schema/opportunity.schema';


export const opportunityProviders = [
    {
        provide : 'OPPORTUNITY_MODEL',
        useFactory : (mongoose : Mongoose) => mongoose.model('Opportunity',OpportunitySchema),
        inject : ['DATABASE_CONNECTION']
    }
]