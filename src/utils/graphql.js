export const filterUsers = async (token, text) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
        query {
          getUsers(filter: "${text}") {
            id
            username
            bio
            profile_pic
          }
        }
        `,
      }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};
