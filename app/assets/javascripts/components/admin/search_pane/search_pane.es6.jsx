class SearchPane extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText: this.props.filterText,
    }
  }

  render(){
    return(
      <row className="col-md-6">
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

  clearSearch(){
    this.refs.filterTextInput.value=""
    this.props.onUserInput("")
  }

  render(){
    return(
        <form>
          <div className="form-group row">
            <div className="col-sm-8">
              <input
                id="searchBar"
                type="text"
                placeholder="Search Database..."
                ref="filterTextInput"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <label
              htmlFor="searchBar"
              className="text-muted col-sm-4"
              onClick={this.clearSearch.bind(this)}>
              Clear Search
            </label>
          </div>
        </form>

    )
  }
}
