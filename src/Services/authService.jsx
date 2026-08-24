import api from "../api/axiosConfig";

export const signup = async (userData) => {
  return api.post("/st/sign-up", userData);
};

export const login = async (credentials) => {

  const loginResponse =
    await api.post("/st/login", credentials);

  const token = loginResponse.data.token;

  localStorage.setItem("token", token);

  localStorage.setItem(
    "user",
    JSON.stringify(loginResponse.data.userResp)
  );

  return loginResponse.data.userResp;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

//profile details

export const profileDetails = async () =>{
  const profileResponse =
    await api.get("/st/students/me");

    localStorage.setItem(
    "profile",
    JSON.stringify(profileResponse.data)
  );
 return profileResponse.data;
  
}
//forgot and reset password
export const forgotPassword = async (email) => {

    return await api.post(
        "/auth/forgot-password",
        { email }
    );
};

export const resetPassword = async (
    token,
    newPassword
) => {

    return await api.post(
        "/auth/reset-password",
        {
            token,
            newPassword
        }
    );
};


export const updateStudent = async(student) =>{
  const payload = {
        userName: student.userName,
        email: student.email,
        phone: student.phone,
        age: student.age
  }

  return await api.put(`/st/update/${student.id}`,payload)
}

export const ValidateAdminLogin = async (credentials) => {

  const loginResponse =
    await api.post("/st/login", credentials);

  const token = loginResponse.data.token;

  localStorage.setItem("token", token);

  localStorage.setItem(
    "Admin",
    JSON.stringify(loginResponse.data.userResp)
  );

  return loginResponse.data.userResp;
};