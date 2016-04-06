class ConferenceTabPanel extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    return(
      <div className="tab-pane" id="tabConferences">
        <ConferenceTab
          filteredData={this.props.filteredData}
          submitDelete={this.props.submitDelete}
          submitPost={this.props.submitPost}
          data={this.props.data}
        />
      </div>
    )
  }
}

class ConferenceTab extends React.Component{
  constructor(){
    super();
    this.state={
      filteredconferences: []
    }
  }

  render(){
    return(
      <div>
        <ConferenceVertTabs
          filteredData={this.props.filteredData}
        />
        <ConferencePanel
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
          filteredData={this.props.filteredData}
          data={this.props.data}
        />
      </div>
    )
  }
}



class ConferenceVertTabs extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    var conferenceVertTabs = this.props.filteredData.conferences.map((conference) => {
      return(
        <li key={conference.id}>
          <a href={"#conference_tab_"+conference.id} data-toggle="tab">{conference.name}</a>
          <ConferenceVertTab conference={conference}/>
        </li>
      )
    })
    return(
      <ul className="nav nav-tabs nav-stacked col-md-2">
        {conferenceVertTabs}
      </ul>
    )
  }
}

class ConferenceVertTab extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return(
      <div></div>
    )
  }
}

class ConferencePanel extends React.Component{
  constructor(){
    super();

  }

  render(){
    var conferenceTabs = this.props.filteredData.conferences.map((conference)=> {
      var league = $.grep(this.props.data.leagues, function(league){
        return league.id === conference.league_id
      })
      var conferenceTeams = $.grep(this.props.data.teams, function(team){
        return team.conference_id == conference.id
      } )
      return (
        <div className="tab-pane" id={"conference_tab_"+conference.id} key={conference.id}>
          <ConferencePanelHeader
            conference={conference}
            teams={conferenceTeams}
            league={league[0]}
            submitPost={this.props.submitPost}
            submitDelete={this.props.submitDelete}
            />
          <TableList
            conference={conference}
            teams={conferenceTeams}
            league={league}
            submitPost={this.props.submitPost}
            submitDelete={this.props.submitDelete}
            />
        </div>
        )
      }
    )
    return(
      <div className="tab-content col-md-10">
        {conferenceTabs}
      </div>
    )
  }
}
class ConferencePanelHeader extends React.Component{
  constructor(){
    super();

  }

  handleSubmit(e){
    e.preventDefault();
    var name = this.refs.teamName.value.trim()
    this.refs.teamName.value=""
    this.props.submitPost(`/admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}/teams`, {name: name})
  }

  selectLeague(){
    $('#myTab a[href="#tabLeagues"]').tab('show')
    $(`#tabLeagues a[href='#league_tab_${this.props.conference.league_id}']`).tab('show')
    console.log(`#tabLeagues a[href='#league_tab_${this.props.conference.league_id}']`)
  }

  render(){
    return(
      <div className="col-md-12">
        <h2
          className="col-md-1"
          onClick={this.selectLeague.bind(this)}>&larr; {this.props.league.name}</h2>
        <h1 className="col-md-7">{this.props.conference.name}</h1>
        <div className="col-md-4">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input
                type="textArea"
                placeholder="Add Team"
                ref="teamName"
              />
              <input
                className="btn btn-primary"
                type="submit"
                value="Add Team"

              />
          </div>
          </form>

        </div>
      </div>
    )
  }
}

class TableList extends React.Component {
  constructor(){
    super();

  }

  render(){
    teamRows = this.props.teams.map((team) =>{
      var handleDelete = function(e){
        e.preventDefault();
        this.props.submitDelete(`admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}/teams/${team.id}`, team)
      }
      var selectTeam = function() {
          $('#myTab a[href="#tabTeams"]').tab('show')
          $(`#tabTeams a[href='#team_tab_${team.id}']`).tab('show')
        }
      return(
        <tr key={team.id}>
          <td
            onClick={selectTeam.bind(this)}
            className="col-sm-2">Go</td>
          <td>{team.name}</td>
          <td className="col-sm-2">User</td>
          <td
            className="glyphicon glyphicon-remove"
            onClick={handleDelete.bind(this)}>
          </td>
        </tr>
      )
    })
    return(
      <table className="panelList table table-sm">
        <thead>
          <tr>
            <td>Navigate To</td>
            <td>Team Name</td>
            <td>User</td>
            <td>Delete?</td>
          </tr>
        </thead>
        <tbody>
          {teamRows}
        </tbody>
      </table>
    )
  }
}
