export type form_error =
  | {
      field: string
      msg: string
    }[]
  | []

export type form_state = "start" | "login" | "register"
