import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";


const Contact  = ({contact, filters}) => {

	function openMobileContact(e){
		let el = e.target;
		let menu = el.closest("#mobile-contact-menu");
		if(menu.classList.contains("on")){
			menu.classList.remove("on")
		}else{
			menu.classList.add("on")
		}
	}
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

	let mobileContacts = contact?.map((contactItem, index) =>{
		if(contactItem.fields.Text){
		return (
			<li>	
		
				<a key={index} className="nav" href={contactItem.fields.Url}>{contactItem.fields.Text} →</a>
			</li>
				)
			
		}
	}) 
	

    return (
    	<>
    	<div id="mobile-contact-menu">
    		<div onClick={openMobileContact} className="trigger">
    		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="8.5" y1="17.0294" x2="8.5" y2="-2.86102e-05" stroke="#964B00"/>
				<line y1="8.5" x2="17.0294" y2="8.5" stroke="#964B00"/>
			</svg>
			</div>
			<ul className="inner">{mobileContacts}</ul>
    		
    	</div>
    	<div className="contact-wrapper">
    		{contacts}
    		{filters &&
    			<ul className="filters-wrapper">
    				{filters}
    			</ul>
    		}
        </div>
        </>
    );
}

export default Contact
