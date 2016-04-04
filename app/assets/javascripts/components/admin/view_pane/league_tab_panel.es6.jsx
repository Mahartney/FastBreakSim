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
          <a href={"#tab_"+league.id} data-toggle="tab">{league.name}</a>
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
  constructor(props){
    super(props);
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
        <div className="tab-pane" id={"tab_"+league.id} key={league.id}>
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

class CreateLeagueFormOverviewPane extends React.Component {
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    return(
      <div>
        <fieldset class="form-group">

          <label htmlFor="add_name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="add_name"
            placeholder="League Name"
          />
        </fieldset>

      </div>
    )
  }
}
