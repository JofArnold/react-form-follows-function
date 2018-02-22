# TODO: react-form-follows-function

A form component with validations using child child functions or render props. See [placeholder.js](https://github.com/JofArnold/react-form-follows-function/blob/master/placeholder.js) for roughly how the code will look

Features:

- Handle asyncronous and syncronous validation of form fields. 

- Exported flow types

- Child functions

- Customizeable validations with sensible defaults


### Example use

```
<div>
  <div>
    <h3>Enter your card details</h3>
    <FormFields
      onValuesChange={this.handleFieldChange}
      isAsyncronouslyValidating={this.props.isChecking}
      values={this.state.formValues}
    >
      {({
        setValueForField,
        getValueForField,
        getErrorMessagesForField,
      }) => (
        <div className="">
          <InputText
            errorMessages={getErrorMessagesForField("card_number")}
            label="Number"
            onChange={event => setValueForField(event, "card_number")}
            placeholder="**** **** **** ****"
            type="text"
            value={getValueForField("card_number")}
            showLabel
          />
          <InputText
            errorMessages={getErrorMessagesForField("card_cvc")}
            label="Security card / CVC"
            onChange={event => setValueForField(event, "card_cvc")}
            placeholder="***"
            type="text"
            value={getValueForField("card_cvc")}
            showLabel
          />
        </div>
      )}
    </FormFields>
  </div>
  <h3>Submit</h3>
  <FormFields
    onValuesChange={this.handleFieldChange}
    values={this.state}
  >
    {({ getIsFormValid }) => (
      <div>
        <Button
          className="order-1 order-2-m mb0-m mb3"
          disabled={!getIsFormValid()}
          priority="3"
          size="2"
          onClick={() => alert()}
        >
          Add card
        </Button>
      </div>
    )}
  </FormFields>
</div>
```
