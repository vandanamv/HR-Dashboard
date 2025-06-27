import { useMemo } from "react";

export function useSearch(users, search, filters) {
  return useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase());

      const matchDepartment =
        filters.departments.length === 0 ||
        filters.departments.includes(user.department);

      const matchRating =
        filters.ratings.length === 0 || filters.ratings.includes(user.rating);

      return matchSearch && matchDepartment && matchRating;
    });
  }, [users, search, filters]);
}
