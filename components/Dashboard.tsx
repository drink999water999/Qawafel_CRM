
import React from 'react';
import { Retailer, Vendor, Activity } from '../types.ts';
import { StatCard } from './StatCard.tsx';
import { ActivityFeed } from './ActivityFeed.tsx';

interface DashboardProps {
  retailers: Retailer[];
  vendors: Vendor[];
  activities: Activity[];
}

const RecentLeads: React.FC<{ leads: Retailer[] }> = ({ leads }) => (
    <div className="bg-white border border-[var(--border-color)] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
        <div className="space-y-4">
            {leads.slice(0, 2).map((lead, index) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                        <p className="font-semibold text-[var(--text-dark)]">{lead.name}</p>
                        <p className="text-sm text-[var(--text-light)]">{lead.company}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${index === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {index === 0 ? 'New' : 'Contacted'}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ retailers, vendors, activities }) => {
  const totalLeads = retailers.length;
  const totalVendors = vendors.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-dark)]">Dashboard</h1>
        <p className="mt-1 text-[var(--text-light)]">Welcome to your CRM dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Leads" value={totalLeads.toString()} change="+20.1% from last month" icon="users" color="blue" />
        <StatCard title="Active Deals" value="157" change="+12.5% from last month" icon="target" color="green" />
        <StatCard title="Vendors" value={totalVendors.toString()} change="+5.2% from last month" icon="store" color="purple" />
        <StatCard title="Retailers" value={totalLeads.toString()} change="+8.7% from last month" icon="building" color="orange" />
        <StatCard title="Revenue" value="$127,450" change="+15.3% from last month" icon="dollar" color="teal" />
        <StatCard title="Growth Rate" value="24.8%" change="+2.1% from last month" icon="chart" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <RecentLeads leads={retailers} />
        </div>
        <div>
            <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};
