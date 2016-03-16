class AddConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: this.props.conferences,
      league: this.props.league
    }
  }

  handleConferenceSubmit(conference) {
    $.ajax({
      url: '/admin/leagues/'+this.state.league.id+'/conferences',
      dataType: 'json',
      type: 'POST',
      data: conference,
      success: function ( conferences ) {
        this.setState({conferences: conferences});
      }.bind(this)
    });
  }

  handleConferenceDelete(conference) {
    $.ajax({
      url: '/admin/leagues/'+conference.league_id+'/conferences/'+conference.id,
      dataType: 'json',
      type: 'DELETE',
      data: this.props.conference,
      success: function ( conferences ) {
        this.setState({conferences: conferences});
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="col-md-8">
        <h2>{this.props.league.name}</h2>
        <AddConferenceForm
          onConferenceSubmit={this.handleConferenceSubmit.bind(this)}
        />
        <ConferenceList
        data={this.state.conferences}
        onConferenceDelete={this.handleConferenceDelete.bind(this)}
        />
      </div>
    );
  }
}

class AddConferenceForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    var conferenceName = this.refs.addConferenceTextInput.value.trim();
    this.refs.addConferenceTextInput.value=""
    this.props.onConferenceSubmit({name: conferenceName})

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
        <div key={conference.id}>
          <Conference
            conference={conference}
            onConferenceDelete={this.props.onConferenceDelete.bind(this)}
          />
        </div>
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
  handleDelete(e) {
    e.preventDefault();
    this.props.onConferenceDelete(this.props.conference)
    return
  }

  render(){
    return (
      <div className='Conference'>
        <h2>{this.props.conference.name}</h2>
        <form
          onSubmit={this.handleDelete.bind(this)}>
          <input
            type='submit'
            value='Delete Conference'
            />
        </form>
      </div>
    )
  }
}
