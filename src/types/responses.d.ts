// GET CSRF
export type get_csrf = {
  csrf_token: string
}

// ACCOUNT
export type post_account_check_email = {
  available: boolean
}

export type post_account_login = {
  ok: boolean
}

export type get_account = {
  id: string
  displayName: string | null
  profilePicture: string | null
}

// ACCOUNT ERRORS

export type response_form_error = {
  field: string
  msg: string
}

export type response_errors = {
  ok: boolean
  errors: form_error[]
}
