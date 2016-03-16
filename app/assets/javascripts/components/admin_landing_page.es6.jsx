class AdminLandingPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText: '',
      leagues: this.props.data.leagues,
      data: this.props.data
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText})
    console.log(filterText)
  }

  handleLeagueSubmit(league) {
    $.ajax({
      url: '/admin/leagues',
      dataType: 'json',
      type: 'POST',
      data: league,
      success: function ( leagues ) {
        data = this.state.data;
        data.leagues = leagues
        this.setState({data: data});
      }.bind(this),
      error: function(league){
        console.log("Error")
      }
    })
  }

  render(){
    return(
      <div className="container">
        <SearchPane
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
          handleLeagueSubmit={this.handleLeagueSubmit.bind(this)}
        />
        <ViewPane
          data={this.state.data}
          filterText={this.state.filterText}
        />
      </div>
    )
  }

}

class SearchPane extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText: this.props.filterText,
    }
  }

  render(){
    return(
      <div className="col-md-3">
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.props.onUserInput.bind(this)}
        />
        <CreateLeagueForm
          onLeagueSubmit={this.props.handleLeagueSubmit.bind(this)}
        />
      </div>
    )
  }
}

class SearchBar extends React.Component{
  handleChange(){
    this.props.onUserInput(
      this.refs.filterTextInput.value
    )
  }

  render(){
    return(
      <div className="row">
        <form>
          <input
            type="text"
            placeholder="Search Database..."
            ref="filterTextInput"
            onChange={this.handleChange.bind(this)}
          />
        </form>
      </div>
    )
  }
}

class CreateLeagueForm extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  handleSubmit(e){
    e.preventDefault();
    var leagueName = this.refs.addLeagueTextInput.value.trim();
    this.refs.addLeagueTextInput.value=""
    this.props.onLeagueSubmit({name: leagueName})
  }

  render(){
    return(
      <div className="row">
        <form
          className="AddLeagueForm"
          onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="League Name"
            ref="addLeagueTextInput"
          />
          <input
            type="submit"
            value="Add New League"
          />
        </form>
      </div>
    )
  }
}

class ViewPane extends React.Component{
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
    return(
      <div className="tabbable col-md-8">
        <ul className="nav nav-tabs">
         <li className="active"><a href="#tabLeagues" data-toggle="tab">Leagues ({this.state.filteredLeagues.length})</a></li>
         <li><a href="#tabConferences" data-toggle="tab">Conferences</a></li>
         <li><a href="#tabDivisions" data-toggle="tab">Divisions</a></li>
         <li><a href="#tabTeams" data-toggle="tab">Teams</a></li>
         <li><a href="#tabPlayers" data-toggle="tab">Players</a></li>
         <li><a href="#tabUsers" data-toggle="tab">Users</a></li>
        </ul>
        <ViewTabPanel data={this.props.data} filterText={this.props.filterText} />
      </div>
    )
  }
}

class ViewTabPanel extends React.Component {
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
    return(
        <div className="tab-content">
          <LeagueTabPanel filterText={this.props.filterText} data={this.props.data} />
          <ConferenceTabPanel />
          <DivisionTabPanel />
          <TeamTabPanel />
          <PlayerTabPanel />
          <UserTabPanel />
        </div>
    )
  }
}

class LeagueTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane active" id="tabLeagues">
        <LeagueTab data={this.props.data} filterText={this.props.filterText} />
      </div>
    )
  }
}

class ConferenceTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabConferences">
        <h1>Conferences</h1>
      </div>
    )
  }
}

class DivisionTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabDivisions">
        <h1>Divisions</h1>
      </div>
    )
  }
}

class TeamTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabTeams">
        <h1>Teams</h1>
      </div>
    )
  }
}

class PlayerTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabPlayers">
        <h1>Players</h1>
      </div>
    )
  }
}

class UserTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabUsers">
        <h1>Users</h1>
      </div>
    )
  }
}
