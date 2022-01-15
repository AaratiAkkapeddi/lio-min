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
    let hpPlaylist = false
    for (var i = playlists.length - 1; i >= 0; i--) {
        if(playlists[i].fields.Slug?.trim() === id){
            currentPlaylist = playlists[i]
        }
        if(playlists[i].fields.feature_on_hp){
            hpPlaylist = playlists[i].fields["Embed Code"]
        }

    }


    return (
    	
        <div className="global-wrapper">
            <main>
                <Header/>
                <Contact filters={false} contact={contact}/>
                
                {currentPlaylist ?
                        <>
                        <div className="projects-wrapper spotify-wrapper">
                            <h1 className="work-heading">{currentPlaylist.fields.Title}</h1>

                            <div dangerouslySetInnerHTML={{__html: currentPlaylist.fields["Embed Code"]}} />
                        </div>
                        </>
                        :
                        <>
                            <span>Loading...</span>
                        </>
                }
           
                
            </main>
            <Side collaborations={collaborations} news={news} playlist={false}/>
        </div>
    );
}

export default Playlist;