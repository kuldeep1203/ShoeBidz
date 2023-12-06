import React, { useEffect, useState } from 'react'
import './Profile.css'
import { db } from './firebase'
import "firebase/compat/database";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

function Profile(){
    const [fname,setFname] =useState('')
    const [lname,setLname] =useState('')
    const [id,setId] =useState('')
    const [show,setShow] =useState(false)
    const [val,setVal] =useState([])
    const value = collection(db,"demo")

    useEffect(()=>{
        const getData= async()=>{
          const dbVal = await getDocs(value)
          setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
        }
        getData()
    })

    const handleCreate =async()=>{
        await addDoc(value,{name1:fname,name2:lname})
        setFname("")
        setLname("")
    }

    const handleDelete =async(id)=>{
       const deleteVal =  doc(db,"demo",id)
       await deleteDoc(deleteVal)
    }

    const handleEdit =async(id,name1,name2)=>{
        setFname(name1)
        setLname(name2)
        setId(id)
        setShow(true)
    }

    const handleUpdate =async()=>{
        const updateData = doc(db,"demo",id)
        await updateDoc(updateData,{name1:fname,name2:lname})
        setShow(false)
        setFname("")
        setLname("")
    }

    return(
        <div className='container'>
           <input value={fname} onChange={(e) => setFname(e.target.value)} />
           <input value={lname} onChange={(e) => setLname(e.target.value)} />
           {!show?<button className='create_button' onClick={handleCreate}>Create</button>:
           <button className='update_button' onClick={handleUpdate}>Update</button>}
           {
            val.map(values=>
            <div>
                <h1>{values.name1}</h1>
                <h1>{values.name2}</h1>
                <button className='delete_button' onClick={()=>handleDelete(values.id)}>Delete</button>
                <button className='Edit_button' onClick={()=>handleEdit(values.id,values.name1,values.name2)}>Edit</button>
            </div>)
           }
        </div>
    )
}
export default Profile;