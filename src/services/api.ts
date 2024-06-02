import ky, { Options, HTTPError, KyResponse } from "ky"

import * as types from "@/types/api"

const DUMMY_HTTP_ERROR = { response: { status: 0 } }
const prepareOptions = (options: Options, addCsrf: boolean = false) => {
  if (!options.prefixUrl) options.prefixUrl = "/api/v1"
  if (!options.json && addCsrf && CSRF_TOKEN) options.json = {}
  if (addCsrf && CSRF_TOKEN) (options.json as any)._csrf = CSRF_TOKEN //eslint-disable-line

  return options
}

let CSRF_TOKEN: string | null = null

export const setCsrfToken = (token: string) => {
  CSRF_TOKEN = token
}

export const parseResponse = async (
  request: Promise<KyResponse>,
  onError?: () => void | null,
  handlers?: types.handleErrorHandlers | null
) => {
  try {
    const response = await request
    return await response.json()
  } catch (err) {
    handleError(err, handlers)
    if (onError) onError()
  }
}

export const parseError: types.parseError = (err) => {
  if (!err || !(err as HTTPError).response) return DUMMY_HTTP_ERROR as HTTPError
  return err as HTTPError
}

export const defaultErrorHandler = (error: HTTPError) => {
  console.log(`Default handler: ${error.response.status}`, error)
}

export const handleError: types.handleError = (_error, handlers) => {
  const error = parseError(_error)

  const code = error.response.status

  if (!handlers) handlers = {}

  const checkForHandler = () => {
    if (code >= 400 && code < 500) {
      // Check 4xx errors
      if (typeof handlers["4xx"] !== "undefined") handlers["4xx"](error)
      else if (code > 404 && typeof handlers["404+"] !== "undefined")
        handlers["404+"](error)
      else if (
        typeof handlers[code as types.handleErrorHandlersKeys] !== "undefined"
      )
        handlers[code as types.handleErrorHandlersKeys]!(error)
      else defaultErrorHandler(error)
    } else if (code >= 500) {
      // check 5xx errors
      if (typeof handlers["5xx"] !== "undefined") handlers["5xx"]()
      else if (code > 500 && typeof handlers["500+"] !== "undefined")
        handlers["500+"](error)
      else if (
        typeof handlers[code as types.handleErrorHandlersKeys] !== "undefined"
      )
        handlers[code as types.handleErrorHandlersKeys]!(error)
      // Other errors
      else defaultErrorHandler(error)
    } else {
      defaultErrorHandler(error)
    }
  }

  checkForHandler()
}

// METHODS
export const post = (url: string, options: Options) => {
  options = prepareOptions(options, true)
  return ky.post(url, options)
}

export const get = async (url: string, options: Options = {}) => {
  options = prepareOptions(options)
  return ky.get(url, options)
}

export const del = async (url: string, options: Options = {}) => {
  options = prepareOptions(options, true)
  return ky.delete(url, options)
}
