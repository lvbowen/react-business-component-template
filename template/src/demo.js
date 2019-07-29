import React, { Component } from 'react';
import { Row, Col, Button, request } from 'doraemon';
import classNames from 'classnames';

import './demo.less';


class BusinessRequires extends Component {
  static defaultProps = {
    prefixCls: 'business-requires',
    title: '商务要求',
    compConf: {
      readonly: false,
      optBtn: {
        // 展示“选择配置”按钮
        showConfigBtn: true,
        // 展示“新增”按钮
        showAddBtn: false,
      }
    },
  }

  state = {
    data: [{name:'test1',desc:'desc1'}]
  }

  componentDidMount() {
    // request('/api/infos').then(res => {
    //   console.log(res);
    // }).catch(e => {
    //   console.log(e)
    // })
  }

  handleAdd = () => {
    const { state, props } =this;
    const data = state.data;
    data.push({name: `test${data.length}`,desc:`desc${data.length}`});
    this.setState(state, ()=>{
      if (typeof(props.onChange) === 'function') {
        props.onChange(this.state.data);
      }
    })
  }

  render() {
    const { state, props } = this;
    const compConf = props.compConf;
    const classes = classNames(props.prefixCls, `${props.prefixCls}-wrapper`);
    return (
      <div className={classes}>
        <Row>
          <Col span={12}>
            <h3>{props.title}</h3>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            { compConf.optBtn.showConfigBtn ? <Button type="secondary">选择配置</Button> : null }
            { compConf.optBtn.showAddBtn ? <Button type="secondary" onClick={this.handleAdd}>新增</Button> : null }
          </Col>
        </Row>
      </div>
    );
  }
}

export default BusinessRequires;
