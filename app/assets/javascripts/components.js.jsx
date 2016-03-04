//= require_tree ./components

var HelloMessage = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments {this.props.name} </h1>
      </div>
    );
  }
});
