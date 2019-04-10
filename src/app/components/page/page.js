import ModalPanel from '../modal_panel'
import Collection from '../collection'
import PropTypes from 'prop-types'
import Message from '../message'
import Tabs from '../tabs'
import React from 'react'

class Page extends React.PureComponent {

  static contextTypes = {
    host: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object,
    presence: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    buttons: PropTypes.array,
    children: PropTypes.any,
    collection: PropTypes.object,
    component: PropTypes.any,
    color: PropTypes.string,
    data: PropTypes.object,
    leftItems: PropTypes.array,
    message: PropTypes.object,
    panel: PropTypes.object,
    page: PropTypes.object,
    rightItems: PropTypes.array,
    tabs: PropTypes.object,
    tasks: PropTypes.object,
    task: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    color: 'red'
  }

  state = {
    access: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleTasks = this._handleTasks.bind(this)
  _handleTask = this._handleTask.bind(this)
  _handleUpdateTitle = this._handleUpdateTitle.bind(this)

  render() {
    const { collection, message, tabs } = this.props
    const Component = this.props.component
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="page-body">
          { Component && <Component { ...this._getComponent() } /> }
          { collection && <Collection { ...this._getCollection() } /> }
          { message && <Message { ...message } /> }
          { tabs && <Tabs { ...tabs } /> }
          { this.props.children }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { title } = this.props
    this._handleUpdateTitle(title)
  }

  componentDidUpdate(prevProps) {
    const { active, title } = this.props
    if(active !== prevProps.active && active) {
      this._handleUpdateTitle(title)
    }
  }

  componentWillUnmount() {
    this._handleUpdateTitle(null)
  }

  _handleUpdateTitle(title) {
    this.context.host.setTitle(title)
  }

  _getCollection() {
    const { collection } = this.props
    return {
      ...collection
    }
  }

  _getComponent() {
    const { data, page } = this.props
    return {
      ...this.props,
      page,
      ...data
    }
  }

  _getModalPanel() {
    const { color, leftItems, rightItems, tasks, task, title } = this.props
    const panel = {
      color,
      title
    }
    if(leftItems) {
      panel.leftItems = leftItems
    } else {
      panel.leftItems = [{ icon: 'chevron-left', handler: this._handleBack }]
    }
    if(rightItems) {
      panel.rightItems = rightItems
    } else if(tasks && tasks.items && tasks.items.filter(task => task.show !== false).length > 0) {
      panel.rightItems = [{ icon: tasks.icon || 'ellipsis-v', handler: this._handleTasks }]
    } else if(task) {
      panel.rightItems = [{ icon: task.icon || 'plus', handler: this._handleTask }]
    }
    return panel
  }

  _handleBack() {
    this.context.router.history.goBack()
  }

  _handleTasks() {
    const { tasks } = this.props
    this.context.tasks.open(tasks.items)
  }

  _handleTask() {
    const { task } = this.props
    const { router, modal, tasks } = this.context
    if(task.route) {
      router.push(task.route)
    } else if(task.modal) {
      modal.open(task.modal)
    } else if(task.handler){
      task.handler()
    }
    tasks.close()
  }

}

export default Page
