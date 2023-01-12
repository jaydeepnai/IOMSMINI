import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import TeacherSidebar from './TeacherSidebar';

const TeacherLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <Navbar />
                <div className="d-flex">
                    <TeacherSidebar />
                    <div className='full-width-containerCus'>
                        <Component {...matchProps} />
                    </div>
                </div>
            </>
        )} />
    )
};

export default TeacherLayout; 