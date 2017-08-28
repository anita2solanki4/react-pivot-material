
var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')
var ReactPivot = require('..')
var gh = require('./gh.jsx')
var data = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date', className: 'react-pivot-date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  if (row.type === 'impression') memo.impressions = ++memo.impressions || 1
  if (row.type === 'display') memo.displays = ++memo.displays || 1
  if (row.type === 'load') memo.loads = ++memo.loads || 1
  return memo
}
var calculations = [
  {
    title: 'Impression',
    value: 'impressions',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Load Rate',
    value: function (row) {
      return ((row.loads / row.impressions) * 100)
    },
    template: function (val) {
      return val.toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: function (row) {
      return ((row.displays / row.loads) * 100)
    },
    template: function (val) {
      return val.toFixed(1) + '%'
    },
    className: 'react-pivot-display-date'
  }
]
var Demo = createReactClass({
  getInitialState: function() {
    return {showInput: false}
  },
  render: function() {
    return (
      <div className='demo'>
        <h1>ReactPivot</h1>
        <div className={this.state.showInput ? 'hide' : ''}>
          <ReactPivot rows={data}
                      dimensions={dimensions}
                      calculations={calculations}
                      reduce={reduce}
                      activeDimensions={['Date','Host']}
                      nPaginateRows={20} />
        </div>
      </div>
    )
  }
})
var el = document.createElement('div')
document.body.appendChild(el)
ReactDOM.render(
  <Demo />,
  el
)