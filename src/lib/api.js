export async function fetchUsers(limit = 20) {
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.users;
}
