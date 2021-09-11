import { UsernamePasswordRegistrationInput } from "../resolvers/usernamePasswordRegistrationInput";

export const validateRegister = (options: UsernamePasswordRegistrationInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email is not valid",
      },
    ];
  }

  if (
    !options.role.toLowerCase().includes("host") &&
    !options.role.toLowerCase().includes("browse")
  ) {
    return [
      {
        field: "role",
        message: "Role is not valid",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length must be atlest 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include @",
      },
    ];
  }

  if (options.password.length <= 5) {
    return [
      {
        field: "password",
        message: "Length must be atleast 5",
      },
    ];
  }

  return null;
};
