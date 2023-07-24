import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    type: { type: String, trim: true },
    industry: { type: String, trim: true },
    billingAddress: { type: String, trim: true },
    shippingAddress: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    tinNumber: { type: String, trim: true },
    contacts: { 
      type: [String],
      validate: {
        validator: function (array) {
          return new Set(array).size === array.length;
        },
        message: 'Array elements must be unique.',
      }, trim: true 
    },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    tags:[ { type: String, trim: true }],
    relationShips: [{ type: String, trim: true }],
    revenue: { type: String, trim: true },
    employees: [{ type: String, trim: true }],
    documents: [{ type: String, trim: true }],
    history: { type: String, trim: true },
    opportunities: [{ type: String, trim: true }],
    activities: [{ type: String, trim: true }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
