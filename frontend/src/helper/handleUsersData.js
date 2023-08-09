// Extract title and department of every user from roles data &
// add them to the user object
export const handleUsersData = (users, roles) => {
  console.log("users", users);
  console.log("roles", roles);
  const usersWithRole = users.map((user) => {
    const userRole = roles.find((role) => role?.user?.id === user.id);
    if (!userRole) {
      return {
        ...user,
        title: null,
        department: null,
      };
    }
    return {
      ...user,
      title: userRole.title,
      department: userRole.department,
    };
  });
  return usersWithRole;
};
