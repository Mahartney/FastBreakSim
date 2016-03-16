class LeagueConferences extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leagues: this.props.leagues,
      conferences: this.props.conferences
    }
  }

  render(){
    var leagueTabs = this.state.leagues.map((league) => {
      var conferences = $.grep(this.state.conferences, function(conference){ return conference.league_id === league.id})
      return (
        <div className="tab-pane" id={"tab_"+league.id} key={league.id}>
          <AddConference
            league = {league}
            conferences= {conferences}
          />
        </div>
      )
    })
    return(
      <div className="tab-content col-md-10">
        {leagueTabs}
      </div>
    )
  }
}

class LeagueVertTabs extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: this.props.data,
      filteredLeagues: []
    }
  }

  render(){

    var data = this.props.filterText

    this.state.filteredLeagues = $.grep(this.state.data.leagues,
    function(league){
      return league.name.indexOf(data) !== -1
    }.bind(this))

    var leagueVertTabs = this.state.filteredLeagues.map((league) => {
      return (
        <li key={league.id}>
          <a href={"#tab_"+league.id} data-toggle="tab">{league.name}</a>
        </li>
      )
    })
    return (
      <ul className="nav nav-tabs nav-stacked col-md-2">
        {leagueVertTabs}
      </ul>
    )
  }
}

class LeagueTab extends React.Component{
  constructor(props){
    super(props)
    this.state={
      leagues: this.props.data.leagues,
      conferences: this.props.data.conferences
    }
  }

  render(){
    return(
      <div>
        <LeagueVertTabs
          data={this.props.data}
          filterText={this.props.filterText}
        />
        <LeagueConferences
          leagues={this.state.leagues}
          conferences={this.state.conferences}
        />
      </div>
    )
  }
}
