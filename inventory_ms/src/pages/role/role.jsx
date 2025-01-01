import React, { useState } from "react";

const RolePage = () => {

  const [roles, setRoles] = useState([
    { RoleId: 1, RoleName: "Admin", RoleDescription: "admin..." , canEdit:true , canDelete:true ,canUpdate:true,canView:true },
    { RoleId: 2, RoleName: "User", RoleDescription: "user....." , canEdit:true , canDelete:true ,canUpdate:true,canView:true},
    { RoleId: 3, RoleName: "Viewer", RoleDescription: "Read only" , canEdit:true , canDelete:true ,canUpdate:true,canView:true},
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({ RoleName: "", RoleDescription: "", canEdit:false , canDelete:false ,canUpdate:false,canView:false});

  const [showViewModal, setShowViewModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.RoleId !== id));
  };
  const viewRole =(role) => {
      setCurrentRole(role);
      setShowViewModal(true);
    
  };
  const handleCloseViewModal =()=>{
    setShowViewModal(false);
  }

  const handleAddRole = () =>{
    const newRoleId  =roles.length ? roles[roles.length-1].RoleId + 1: 1;
    setRoles([...roles,{RoleId: newRoleId, ...newRole}]);
    setShowModal(false);
    setNewRole({RoleName: "", RoleDescription: "", permissions: []  });
  };

  const handleCheckboxChange = (permission) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <>
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Role Management</h1>
          
        </div>

        <table className="w-full">
          <thead>
            <tr >
              <th className="border px-4 py-2 ">Role ID</th>
              <th className="border px-4 py-2 ">Role Name</th>
              <th className="border px-4 py-2 ">Description</th>
              <th className="border px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.RoleId} >
                <td className="border px-4 py-2">{role.RoleId}</td>
                <td className="border px-4 py-2">{role.RoleName}</td>
                <td className="border px-4 py-2">{role.RoleDescription}</td>
                <td className="border px-4 py-2 flex justify-around space-x-2">
                  <button className="view"
                  onClick={()=>viewRole(role)}>View</button>
                  <button className="edit">Edit</button>
                  <button
                    className="delete"
                    onClick={() => deleteRole(role.RoleId)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-row-reverse  space-x-5 ">
            <button className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600"
            onClick={() => setShowModal(true)}>
            back
          </button>
        <button className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600"
          onClick={() => setShowModal(true)}>
            Add Role
          </button>
          
        </div>
      </div>
    </div>
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Add New Role</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Role Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newRole.RoleName}
                onChange={(e) => setNewRole({ ...newRole, RoleName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Role Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newRole.RoleDescription}
                onChange={(e) => setNewRole({ ...newRole, RoleDescription: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium mb-2">Permissions</h3>
              <div className="flex items-center mb-4">
                <div className="pr-8">
                  <input
                    type="checkbox"
                    id="canEdit"
                    name="canEdit"
                    value="canEdit"
                    checked={newRole.permissions.includes("canEdit")}
                    onChange={() => handleCheckboxChange("canEdit")}
                  />
                  <label htmlFor="canEdit" className="ml-2">Can Edit</label>
                </div>
                <div className="pl-8">
                  <input
                    type="checkbox"
                    id="canDelete"
                    name="canDelete"
                    value="canDelete"
                    checked={newRole.permissions.includes("canDelete")}
                    onChange={() => handleCheckboxChange("canDelete")}
                  />
                  <label htmlFor="canDelete" className="ml-2">Can Delete</label>
                </div>
              </div>
              <div className="flex items-center">
                <div className="pr-8">
                  <input
                    type="checkbox"
                    id="canView"
                    name="canView"
                    value="canView"
                    checked={newRole.permissions.includes("canView")}
                    onChange={() => handleCheckboxChange("canView")}
                  />
                  <label htmlFor="canView" className="ml-2">Can View</label>
                </div>
                <div className="pl-8">
                  <input
                    type="checkbox"
                    id="canAdd"
                    name="canAdd"
                    value="canAdd"
                    checked={newRole.permissions.includes("canAdd")}
                    onChange={() => handleCheckboxChange("canAdd")}
                  />
                  <label htmlFor="canAdd" className="ml-2">Can Add</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowModal(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleAddRole} // Add role
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
      {showViewModal && currentRole && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">View Role Details</h2>
            <div className="mb-4 text-left">
              <p>
                <strong>Role ID:</strong> {currentRole.RoleId}
              </p>
              <p>
                <strong>Role Name:</strong> {currentRole.RoleName}
              </p>
              <p>
                <strong>Role Description:</strong> {currentRole.RoleDescription}
              </p>
            </div>
            <div className="mb-4">
              <h3 className=" font-medium mb-2 text-left" ><strong>Permissions:</strong></h3>
              <ul className="list-disc list-inside ">
                {currentRole.permissions.map((perm, index) => (
                  <li key={index} className="text-gray-700">
                    {perm.replace("can", "Can ")}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={handleCloseViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RolePage;
