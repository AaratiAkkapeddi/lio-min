import React, { Component, useState, useEffect } from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Nav} from "../"
import {useLocation, useNavigate, useParams, RouteComponentProps} from "react-router";
import ReactMarkdown from 'react-markdown'
import Header from "../Header"
import Contact from "../Contact"
import Side from "../Side"

const Playlist = ({work, contact, news, collaborations, playlists}) => {
	const { id } = useParams()
    let currentPlaylist;
    let iframeSrc = ''
    for (var i = playlists.length - 1; i >= 0; i--) {
        if(playlists[i].fields.Slug?.trim() === id){
            currentPlaylist = playlists[i]
        }
    }


    return (
    	
        <div className="global-wrapper">
            <main>
                <Header/>
                <Contact contact={contact}/>
                
                {currentPlaylist ?
                        <>
                        <h1 className="work-heading">{currentPlaylist.fields.Title}</h1>
                        <div className="projects-wrapper spotify-wrapper">
                     
                            <div dangerouslySetInnerHTML={{__html: currentPlaylist.fields["Embed Code"]}} />
                        </div>
                        </>
                        :
                        <>
                            <span>Loading...</span>
                        </>
                }
           
                
            </main>
            <Side collaborations={collaborations} news={news} playlist={true}/>
        </div>
    );
}

export default Playlist;