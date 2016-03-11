class League extends React.Component {
  render () {
    return (
      <div>
        <div>name: {this.props.name}</div>
      </div>
    );
  }
}

League.propTypes = {
  name: React.PropTypes.string
};
