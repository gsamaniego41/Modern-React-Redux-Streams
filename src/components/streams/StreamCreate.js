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

  render() {
    return (
      <form className="ui form">
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
      </form>
    );
  }
}

export default reduxForm({
  //unlike connect(), reduxForm receives a single object = configuration
  form: "streamCreate" // value is what the purpose of the form is
})(StreamCreate);
