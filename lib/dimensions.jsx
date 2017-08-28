var _ = { compact: require('lodash/compact') }
var React = require('react')
var createReactClass = require('create-react-class')
var partial = require('./partial')
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const SelectField = require('material-ui/SelectField').default;
const MenuItem = require('material-ui/MenuItem').default;

var styles = {
  select:{
    marginRight: '20px',
    width: 'auto'
  }
}

module.exports = createReactClass({
  getDefaultProps: function () {
    return {
      dimensions: [],
      selectedDimensions: [],
      onChange: function () {}
    }
  },

  render: function () {
    var self = this
    var selectedDimensions = this.props.selectedDimensions
    var nSelected = selectedDimensions.length

    return (
      <div className="reactPivot-dimensions">
        {selectedDimensions.map(this.renderDimension)}
        <MuiThemeProvider>
          <SelectField
            value=''
            onChange={(event, index, values)=>{partial(self.toggleDimension(event, nSelected, values), nSelected)}}
            style={styles.select}
          >
            <MenuItem key='' value='' primaryText='Sub Dimension...'/>
            {self.props.dimensions.map(function(dimension) {
              return <MenuItem key={dimension.title} value={dimension.title} primaryText={dimension.title} />
            })}
          </SelectField>
        </MuiThemeProvider>
      </div>
    )
  },

  renderDimension: function(selectedDimension, i) {
    return (
      <MuiThemeProvider>
        <SelectField
          value={selectedDimension}
          key={selectedDimension}
          onChange={(event, index, values)=>{partial(this.toggleDimension(event, i, values), i)}}
          style={styles.select}
         >
          <MenuItem/>
          {this.props.dimensions.map(function(dimension) {
            return (
              <MenuItem key={dimension.title} value={dimension.title} primaryText={dimension.title} />
            )
          })}
        </SelectField>
      </MuiThemeProvider>
    )
  },

  toggleDimension: function (event, index, values) {
    var dimension = values
    var dimensions = this.props.selectedDimensions
    if(dimensions.indexOf(dimension) == -1) dimensions[index] = dimension
    var updatedDimensions = _.compact(dimensions)
    this.props.onChange(updatedDimensions)
  },
})
