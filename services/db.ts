import Dexie, { type EntityTable } from 'dexie';
import {
  Retailer, Vendor, Ticket, Proposal, Lead, Deal, UserProfile, Activity
} from '../types.ts';
import { INITIAL_RETAILERS, INITIAL_VENDORS, INITIAL_TICKETS, INITIAL_PROPOSALS, INITIAL_LEADS, INITIAL_DEALS, INITIAL_ACTIVITIES } from '../constants.ts';

const INITIAL_USER_PROFILE: UserProfile = {
  id: 1, // Use a fixed ID for the single user profile record
  fullName: 'Mohamed Hussein',
  email: 'mohamed@gmail.com',
  phone: '+1234567890'
};

class QawafelDB extends Dexie {
  retailers!: EntityTable<Retailer, 'id'>;
  vendors!: EntityTable<Vendor, 'id'>;
  tickets!: EntityTable<Ticket, 'id'>;
  proposals!: EntityTable<Proposal, 'id'>;
  leads!: EntityTable<Lead, 'id'>;
  deals!: EntityTable<Deal, 'id'>;
  userProfile!: EntityTable<UserProfile, 'id'>;
  activities!: EntityTable<Activity, 'id'>;

  constructor() {
    super('QawafelCRMDB');
    this.version(1).stores({
      retailers: '++id, name, company, accountStatus, marketplaceStatus',
      vendors: '++id, name, businessName, category, accountStatus, marketplaceStatus',
      tickets: '++id, status, type, userId, userType, createdAt',
      proposals: '++id, clientName, status, validUntil',
      leads: '++id, company, status, source',
      deals: '++id, stage, closeDate',
      userProfile: 'id', // Primary key is 'id', not auto-incrementing for this table
      activities: '++id, timestamp'
    });
  }
}

export const db = new QawafelDB();


export async function populateDatabase() {
    try {
        await db.transaction('rw', db.tables, async () => {
            if (await db.retailers.count() === 0) {
              await db.retailers.bulkPut(INITIAL_RETAILERS);
            }
            if (await db.vendors.count() === 0) {
              await db.vendors.bulkPut(INITIAL_VENDORS);
            }
            if (await db.tickets.count() === 0) {
              await db.tickets.bulkPut(INITIAL_TICKETS);
            }
            if (await db.proposals.count() === 0) {
              await db.proposals.bulkPut(INITIAL_PROPOSALS);
            }
            if (await db.leads.count() === 0) {
              await db.leads.bulkPut(INITIAL_LEADS);
            }
            if (await db.deals.count() === 0) {
              await db.deals.bulkPut(INITIAL_DEALS);
            }
            if (await db.userProfile.count() === 0) {
              await db.userProfile.put(INITIAL_USER_PROFILE);
            }
            if (await db.activities.count() === 0) {
              await db.activities.bulkPut(INITIAL_ACTIVITIES);
            }
      });
    } catch (error) {
        console.error("Failed to populate database:", error);
    }
}
