class PlayerTabPanel extends React.Component{
  constructor(){
    super();

  }
  render(){
    return(
      <div className="tab-pane" id="tabPlayers">
        <PlayerVertTabs
          filteredData={this.props.filteredData}
          />
        <PlayerPanes
          data={this.props.data}
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
          />
      </div>
    )
  }
}

class PlayerVertTabs extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    var teamPlayerTabs = this.props.filteredData.players.map((player)=>{
      return(
        <li key={player.id}>
          <a
            href={`#player_tab_${player.id}`}
            data-toggle="tab"
            >
            {player.last_name}, {player.first_name}
            </a>
        </li>
      )
    })
    return(
      <ul className="nav nav-tabs nav-stacked col-md-2">
        {teamPlayerTabs}
      </ul>
    )
  }
}

class PlayerPanes extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    playerPanes = this.props.data.players.map((player)=>{
      team = $.grep(this.props.data.teams, function(team){
        return team.id == player.team_id
      })
      return(
        <PlayerPane
          key={player.id}
          player={player}
          team={team[0]}
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
          />
      )
    })
    return(
      <div className="tab-content col-md-10">
        {playerPanes}
      </div>
    )
  }
}

class PlayerPane extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  selectTeam(){
    $('#myTab a[href="#tabTeams"]').tab('show')
    $(`#tabTeams a[href="#team_tab_${this.props.player.team_id}"]`).tab('show')
  }

  render(){
    return(
      <div className="tab-pane" id={"player_tab_"+this.props.player.id} key={this.props.key}>
        <row className="col-md-12">
        <h2
          className="col-md-1"
          onClick={this.selectTeam.bind(this)}>&larr; {this.props.team.name}
        </h2>
        <h1>{this.props.player.last_name}, {this.props.player.first_name}</h1>
        </row>
        <row>
          <div className="col-md-6">
            <h4>Biographic</h4>
            <ul>
              <li>First Name: {this.props.player.first_name}</li>
              <li>Last Name: {this.props.player.last_name}</li>
              <li>Position: {this.props.player.position}</li>
              <li>Age: {this.props.player.age}</li>
              <li>Hometown: {this.props.player.hometown}</li>
              <li>Team: {this.props.team.name}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Physical</h4>
            <ul>
              <li>Height: {this.props.player.height}</li>
              <li>Weight: {this.props.player.weight}</li>
              <li>Wingspan: {this.props.player.wingspan}</li>
              <li>Strength: {this.props.player.strength}</li>
              <li>Jumping: {this.props.player.jumping}</li>
              <li>Agility: {this.props.player.agility}</li>
              <li>Speed: {this.props.player.speed}</li>
              <li>Endurance: {this.props.player.endurance}</li>
            </ul>
          </div>
        </row>
        <div className="col-md-6">
          <h4>Offensive</h4>
          <ul>
            <li>Passing: {this.props.player.passing}</li>
            <li>Catch & Shoot: {this.props.player.catch_and_shoot}</li>
            <li>Isolation: {this.props.player.isolation}</li>
            <li>Off Ball Movement: {this.props.player.offensive_off_ball_movement}</li>
            <li>Perception: {this.props.player.perception}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Defensive:</h4>
          <ul>
            <li>Man to Man: {this.props.player.man_to_man}</li>
            <li>Zone: {this.props.player.zone}</li>
            <li>Help Defense: {this.props.player.help_defense}</li>
            <li>Off Ball Movement: {this.props.player.defensive_off_ball_movement}</li>
            <li>Anticipation: {this.props.player.anticipation}</li>
          </ul>
        </div>
      </div>
    )
  }
}
