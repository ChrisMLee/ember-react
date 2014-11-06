import ReactHelper from './helper';
import ReactComponent from './component';

export default {
  name: "ember-react",
  
  initialize: function(container, application) {
    Ember.Handlebars.helper('react', ReactHelper);
    //container.register('helper:react', ReactHelper);
    //container.register('component:react', ReactComponent);
    
    //TODO: better way to add this?   
    container.resolver.__resolver__.get('moduleNameLookupPatterns').push(function(parsedName) {
      if(parsedName.type === 'react') {
        return application.modulePrefix + '/react/' + parsedName.fullNameWithoutType;
      }
    });
  }
};
