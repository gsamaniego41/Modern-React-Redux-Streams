import React from "react";
import {Field, reduxForm} from "redux-form";
// Field and reduxForm are helpers
// Field is a React component
// reduxForm is a function, same functionality as connect() function
class StreamCreate extends React.Component {
  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  // renderInput(formProps) {
  renderInput = ({input, label, meta}) => {
    // console.log(formProps);
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
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
          autoComplete="off"
        />
        {/* <div>{meta.error}</div> - instead of writing logic here, define a helper method*/}
        {this.renderError(meta)}
      </div>
    );
  };

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
        className="ui form error"
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
  //  - Doesn't come w/ Redux-Form we have to create it
  //  - formValues is going to contain all the diff
  //    values that exist inside of our form
  //  - will get called when form is initially rendered OR
  //    user interacts with it

  const errors = {};
  // Did the user enter valid inputs?
  if (!formValues.title) {
    // only run if the user did not enter a title
    errors.title = "You must enter a title";
    // if the error object has a property w/ the same name we give it
    // in <Form />, that property + value will be passed to this.renderInput()
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  //unlike connect(), reduxForm receives a single object = configuration
  form: "streamCreate", // value is what the purpose of the form is
  validate
})(StreamCreate);
