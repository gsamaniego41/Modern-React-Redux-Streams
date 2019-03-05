import React from "react";
import {Field, reduxForm} from "redux-form";
// Field and reduxForm are helpers
// Field is a React component
// reduxForm is a function, same functionality as connect() function
class StreamCreate extends React.Component {
  // renderInput(formProps) {
  renderInput({input, label}) {
    // console.log(formProps);

    return (
      <div className="field">
        <label>{label}</label>
        <input
          /* 
        type="text"
        onChange={formProps.input.onChange}
        value={formProps.input.value} 
        */
          // Same as:
          // {...formProps.input}
          // Same as:
          {...input}
        />
      </div>
    );
  }

  // onSubmit(event) {
  onSubmit(formValues) {
    // this is a helper method
    // can be used to send data to an API, validate, etc
    // this.props.handleSubmit() automatically takes in
    // the event object and uses preventDefault
    console.log(formValues);
    //
  }

  render() {
    return (
      <form
        className="ui form"
        // this.props.handleSubmit is provided by Redux Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/* Field is any type of input. name prop required */}
        {/* 
          Field is just a component, and not resposible for getting anything on the screen 
          To tell it what to show, we need a component prop:
            - either a React component or
            - a function for the field to call 
            - They need to return some element that will be shown on he screen
          It's up to us to show the component and customize it in some fashion
        */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  // Doesn't come w/ Redux-Form we have to create it
  // formValues is going to contain all the diff
  // values that exist inside of our form

  const errors = {};
  // Did the user enter valid inputs?
  if (!formValues.title) {
    // only run if the user did not enter a title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
};

export default reduxForm({
  //unlike connect(), reduxForm receives a single object = configuration
  form: "streamCreate" // value is what the purpose of the form is
})(StreamCreate);
