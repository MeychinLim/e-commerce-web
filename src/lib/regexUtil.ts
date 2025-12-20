export const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(.{8,20})$/;

export const emailRegex = /^\S+@\S+\.\S+$/;

export const phoneNumberRegex = /^[0-9()+\s]+$/;

export const roleRegex = /^[a-zA-Z0-9_]+$/;
