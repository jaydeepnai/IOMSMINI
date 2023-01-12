import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import StudentSidebar from './StudentSidebar';

const StudentLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <Navbar />
                <div className="d-flex">
                    <StudentSidebar />
                    <div className='full-width-containerCus'>
                        <Component {...matchProps} />
                    </div>
                </div>
            </>
        )} />
    )
};

export default StudentLayout; 