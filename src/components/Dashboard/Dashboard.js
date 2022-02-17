import React, {useState, useEffect} from 'react';

import Header from '../../partials/header/Header';
import {get_request} from "../../service/api_requests";
import { useHistory } from "react-router-dom";
import UserAvatar from "../../assets/img/user-avatar-32.png";
import GamerStudCard from "../../partials/dashboard/GamerStudCard";
import DashboardCardPlayer from "../../partials/dashboard/DashboardCardPlayer";
import DashboardCardEventList from "../../partials/dashboard/DashboardCardEventList";
import DashboardCardGlobal from "../../partials/dashboard/DashboardCardGlobal";
import DashboardCardStore from "../../partials/dashboard/DashboardCardStore";

function Dashboard(props){

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('authToken');
    useEffect(() => {
        if(token != null && user == null) {
            get_request(
                'http://127.0.0.1:8080/getuser',
                true
            ).then(response => {
                if(response.status === 200){
                    console.log("user", response.body.role.roleId)
                    let user =  {
                        id: response.body.gamerId,
                        nickname: response.body.nickname,
                        points: response.body.points,
                        lastLogin: response.body.lastLogin,
                        lastLogout: response.body.lastLogout,
                        spendTime: response.body.spendTime,
                        roleId: response.body.role.roleId,
                        roleName: response.body.role.roleName,
                        email: response.body.gamerEmail,
                        avatar: null
                    };

                    fetch(
                        "https://playerdb.co/api/player/minecraft/" + user.nickname,
                        {method: 'GET'}
                    ).then(
                        (avatarResponse) => {
                            return avatarResponse.json()
                        }).then((avatarJsonResponse)=>{
                        user.avatar = avatarJsonResponse.error === true ? UserAvatar : avatarJsonResponse.data.player.avatar;
                        setUser(user);
                    }).catch((error)=>{
                        setUser(user);
                    })
                    console.log("GetUserStatus",user)

                }
            })
        } else {
            // history.push('/login');
        }
    }, []);


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user}/>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

                {props.location.pathname  === "/panel/"?
                    <DashboardCardGlobal
                        user={user}
                    /> :
                    ""
                }
                {props.location.pathname  === "/panel/stajnia"?
                    <GamerStudCard
                        user={user}
                    /> :
                    ""
                }
                {props.location.pathname  === "/panel/profil"?
                    <DashboardCardPlayer
                        user={user}
                    /> :
                    ""
                }
                {props.location.pathname  === "/panel/zawody"?
                    <DashboardCardEventList
                        user={user}
                    /> :
                    ""
                }
                {props.location.pathname  === "/panel/sklep"?
                    <DashboardCardStore
                        user={user}
                    /> :
                    ""
                }

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
