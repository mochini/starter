import { DragLayer } from 'react-dnd'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'

class TableDragLayer extends React.Component {

  static propTypes = {
    item: PropTypes.object
  }

  render() {
    const { item } = this.props
    return (
      <div className="sortable-drag-layer" style={ this._getItemStyles(this.props) }>
        <Item { ...item } />
      </div>
    )
  }

  _getItemStyles(props) {
    const { initialOffset, currentOffset } = props
    if(!currentOffset) return { display: 'none' }
    return {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 100,
      width: '100%',
      left: 0,
      top: `${currentOffset.y - initialOffset.y}px`
    }
  }

}

const collect = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
})

export default DragLayer(collect)(TableDragLayer)
