// @flow
import React, { Component } from "react"
import type { Node } from "react"
import type {
  FormFieldKeyType,
  FormFieldsStateType,
} from "@customer/components/form-fields/types"

type Props = {
  children?: Function | Node,
  getIsManualEntryMode?: () => void,
  isAsyncronouslyValidating?: boolean,
  onSetManualEntry?: Function,
  onValuesChange: Function,
  setManualEntryMode?: () => void,
  values: FormFieldsStateType,
}

type StatusType = {
  ok: boolean,
  message?: string,
}

type ValidationFunction = {
  [key: FormFieldKeyType]: (value: any) => StatusType,
}

const fieldValidations: ValidationFunction = {
  card_cvc: value =>
    value && value.length === 3
      ? { ok: true }
      : { ok: false, message: "Please enter a valid CVC" },
  card_expiry: value =>
    /^(0?[1-9]|1[012])\/20[1-9][0-9]$/.test(String(value))
      ? { ok: true }
      : { ok: false, message: "Please enter a valid expiry date" },
  card_name: value =>
    value && value.length > 0
      ? { ok: true }
      : { ok: false, message: "Please enter a valid name" },
  card_number: value =>
    /[1-4][0-9]{13,}/.test(String(value))
      ? { ok: true }
      : { ok: false, message: "Please enter a valid card number" },
  email: value =>
    /.+@.+\..+/.test(String(value))
      ? { ok: true }
      : { ok: false, message: "Please enter a valid email address" },
  first_name: value =>
    value && value.length > 0
      ? { ok: true }
      : { ok: false, message: "Please enter a valid first name" },
  last_name: value =>
    value && value.length > 0
      ? { ok: true }
      : { ok: false, message: "Please enter a valid last name" },
  line_1: value =>
    value && value.length > 1
      ? { ok: true }
      : { ok: false, message: "Please enter a valid address" },
  line_2: value =>
    value && value.length > 3
      ? { ok: true }
      : { ok: false, message: "Please enter a valid address" },
  name: value =>
    value && value.length > 0
      ? { ok: true }
      : { ok: false, message: "Please enter a valid name" },
  password: value =>
    value && value.length >= 10
      ? { ok: true }
      : {
          ok: false,
          message: "Passwords must be more than 10 numbers and characters long",
        },
  phone_number: value =>
    value && value.length > 5
      ? { ok: true }
      : { ok: false, message: "Please enter a valid phone number" },
  postcode: value =>
    value && value.length > 0
      ? { ok: true }
      : { ok: false, message: "Postcode is wrong" },
  recipient_name: value =>
    value && value.length > 1
      ? { ok: true }
      : { ok: false, message: "Please enter a valid name" },
  recipient_phone_number: value =>
    value && value.length > 5
      ? { ok: true }
      : { ok: false, message: "Please enter a valid phone number" },
}

const formInputs = [
  {
    label: "Name",
    name: "name",
    type: "text",
    showInAutoMode: true,
  },
  {
    label: "Phone number",
    name: "phone_number",
    type: "text",
    showInAutoMode: true,
  },
  {
    label: "First name",
    name: "first_name",
    type: "text",
    showInAutoMode: true,
  },
  {
    label: "Last name",
    name: "last_name",
    type: "text",
    showInAutoMode: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    showInAutoMode: true,
  },
  {
    label: "Address 1",
    name: "line_1",
    type: "text",
    showInAutoMode: false,
  },
  {
    label: "Address 2",
    name: "line_2",
    type: "text",
    showInAutoMode: false,
  },
  {
    label: "Post code",
    name: "postcode",
    type: "text",
    showInAutoMode: true,
  },
]

class FormFields extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  // IMPORTANT: Due to the way this checks the keys on this.props.values
  // in order for the validation to be done for you in this component
  // you should send in an object representing the empty values too.
  // E.g. {line_1: {}, line_2: {value: "thing"}} and not {line_2: {value: "thing"}}
  // without line_1 not present on the object
  getFormIsValid = () => {
    const oneError = Object.keys(fieldValidations).find(field => {
      const isFieldInValues = Object.keys(this.props.values).includes(field)
      let errorMessages
      if (isFieldInValues) {
        errorMessages = this.getErrorMessagesForField(field)
      }
      return Boolean(errorMessages && errorMessages.length)
    })
    return !oneError && !this.props.isAsyncronouslyValidating
  }

  getErrorMessagesForField = (field: FormFieldKeyType) => {
    const validationFunction = fieldValidations[field]
    if (typeof validationFunction === "function") {
      const entry = this.getEntryForField(field)
      const stateErrors = entry ? entry.errors || [] : []
      const val = entry ? entry.value : ""
      const { message, ok } = validationFunction(val)
      if (ok === true) {
        return stateErrors
      } else {
        return [...stateErrors, { message }]
      }
    }
    return [] // TODO handle this
  }

  getEntryForField = (field: FormFieldKeyType) => {
    return this.props.values[field]
  }

  getValueForField = (field: FormFieldKeyType) => {
    const entry = this.getEntryForField(field)
    return entry ? entry.value || "" : ""
  }

  setValueForField = (
    event: SyntheticEvent<HTMLInputElement>,
    field: FormFieldKeyType
  ): void => {
    this.props.onValuesChange(field, event.currentTarget.value)
  }

  render() {
    const { children, getIsManualEntryMode, setManualEntryMode } = this.props
    return (
      <div className="">
        {typeof children === "function"
          ? children({
              getErrorMessagesForField: this.getErrorMessagesForField,
              getIsFormValid: this.getFormIsValid,
              getValueForField: this.getValueForField,
              getIsManualEntryMode,
              setValueForField: this.setValueForField,
              setManualEntryMode,
            })
          : children}
      </div>
    )
  }
}

export default FormFields

export { formInputs }
