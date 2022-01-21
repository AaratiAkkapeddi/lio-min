import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";
import ReactMarkdown from "react-markdown"
import ocean from '../../images/ocean.gif';
import emo from '../../images/emo.gif';

const Side  = ({collaborations, news, playlist}) => {
  console.log(collaborations,news)
	/* gets collaborations links */
	let collaborationitems = collaborations?.map((collaborationItem, index) =>{
		if(collaborationItem.fields.Text && !collaborationItem.fields.isNote){
			return (
		
				<li key={index}><a href={collaborationItem.fields.Link}><ReactMarkdown>{collaborationItem.fields.Text}</ReactMarkdown></a></li>
		
				)
		}
	})
	let note = collaborations?.map((collaborationItem, index) =>{
		if(collaborationItem.fields.Text && collaborationItem.fields.isNote){
			return (
		
				<div key={index}><ReactMarkdown>{collaborationItem.fields.Text}</ReactMarkdown></div>
		
				)
		}
	})
	function openAccordion(e){
		let el = e.target
		let parent = el.closest('.accordion');
		if(parent.classList.contains("open")){
			parent.classList.remove("open")
		}else{
			parent.classList.add("open")
		}
	}

	/* gets news items */
	let newsitems = news?.map((newsItem, index, playlist) =>{
		if(newsItem.fields.NewsText){
			return (
		
				<li key={index} className="news-item">
				
					<ReactMarkdown>{newsItem.fields.NewsText}</ReactMarkdown>
				</li>
		
				)
		}
	})
	let iframeHtml = '<iframe src="https://open.spotify.com/embed/playlist/4w0bYbL6aYVixe75yrkESZ?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen=" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>'

    return (
    	<div className="side-panel">
    		<div className="collaborations-wrapper accordion">
    			<div onClick={openAccordion} className="accordion-trigger">
    				<h1>COLLABORATIONS</h1>
    				<svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.999882 1L12.6912 12.25L24.3826 1" stroke="#964B00"/>
					</svg>
    			</div>
    			<div className="accordion-inner">
    				<ul>{collaborationitems}</ul>
    			</div>
    		</div>
    		<div className="recent-news-wrapper">
    			<h1>UPCOMING</h1>
    			<ul>{newsitems}</ul>
    		</div>
    		{playlist &&
    		<div className="beating-heart">
    		    <h1>#RADIOLIO</h1>
    		    <div dangerouslySetInnerHTML={{__html: playlist}} />
    		</div>
    		}
    		<div className="signature">
    			{note}
    			<div className="gif-wrapper">
    				<div className="img-wrapper"><img src={ocean}/></div>
					<div className="img-wrapper"><img src={emo}/></div>
				</div>
    		</div>
    		
        </div>
    );
}

export default Side;
