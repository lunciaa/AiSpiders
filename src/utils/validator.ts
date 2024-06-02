const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const EMAIL_REGEX =
  /^[^\W_]+\w*(?:[.-]\w*)*[^\W_]+@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{1,})$/

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password)
}

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email)
}
