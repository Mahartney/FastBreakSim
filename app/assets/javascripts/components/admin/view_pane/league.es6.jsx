class AddConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: this.props.conferences,
      league: this.props.league,
      created_at_date: new Date(this.props.league.created_at)
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <row className="col-md-12">
          <h2 className="col-md-8">{this.props.league.name}</h2>
          <AddConferenceForm
            league={this.props.league}
            submitPost={this.props.submitPost}
          />
        </row>
        <row className="col-md-12">
          <ul>
            <li>League Created: {this.state.created_at_date.toDateString()}</li>
            <li>Conferences: {this.props.conferences.length}</li>
            <li>Teams: {this.props.teams}</li>
          </ul>
        </row>

        <ConferenceList
        data={this.props.data}
        conferences={this.props.conferences}
        submitDelete={this.props.submitDelete}
        submitPost={this.props.submitPost}
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
    this.props.submitPost('/admin/leagues/'+this.props.league.id+'/conferences', {name: conferenceName})
  }

	render() {
		return (
      <form
        className="AddConferenceForm col-md-4"
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
    var conferenceNodes = this.props.conferences.map((conference) => {
      var conferenceTeams = $.grep(this.props.data.teams, function(team){
        return team.conference_id == conference.id
      })
      return (
        <Conference
          conference={conference}
          submitDelete={this.props.submitDelete}
          conferenceTeams={conferenceTeams}
          submitPost={this.props.submitPost}
        />
      )
    });
    return (
      <table className="conferenceList">
        <thead>
          <tr>
            <td>Delete?</td>
            <td>Name</td>
            <td>Active</td>
          </tr>
        </thead>
        <tbody>
          {conferenceNodes}
        </tbody>
      </table>
    )
  }
}

class Conference extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }

  }

  handleSubmit(e){
    e.preventDefault();
    this.props.submitPost(`/admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}/teams`, {name: "placeholder"})
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.submitDelete(`/admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}`, this.props.conference)
    return
  }

  selectConference(){
    $('#myTab a[href="#tabConferences"]').tab('show')
    $(`#tabConferences a[href='#conferencetab_${this.props.conference.id}']`).tab('show')
  }

  render(){
    return (
      <tr key={this.props.conference.id}>
        <td
          className="glyphicon glyphicon-remove"
          onClick={this.handleDelete.bind(this)}>
        </td>
        <td
          onClick={this.selectConference.bind(this)}>
          {this.props.conference.name}
        </td>
        <td>
          Active: True/False
        </td>
      </tr>
    )
  }
}
