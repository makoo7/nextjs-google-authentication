'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import  Profile from '@components/Profile'

const profile = () => {
    const router = useRouter()
    const { data:session } = useSession()
    const [posts, setPosts] = useState([])
    
    const fetchProfile = async() => {
        const profile = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await profile.json()
        setPosts(data)
    }

    useEffect(() => {
        if(session?.user.id) fetchProfile()
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post) => {
        const hasConfirmed = confirm('Are you sure want to delete this prompt?');
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });
                const filteredPrompts = posts.filter((p) => {
                    return p._id !== post._id;
                })
                setPosts(filteredPrompts);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Profile
            name="My"
            desc="welcome to profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default profile