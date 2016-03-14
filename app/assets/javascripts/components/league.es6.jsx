class AddConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addConferenceInput: '',
      conferences: this.props.conferences
    }
  }

  handleUserInput(addConferenceInput) {
    this.setState({addConferenceInput: addConferenceInput});
  }

  handleConferenceSubmit(conference) {
    $.ajax({
      url: this.props.createConferencePath,
      dataType: 'json',
      type: 'POST',
      data: conference,
      success: function ( conference ) {
        console.dir(conference)
        this.setState({conferences: conference});
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <AddConferenceForm
          addConferenceInput={this.state.addConferenceInput}
          onUserInput={this.handleUserInput.bind(this)}
          onConferenceSubmit={this.handleConferenceSubmit.bind(this)}
        />
        <ConferenceList
        data={this.state.conferences}
        />
      </div>
    );
  }
}

class AddConferenceForm extends React.Component {
  handleChange() {
    this.props.onUserInput(
      // ref is like the id
      this.refs.addConferenceTextInput.value
      );
    }

  handleSubmit(e) {
    e.preventDefault();
    var conferenceName = this.refs.addConferenceTextInput.value.trim();
    this.props.onConferenceSubmit({name: conferenceName})
    this.refs.addConferenceTextInput.value = ''
    return
  }

	render() {
		return (
      <form
        className="AddConferenceForm"
        onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Conference Name"
          ref="addConferenceTextInput"
          value= {this.props.addConferenceInput}
          onChange= {this.handleChange.bind(this)}
        />
        <input
          type="submit"
          value="Add New Conference"
          />
      </form>
    );
	}
}

class ConferenceList extends React.Component {
  render(){
    var conferenceNodes = this.props.data.map((conference) => {
      return (
        <Conference name={conference.name} key={conference.id} />
      )
    });
    return (
      <div className="conferenceList">
        {conferenceNodes}
      </div>
    )
  }
}

class Conference extends React.Component {
  render(){
    return (
      <div className='Conference'>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}
