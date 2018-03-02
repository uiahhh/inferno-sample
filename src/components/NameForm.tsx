import { Component } from 'inferno';

export class NameForm extends Component<any, any> {


    form;

  constructor(props) {
    super(props)
    this.state = {value: { name: '', age: 0} };
    this.form = {
        name: {label: 'Name', required: true},
        age: {label: 'Age', required: true},
        getFieldValue: this.getFieldValue,
        setFieldState: this.setFieldState
    }
  }

  handleSubmit = (event) => {
    //alert('A name was submitted: ' + this.state.value);
    console.log('value: ', this.state.value)
    event.preventDefault();
  }

  getFieldValue = (field) => {
    return this.state.value[field];
  }  

  setFieldState = (fieldState) => {
    let state = {...this.state};
    state.value[fieldState.field] = fieldState.value;
    this.setState(state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>
          Name: ({this.state.value})
          <br/>
          <input type="text" value={this.state.value} onInput={this.handleChange} />
        </label> */}
        <br/>
        <br/>
        <InputForm form={this.form} field="name" />
        <br/>
        <br/>
        <InputForm form={this.form} field="age" />
        <br/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


class InputForm extends Component<any, any> {

    form;

    constructor(props) {
      super(props)
      this.form = props.form;

      this.state = { 
        hasError: false,
          field: props.field, 
          value: props.form.getFieldValue(props.field) 
        };
    }
  
    handleChange = (event) => {
      this.setState({value: event.target.value});
      this.form.setFieldState(this.state);
      this.validate();
    }

    handleLeave = (event) => {        
        this.validate();
    }

    validate = () => {
        let hasError = this.form[this.props.field].required && !this.state.value;
        this.setState({hasError});
        console.log('leave', this.state, this.state.hasError ? 'red' : 'white');
    }
  
    render() {
      return (
          <label>
            {this.props.label}
            <br/>
            <input style={'background: ' + (this.state.hasError ? 'red' : 'white') }
            type="text" value={this.state.value} onInput={this.handleChange} onBlur={this.handleLeave} />
          </label>
      );
    }
  }