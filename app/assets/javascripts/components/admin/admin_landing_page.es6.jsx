class AdminLandingPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText: "",
      data: this.props.data,
      filteredData: this.props.data,
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText})
    filteredData = {}
    filteredData.leagues = $.grep(this.state.data.leagues, function(league){
      return league.name.indexOf(filterText) !== -1
    }.bind(this))
    filteredData.conferences = $.grep(this.state.data.conferences, function(conference){
      return conference.name.indexOf(filterText) !== -1
    }.bind(this))
    filteredData.teams = $.grep(this.state.data.teams, function(team){
      return team.name.indexOf(filterText) !== -1
    }.bind(this))
    filteredData.players = $.grep(this.state.data.players, function(player){
      return player.name.indexOf(filterText) !== -1
    }.bind(this))
    this.setState({filteredData: filteredData})
  }

  handleLeagueSelect(league){
    //NOT IMPLEMENTED
    $("#searchBar").val("").change("")
    filteredData.conferences = $.grep(this.props.data.conferences, function(conference){
      return conference.league_id = league.id
    })
    this.setState({filteredData: filteredData})
  }

  submitPost(url, data) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function ( response ) {
        console.dir(response)
        data=this.state.data;
        data[response.type].push(response.data)
        this.setState({data: data});
        this.handleUserInput(this.state.filterText || "")
      }.bind(this),
      error: function( response ){
        console.log("Submit Post Error")
        console.dir(response)
      }
    })
  }

  submitDelete(url, data) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'DELETE',
      data: data,
      success: function ( response ) {
        console.log("Successful Delete")
        console.dir(response)
        this.setState({data: response.data});
        this.handleUserInput(this.state.filterText || "")
      }.bind(this),
      error: function(response){
        console.log("Submit Delete Response Error")
        console.dir(response)
      }
    })
  }

  render(){
    return(
      <div className="container">
        <SearchPane
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
          submitPost={this.submitPost.bind(this)}
        />
        <ViewPane
          filteredData={this.state.filteredData}
          data={this.state.data}
          submitPost={this.submitPost.bind(this)}
          submitDelete={this.submitDelete.bind(this)}
          handleLeagueSelect={this.handleLeagueSelect.bind(this)}
        />
      </div>
    )
  }
}
