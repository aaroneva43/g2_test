import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { Route, IndexRoute, Redirect, Switch } from 'react-router'
import { Link } from 'react-router-dom';
import _ from 'lodash'

import Simple_G2_Demo from '../containers/Simple_G2_Demo'


const menus = [{
    name: 'Simple_G2_Demo'
}, {
    name: 'Simple_G2_Demo1'
}];

const Menu = ({ pathname }) => {
    return <div style={{ fontSize: 12 }}>
        <h1>G2 TESTS</h1>
        {

            _.map(menus, itm => <Link
                key={itm.name}
                style={{ color: '#555', textDecoration: 'none', marginLeft: 20, fontWeight: pathname == itm.name ? 'bold' : 'normal' }}
                to={`/${itm.name}`}>
                {itm.name}
            </Link>)
        }</div>
}



export default (
    <Switch>
        <Redirect from="/" exact to={`/${menus[0].name}`} />

        <Route path="/" render={({ location, history }) => {
            return createElement(
                ({ location: { pathname }, history }) => {

                    return <div style={{
                        background: '#eee',
                        padding: 12
                    }}>
                        <Menu pathname={pathname.substring(1)} />
                        <Route path="/Simple_G2_Demo" render={({ location, history }) => { return <Simple_G2_Demo /> }} />
                    </div>
                },
                { location, history }
            );
        }} />
    </Switch>
)
