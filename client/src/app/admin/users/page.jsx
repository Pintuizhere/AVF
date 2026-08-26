"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  User as UserIcon,
  Filter,
  CheckCircle2,
  XCircle,
  X
} from "lucide-react";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Viewer",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Mock Users Data
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@avfproductions.com",
      role: "Super Admin",
      status: "Active",
      joined: "Jan 12, 2024",
      avatar: "A"
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@avfproductions.com",
      role: "Editor",
      status: "Active",
      joined: "Feb 05, 2024",
      avatar: "J"
    },
    {
      id: "3",
      name: "Sarah Smith",
      email: "sarah@avfproductions.com",
      role: "Viewer",
      status: "Inactive",
      joined: "Mar 18, 2024",
      avatar: "S"
    },
    {
      id: "4",
      name: "Mike Johnson",
      email: "mike@avfproductions.com",
      role: "Editor",
      status: "Active",
      joined: "Apr 22, 2024",
      avatar: "M"
    }
  ]);

  const roles = ["All", "Super Admin", "Editor", "Viewer"];

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch(role) {
      case "Super Admin": return "text-gold border-gold/30 bg-gold/10";
      case "Editor": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      case "Viewer": return "text-neutral-400 border-neutral-600/30 bg-neutral-800";
      default: return "text-white border-[#222] bg-[#111]";
    }
  };

  const getStatusIcon = (status) => {
    return status === "Active" 
      ? <CheckCircle2 className="w-4 h-4 text-green-500" />
      : <XCircle className="w-4 h-4 text-red-500" />;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userToAdd = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      avatar: newUser.name.charAt(0).toUpperCase()
    };

    setUsers([userToAdd, ...users]);
    setNewUser({ name: "", email: "", password: "", role: "Viewer" });
    setIsAddModalOpen(false);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email) return;
    
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white tracking-wide">Manage Users</h1>
          <p className="text-sm text-neutral-400 mt-1">Add, remove, or modify user roles and permissions.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]"
        >
          <Plus className="w-4 h-4 stroke-[2]" /> Add New User
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Filter className="w-4 h-4 text-neutral-500 hidden sm:block" />
          <div className="flex bg-[#111] border border-[#222] rounded-md p-1">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                  roleFilter === role 
                    ? "bg-[#222] text-white shadow-sm" 
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#111] border-b border-[#1a1a1a]">
                <th className="py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">Joined Date</th>
                <th className="py-4 px-6 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#111]/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-gold font-bold shadow-md">
                          {user.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{user.name}</span>
                          <span className="text-xs text-neutral-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getRoleColor(user.role)}`}>
                        {user.role === "Super Admin" && <ShieldCheck className="w-3 h-3" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <span className={`text-sm font-medium ${user.status === "Active" ? "text-white" : "text-neutral-500"}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-400">
                      {user.joined}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingUser(user); setIsEditModalOpen(true); }}
                          className="p-2 text-neutral-400 hover:text-white hover:bg-[#222] rounded transition-colors" title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-white hover:bg-[#222] rounded transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-neutral-500" />
                      </div>
                      <p className="text-neutral-400 text-sm">No users found matching your search.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setRoleFilter("All"); }}
                        className="text-gold text-xs font-bold uppercase tracking-widest hover:underline mt-2"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-[#1a1a1a] flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-medium">
              Showing {filteredUsers.length} of {users.length} users
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-[#111] hover:bg-[#222] border border-[#222] rounded text-xs text-neutral-400 transition-colors disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#111] hover:bg-[#222] border border-[#222] rounded text-xs text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
              <h2 className="text-lg font-bold text-white">Add New User</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#111] hover:bg-[#222] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
              <h2 className="text-lg font-bold text-white">Edit User</h2>
              <button 
                onClick={() => { setIsEditModalOpen(false); setEditingUser(null); }}
                className="text-neutral-500 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditUser} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</label>
                <select 
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Role</label>
                <select 
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditingUser(null); }}
                  className="flex-1 py-2.5 bg-[#111] hover:bg-[#222] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]"
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
