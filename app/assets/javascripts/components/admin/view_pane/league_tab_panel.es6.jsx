class LeagueTabPanel extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <div className="tab-pane active" id="tabLeagues">
        <LeagueVertTabs
          filteredData={this.props.filteredData}
          submitDelete={this.props.submitDelete}
        />
        <LeaguePanes
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
          filteredData={this.props.filteredData}
          data={this.props.data}
        />
      </div>
    )
  }
}

class LeagueVertTabs extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    var leagueVertTabs = this.props.filteredData.leagues.map((league) => {
      return (
        <li key={league.id}>
          <a href={"#league_tab_"+league.id} data-toggle="tab">{league.name}</a>
          <LeagueVertTab
            league={league}
            submitDelete={this.props.submitDelete}
          />
        </li>
      )
    })
    return (
      <ul className="nav nav-tabs nav-stacked col-md-2">
        <CreateLeagueTab />
        {leagueVertTabs}
      </ul>
    )
  }
}

class CreateLeagueTab extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <li>
        <a href="#tab_create_league" data-toggle="tab">Create League...</a>
        <hr></hr>
      </li>
    )
  }
}

class LeagueVertTab extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }

  handleDelete(e){
    e.preventDefault();
    this.props.submitDelete('admin/leagues/'+this.props.league.id, this.props.league)
    return
  }

  render(){
    return(
      <form onSubmit={this.handleDelete.bind(this)}>
        <input
          type='submit'
          value="Delete"
        />
      </form>
    )
  }
}

class LeaguePanes extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render(){
    var leagueTabs = this.props.filteredData.leagues.map((league) => {
      var teams = 0
      var conferences = $.grep(this.props.data.conferences, function(conference){ return conference.league_id === league.id})
      for(i=0;i<conferences.length;i++){
        for(j=0;j<this.props.data.teams.length;j++){
          if(this.props.data.teams[j].conference_id==conferences[i].id){
            teams ++
          }
        }
      }
      return (
        <div className="tab-pane" id={"league_tab_"+league.id} key={league.id}>
          <AddConference
            submitPost={this.props.submitPost}
            submitDelete={this.props.submitDelete}
            league = {league}
            conferences= {conferences}
            teams={teams}
            data={this.props.data}
          />
        </div>
      )
    })
    return(
      <div className="tab-content col-md-10">
        <CreateLeaguePane submitPost={this.props.submitPost}/>
        {leagueTabs}
      </div>
    )
  }
}

class CreateLeaguePane extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  postLeague(e){
    e.preventDefault();
    var leagueName = this.refs.addLeagueTextInput.value.trim();
    this.refs.addLeagueTextInput.value=""
    this.props.submitPost('/admin/leagues', {name: leagueName})
  }

  render(){
    return(
      <div className="tab-pane" id="tab_create_league">
        <form
          className="AddLeagueForm"
          onSubmit={this.postLeague.bind(this)}
          >
          <input
            className="btn btn-primary col-md-2"
            type="submit"
            value="Add New League"
            />
          <input
            type="text"
            placeholder="League Name"
            ref="addLeagueTextInput"
            />
        </form>
      </div>
    )
  }
}

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
          className="btn btn-primary"
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
          key={conference.id}
          conference={conference}
          submitDelete={this.props.submitDelete}
          conferenceTeams={conferenceTeams}
          submitPost={this.props.submitPost}
        />
      )
    });
    return (
      <table className="panelList table table-sm">
        <thead>
          <tr>
            <td>Name</td>
            <td>Active</td>
            <td>Delete?</td>
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

  handleDelete(e) {
    e.preventDefault();
    this.props.submitDelete(`/admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}`, this.props.conference)
    return
  }

  selectConference(){
    $('#myTab a[href="#tabConferences"]').tab('show')
    $(`#tabConferences a[href='#conference_tab_${this.props.conference.id}']`).tab('show')
  }

  render(){
    return (
      <tr key={this.props.key}>
        <td
          onClick={this.selectConference.bind(this)}>
          {this.props.conference.name}
        </td>
        <td>
          Active: True/False
        </td>
        <td
          className="glyphicon glyphicon-remove"
          onClick={this.handleDelete.bind(this)}>
        </td>
      </tr>
    )
  }
}
