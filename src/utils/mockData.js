const departments = ["Engineering", "HR", "Marketing", "Sales", "Design"];

export function assignDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

export function assignRating() {
  return Math.floor(Math.random() * 5) + 1; // 1 to 5
}
