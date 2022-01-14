import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";


const Contact  = ({contact}) => {


	/* gets contact links */
	let contacts = contact?.map((contactItem, index) =>{
		if(contactItem.fields.Text){
		return (
			<>	
				{ index !== 0 &&
					<span> / </span>
				}
				<a key={index} className="nav" href={contactItem.fields.Url}>{contactItem.fields.Text}</a>
			</>
				)
			
		}
	})

	
	

    return (
    	<div className="contact-wrapper">
    		{contacts}
        </div>
    );
}

export default Contact
