import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

const NotFound = ({ ShowButton, Content }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    setTimeout(() => {
        setLoading(true)
    }, 1500);
    return (loading &&
        <div>
            <section class="page_404">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 d-flex  justify-content-center">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                                <div class="four_zero_four_bg">
                                    <h1 class="text-center ">404</h1>
                                </div>

                                <div class="contant_box_404">
                                    <h3 class="h2">
                                        No Content Found Here
                                    </h3>
                                    <h5>{Content}</h5>
                                    {ShowButton &&
                                        <Button variant='contained' onClick={() => {
                                            history.goBack()
                                        }} className='mt-3 btn btn-primary'>Go to Home</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default NotFound