import "./Users.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function Users() {

    const [users,setUsers]=useState([]);

    useEffect(()=>{
        fetchUsers();
    },[]);

    const fetchUsers=async()=>{

        try{

            const token=localStorage.getItem("token");

            const res=await axios.get(
                "http://ucab-btvg.onrender.com/api/admin/users",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setUsers(res.data.users);

        }
        catch(err){
            console.log(err);
        }

    };

    const deleteUser=async(id)=>{

        if(!window.confirm("Delete User ?")) return;

        try{

            const token=localStorage.getItem("token");

            await axios.delete(
                `http://ucab-btvg.onrender.com/api/admin/users/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            fetchUsers();

        }
        catch(err){
            console.log(err);
        }

    };

    return(

        <>
        <Navbar/>

        <div className="users-page">

            <div className="users-container">

                <h1>Users</h1>

                <table>

                    <thead>

                        <tr>

                            <th>Sl/No</th>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Operation</th>

                        </tr>

                    </thead>

                    <tbody>

                    {
                        users.map((user,index)=>(

                            <tr key={user._id}>

                                <td>{index+1}</td>

                                <td>{user._id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <button
                                    className="view-btn"
                                    >
                                        View
                                    </button>

                                    <button
                                    className="delete-btn"
                                    onClick={()=>deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                    </tbody>

                </table>

            </div>

        </div>

        </>

    );

}

export default Users;