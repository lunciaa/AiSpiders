import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { form_state } from "@/types/forms"

import * as api from "@/services/api"

import {
  get_csrf,
  post_account_check_email,
  post_account_login,
  response_errors,
} from "@/types/responses"
import LayoutInputEmail from "../molecules/LayoutInputEmail"
import LayoutFormResetText from "../atoms/LayoutFormResetText"
import LayoutButton from "../atoms/LayoutButton"
import LayoutInputPassword from "../molecules/LayoutInputPassword"
import { validateEmail, validatePassword } from "@/utils/validator"
import useContentHeader from "@/hooks/useContentHeader"
import useAuth from "@/hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import LayoutErrors from "../atoms/LayoutErrors"

const LoginForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [formState, setFormState] = useState<form_state>("start")
  const [formError, setFormError] = useState<string | null>(null)
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [csrfCounter, setCsrfCounter] = useState<number>(0)
  const { setHeader } = useContentHeader()

  const location = useLocation()
  const navigate = useNavigate()

  const auth = useAuth()

  const { t } = useTranslation()

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = (await api.parseResponse(
        api.get("csrf-token")
      )) as get_csrf
      if (response?.csrf_token) api.setCsrfToken(response.csrf_token)
    }

    getCsrfToken()
  }, [formState, csrfCounter])

  useEffect(() => {
    if (password.length === 0 && formState !== "start") {
      setPasswordErrors(["silent"])
    }

    if (email.length === 0) {
      setEmailErrors(["silent"])
    }
  }, [formState])

  useEffect(() => {
    setHeader(t(`form_name_${formState}`))
  }, [formState])

  useEffect(() => {
    if (passwordErrors.length > 0 || emailErrors.length > 0) {
      setIsButtonEnabled(false)
    } else {
      if (email.length === 0) {
        setIsButtonEnabled(false)
      } else if (formState !== "start") {
        if (password.length === 0) {
          setIsButtonEnabled(false)
        } else {
          setIsButtonEnabled(true)
        }
      } else {
        setIsButtonEnabled(true)
      }
    }
  }, [emailErrors, passwordErrors, formState, email, password])

  useEffect(() => {
    // Parse email errors
    let timeout: NodeJS.Timeout

    if (email.length > 0) {
      timeout = setTimeout(() => {
        const result = validateEmail(email)

        if (!result) setEmailErrors(["error_form_invalid_email"])
        else {
          setEmailErrors([])
        }
      }, 650)
    } else {
      setEmailErrors(["silent"])
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [email])

  useEffect(() => {
    // Parse password errors
    let timeout: NodeJS.Timeout

    if (formState === "start") return setPasswordErrors([])

    if (password.length > 0) {
      if (formState === "login") setPasswordErrors([])
      else
        timeout = setTimeout(() => {
          const result = validatePassword(password)
          if (!result) {
            setPasswordErrors(["error_form_invalid_password"])
          } else {
            setPasswordErrors([])
          }
        }, 800)
    } else {
      setPasswordErrors(["silent"])
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [password])

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setPassword(evt.target.value)
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault()

    if (formState === "start") {
      // validate email
      try {
        const response = await api.post("account/check-email", {
          json: { email },
        })

        const json = (await response.json()) as post_account_check_email

        if (json.available) setFormState("register")
        else setFormState("login")
      } catch (err) {
        api.handleError(err)
        setCsrfCounter(csrfCounter + 1)
      }
    } else if (formState == "login") {
      try {
        const response = await api.post("account/login", {
          json: { email, password },
        })

        const json = (await response.json()) as post_account_login

        if (json.ok) {
          auth.login({ location, navigate })
        }
      } catch (err) {
        api.handleError(err, {
          401: () => {
            setFormError("error_form_invalid_credentials")
          },
        })
        setCsrfCounter(csrfCounter + 1)
      }
    } else if (formState === "register") {
      try {
        const response = await api.post("account/register", {
          json: { email, password },
        })

        const json = (await response.json()) as post_account_login

        if (json.ok) {
          auth.login({ location, navigate })
        }
      } catch (err) {
        api.handleError(err, {
          400: async (err) => {
            const response = (await err?.response.json()) as response_errors

            if (!response.errors) api.defaultErrorHandler(api.parseError(err))

            response.errors.forEach(({ field, msg }) => {
              if (field === "email") setEmailErrors([msg])
              else if (field === "password") setEmailErrors([msg])
              else console.log(msg)
            })
          },
        })
        setCsrfCounter(csrfCounter + 1)
      }
    }
  }

  const handleReset = () => {
    setEmail("")
    setFormState("start")
    setPassword("")
    setPasswordErrors([])
    setEmailErrors([])
    setFormError(null)
  }

  const buttonText = t(
    formState === "start"
      ? "form_next"
      : formState === "register"
      ? "form_register"
      : "form_login"
  )

  return (
    <motion.div style={{ marginTop: "100px" }} exit={{ opacity: 0 }}>
      <form onSubmit={handleFormSubmit}>
        <LayoutInputEmail
          value={email}
          onChange={handleEmailChange}
          disabled={formState === "login"}
          errors={emailErrors}
        />
        <LayoutInputPassword
          errors={passwordErrors}
          value={password}
          onChange={handlePasswordChange}
          show={formState !== "start"}
        />
        <motion.div layout style={{ height: "10px" }}></motion.div>
        <LayoutButton disabled={!isButtonEnabled}>{buttonText}</LayoutButton>
        <LayoutFormResetText
          show={formState === "login"}
          handleReset={handleReset}
        >
          {t("form_not_you")}
        </LayoutFormResetText>
        <motion.div layout style={{ height: "10px" }}></motion.div>
        {formError && <LayoutErrors errors={[formError]} />}
      </form>
    </motion.div>
  )
}

export default LoginForm
