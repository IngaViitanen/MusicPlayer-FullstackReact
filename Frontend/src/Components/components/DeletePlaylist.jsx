import React, { useState } from 'react'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../Constants/apiContants'
import axios from 'axios'


function DeletePlaylist({id}) {

function removePlaylist() {

    axios({
        method: "DELETE",
        url: API_BASE_URL + "playlist",
        data: { playlistId: id },
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN_NAME),
        },
      }).then((response) => {
        console.log(response,'playlist response');
      });
}

    return (
        <button className="btn btn-sm btn-danger" onClick={removePlaylist} >
        <i className="fa fa-trash"></i>
        </button>
    )
}

export default DeletePlaylist