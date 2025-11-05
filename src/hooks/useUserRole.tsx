import { useState, useEffect } from 'react';

export type UserRole = 'admin' | 'organizer' | 'attendee';

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    setRole(storedRole);
  }, []);

  const updateRole = (newRole: UserRole) => {
    localStorage.setItem('userRole', newRole);
    setRole(newRole);
  };

  const clearRole = () => {
    localStorage.removeItem('userRole');
    setRole(null);
  };

  return { role, updateRole, clearRole };
};
