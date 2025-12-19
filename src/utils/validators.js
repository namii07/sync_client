export const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

export const isPasswordValid = (password) => password.length >= 6;

export const isUsernameValid = (username) => username.length >= 3;
