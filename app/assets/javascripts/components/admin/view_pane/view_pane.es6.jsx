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
         <li><a href="#tabPlayers" data-toggle="tab">Players</a></li>
         <li><a href="#tabUsers" data-toggle="tab">Users</a></li>
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
          />
          <TeamTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
          />
          <PlayerTabPanel
            filteredData={this.props.filteredData}
            data={this.props.data}
            submitDelete={this.props.submitDelete}
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
          <a href={"#conferencetab_"+conference.id} data-toggle="tab">{conference.name}</a>
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
      for(i=0;i<league.length;i++){
        selectLeague = function(){
          $('#myTab a[href="#tabLeagues"]').tab('show')
          $(`#tabLeagues a[href='#tab_${league[0].id}']`).tab('show')
        }
        return (
          <div className="tab-pane" id={"conferencetab_"+conference.id} key={conference.id}>
            <row>
              <h2 className="col-md-3" onClick={selectLeague.bind(this)}>&larr; {league[0].name}</h2>
              <h1 className="col-md-9">{conference.name}</h1>
            </row>
          </div>
          )
        }
      }
    )
    return(
      <div className="tab-content col-md-10">
        {conferenceTabs}
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
