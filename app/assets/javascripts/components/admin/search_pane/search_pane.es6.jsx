class SearchPane extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText: this.props.filterText,
    }
  }

  render(){
    return(
      <row className="col-md-12">
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.props.onUserInput.bind(this)}
        />
      </row>
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
      <div className="col-md-6">
        <form>
          <input id="searchBar"
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
