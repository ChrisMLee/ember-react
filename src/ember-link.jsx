
export default React.createClass({
  displayName: 'EmberLink',
  contextTypes: {
    container: React.PropTypes.object
  },
  propTypes: {
    to: React.PropTypes.string.isRequired,
    context: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    queryParams: React.PropTypes.object
  },
  getRouterArgs: function() {
    if(Ember.isEmpty(this.props.to))
      return [];

    var args, context;
    args = [this.props.to];
    context = this.props.context || this.props.params;
    if (context) {
      if (Array.isArray(context)) {
        args = args.concat(context);
      } else {
        args.push(context);
      }
    }
    if (this.props.queryParams) {
      args.push({
        queryParams: this.props.queryParams
      });
    }
    return args;
  },
  getHref: function() {
    var args = this.getRouterArgs();
    if(Ember.isEmpty(args))
      return null;

    var router;
    router = this.context.container.lookup('router:main');
    return router.generate.apply(router, args);
  },
  handleClick: function(e) {
    var router;
    if (!e.defaultPrevented && !(e.button === 1 || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      router = this.context.container.lookup('router:main');
      return router.transitionTo.apply(router, this.getRouterArgs());
    }
  },
  render: function() {
    return <a className={this.props.className} href={this.getHref()} onClick={this.handleClick}>{this.props.children}</a>
  }
});
