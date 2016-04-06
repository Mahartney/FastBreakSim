class ViewPane extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){

    return(

      <row className="tabbable col-md-12">
        <ul className="nav nav-tabs" id="myTab">
         <li className="active"><a href="#tabLeagues" data-toggle="tab">Leagues ({this.props.filteredData.leagues.length})</a></li>
         <li><a href="#tabConferences" data-toggle="tab">Conferences ({this.props.filteredData.conferences.length})</a></li>
         <li><a href="#tabTeams" data-toggle="tab">Teams({this.props.filteredData.teams.length})</a></li>
         <li><a href="#tabPlayers" data-toggle="tab">Players({this.props.filteredData.players.length})</a></li>
         <li><a href="#tabUsers" data-toggle="tab">Users({this.props.filteredData.users.length})</a></li>
        </ul>

        <ViewTabPanels
          submitPost={this.props.submitPost}
          filteredData={this.props.filteredData}
          data={this.props.data}
          submitDelete={this.props.submitDelete}
          handleLeagueSelect={this.props.handleLeagueSelect}
          />
      </row>
    )
  }
}

class ViewTabPanels extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return(
        <div className="tab-content">
          <LeagueTabPanel
            filteredData={this.props.filteredData}
            submitPost={this.props.submitPost}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
            handleLeagueSelect={this.props.handleLeagueSelect}
          />
          <ConferenceTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
            submitPost={this.props.submitPost}
          />
          <TeamTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
            submitPost={this.props.submitPost}
          />
          <PlayerTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
            submitPost={this.props.submitPost}
          />
          <UserTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
          />
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
