import { HTTPError } from "ky"

export type handleErrorFunction = (error?: HTTPError) => void

export type parseError = (err: unknown) => HTTPError
export enum handleErrorHandlersKeys {
  "400",
  "401",
  "402",
  "403",
  "404",
  "4xx",
  "404+",
  "500",
  "5xx",
  "500+",
}
export type handleErrorHandlers = {
  [Key in keyof typeof handleErrorHandlersKeys]?: handleErrorFunction
  // "400"?: handleErrorFunction
  // "401"?: handleErrorFunction
  // "402"?: handleErrorFunction
  // "403"?: handleErrorFunction
  // "404"?: handleErrorFunction
  // "4xx"?: handleErrorFunction
  // "404+"?: handleErrorFunction
}
export type handleError = (
  error: unknown,
  handlers?: handleErrorHandlers | null
) => void
