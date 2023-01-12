import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import SuperAdminSidebar from './SuperAdmin';

const SuperAdminLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <Navbar />
                <div className="d-flex">
                    <SuperAdminSidebar />
                    <div className='full-width-containerCus'>
                        <Component {...matchProps} />
                    </div>
                </div>
            </>
        )} />
    )
};

export default SuperAdminLayoutRoute; 