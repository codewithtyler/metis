import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, User, Users } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User as UserType } from '../types';

const getRoleDisplay = (role: string) => {
  const roleMap: Record<string, string> = {
    'admin': 'Administrator',
    'agent': 'Support Agent',
    'customer': 'Customer'
  };
  return roleMap[role] || role;
};

const getStatusDisplay = (status: string) => {
  const statusMap: Record<string, string> = {
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending'
  };
  return statusMap[status] || status;
};

export default function TeamManagement() {
  const { user } = useAuth();
  const [allTeamMembers, setAllTeamMembers] = useLocalStorage<UserType[]>('team_members', []);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('agent');
  const [editingMember, setEditingMember] = useState<UserType | null>(null);

  // Filter team members to only show those in the same team
  const teamMembers = allTeamMembers.filter(member => member.teamId === user?.teamId);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement team member invitation
    setShowInviteForm(false);
    setEmail('');
    setRole('agent');
  };

  const handleEdit = (member: UserType) => {
    setEditingMember(member);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement member update
    setEditingMember(null);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to access team management.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Team Management" description="Manage support team members and roles" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
        <button
          onClick={() => setShowInviteForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Invite Team Member
        </button>
      </div>

      {showInviteForm && (
        <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
          <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
            <h2 className="text-lg font-medium mb-4 text-dark-100">Invite Team Member</h2>
            <form onSubmit={handleInvite}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark-200"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full border border-dark-600 rounded-md shadow-sm py-2 px-3 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-dark-200"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-dark-600 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="agent">{getRoleDisplay('agent')}</option>
                    <option value="admin">{getRoleDisplay('admin')}</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="px-4 py-2 border border-dark-600 rounded-md text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {teamMembers.length === 0 ? (
        <div className="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
          <Users className="mx-auto h-12 w-12 text-dark-400" />
          <h3 className="mt-2 text-sm font-medium text-dark-100">No Team Members</h3>
          <p className="mt-1 text-sm text-dark-400">
            Get started by inviting team members to collaborate.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowInviteForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Invite Team Member
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-dark-800 shadow-lg overflow-hidden rounded-lg border border-dark-700">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-dark-700 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-dark-700 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-dark-700 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 bg-dark-700 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-dark-700"></th>
              </tr>
            </thead>
            <tbody className="bg-dark-800 divide-y divide-dark-700">
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <User className="h-10 w-10 text-dark-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-dark-100">
                          {member.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-dark-100">
                      <Mail className="h-4 w-4 mr-2 text-dark-400" />
                      {member.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    {getRoleDisplay(member.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-300">
                    {getStatusDisplay(member.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-primary hover:text-primary-hover transition-colors duration-150 px-2 py-1 rounded hover:bg-dark-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingMember && (
        <div className="fixed inset-0 bg-dark-900/75 flex items-center justify-center">
          <div className="bg-dark-800 rounded-lg p-8 max-w-md w-full border border-dark-700">
            <h2 className="text-lg font-medium mb-4 text-dark-100">Edit Team Member</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-200">Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="mt-1 block w-full border border-dark-600 rounded-md shadow-sm py-2 px-3 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-200">Role</label>
                  <select
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-dark-600 bg-dark-700 text-dark-100 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="agent">{getRoleDisplay('agent')}</option>
                    <option value="admin">{getRoleDisplay('admin')}</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 border border-dark-600 rounded-md text-sm font-medium text-dark-200 bg-dark-800 hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}