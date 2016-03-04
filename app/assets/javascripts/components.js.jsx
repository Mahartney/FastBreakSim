//= require_tree ./components

class HelloMessage extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments {this.props.name} </h1>
      </div>
    );
  }
};
