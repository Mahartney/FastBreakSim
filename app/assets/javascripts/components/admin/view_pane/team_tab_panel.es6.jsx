class TeamTabPanel extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    return(
      <div className="tab-pane" id="tabTeams">
        <TeamVertTabs
          filteredData={this.props.filteredData}
        />
        <TeamPanes
          data={this.props.data}
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
        />
      </div>
    )
  }
}

class TeamVertTabs extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    var teamVertTabs = this.props.filteredData.teams.map((team) => {
      return(
        <li key={team.id}>
          <a href={"#team_tab_"+team.id} data-toggle="tab">{team.name}</a>
        </li>
      )
    })
    return(
      <ul className="nav nav-tabs nav-stacked col-md-2">
        {teamVertTabs}
      </ul>
    )
  }
}

class TeamPanes extends React.Component{
  constructor(){
    super();
    this.state={}
  }

  render(){
    var teamPanes = this.props.data.teams.map((team)=>{
      conference = $.grep(this.props.data.conferences, function(conference){
        return conference.id == team.conference_id
      })
      return (
        <TeamPane
          data={this.props.data}
          team={team}
          conference={conference[0]}
          submitPost={this.props.submitPost}
          submitDelete={this.props.submitDelete}
          key={team.id}
        />
      )
    })
    return(
      <div className="tab-content col-md-10">
        {teamPanes}
      </div>
    )
  }
}

class TeamPane extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  selectConference(){
    $('#myTab a[href="#tabConferences"]').tab('show')
    $(`#tabConferences a[href='#conferene_tab_${this.props.team.conference_id}']`).tab('show')
  }

  render(){
    team = this.props.team
    players = $.grep(this.props.data.players, function(player){
      return player.team_id == team.id
    })
    return(
      <div className="tab-pane" id={"team_tab_"+this.props.team.id} key={this.props.key}>
        <div className="col-md-7">
          <h2
            className="col-md-1"
            onClick={this.selectConference.bind(this)}>&larr; {this.props.conference.name}</h2>
          <h1>{this.props.team.name}</h1>
          <PlayerList
            players={players}
            />
        </div>
        <div className="col-md-5">
          <CreatePlayerForm
            team={this.props.team}
            conference={this.props.conference}
            submitPost={this.props.submitPost}
            />
        </div>

      </div>
    )
  }
}

class CreatePlayerForm extends React.Component{
  constructor(){
    super()
    this.state={
    }
  }

  handleSubmit(e){
    e.preventDefault();
    first_name=this.refs.formFirstName.value.trim()
    last_name=this.refs.formLastName.value.trim()
    position=this.refs.formPosition.value.trim()
    this.refs.formFirstName.value=""
    this.refs.formLastName.value=""
    this.refs.formPosition.value="Random"
    this.props.submitPost(`/admin/leagues/${this.props.conference.league_id}/conferences/${this.props.conference.id}/teams/${this.props.team.id}/players`, {first_name: first_name,last_name: last_name, position: position})
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h4>Create Player:</h4>
        <div className="form-group">
          <label htmlFor="playerFirstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="playerFirstName"
            placeholder="First Name"
            ref="formFirstName"
            />
        </div>
        <div className="form-group">
          <label htmlFor="playerLastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="playerLastName"
            placeholder="Last Name"
            ref="formLastName"
            />
        </div>
        <div className="form-group">
          <label htmlFor="playerPosition">Position:</label>
          <select
            className="form-control"
            id="playerPosition"
            ref="formPosition"
            >
            <option>Random</option>
            <option>PG</option>
            <option>SG</option>
            <option>SF</option>
            <option>PF</option>
            <option>C</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Player</button>
      </form>
    )
  }
}

class PlayerList extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }

  render(){
    var players={}
    var possiblePositions = ["PG","SG","SF","PF","C"]
    for(i=0;i<possiblePositions.length;i++){
      players[possiblePositions[i]] = $.grep(this.props.players,function(player){
        return player.position == possiblePositions[i]
      })
    }
    return(
      <table className="table table-sm">
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Position</td>
            <td>Overall </td>
            <td>Navigate To</td>
          </tr>
        </thead>
        <tbody>
          <tr colSpan="5"><td><h5>Point Guards</h5></td></tr>
        </tbody>
        <PlayerListInserts
          players={players.PG}
          team={team}
        />
        <tbody>
          <tr colSpan="5"><td><h5>Shooting Guards</h5></td></tr>
        </tbody>
        <PlayerListInserts
          players={players.SG}
          team={team}
        />
        <tbody>
          <tr colSpan="5"><td><h5>Small Forwards</h5></td></tr>
        </tbody>
        <PlayerListInserts
          players={players.SF}
          team={team}
        />
        <tbody>
          <tr colSpan="5"><td><h5>Power Forwards</h5></td></tr>
        </tbody>
        <PlayerListInserts
          players={players.PF}
          team={team}
        />
        <tbody>
          <tr colSpan="5"><td><h5>Centers</h5></td></tr>
        </tbody>
        <PlayerListInserts
          players={players.C}
        />
      </table>
    )
  }
}

class PlayerListInserts extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    playerListInserts = this.props.players.map((player)=>{
      return(
        <PlayerInsert
          player={player}
          key={player.id}
        />
      )
    })
    return(
      <tbody>
        {playerListInserts}
      </tbody>
    )
  }
}

class PlayerInsert extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }

  selectTeam(){
    $("#myTab a[href='#tabPlayers']").tab('show')
    $(`#tabPlayers a[href='#player_tab_${this.props.player.id}']`).tab('show')
  }

  render(){
    return(
      <tr key={this.props.key}>
        <td>{this.props.player.first_name}</td>
        <td>{this.props.player.last_name}</td>
        <td>{this.props.player.position}</td>
        <td>99</td>
        <td onClick={this.selectTeam.bind(this)}>Go</td>
      </tr>
    )
  }
}
