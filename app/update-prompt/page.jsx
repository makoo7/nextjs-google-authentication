'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"

const updatePost = () => {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const searchParam = useSearchParams()
    const promptId = searchParam.get('id')

    const { data:session } = useSession()
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const fetchPost = async() => {
        try {
            let response = await fetch(`/api/prompt/${promptId}`);
            let data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        } catch (error) {
            setPost([]);
        }
    }

    useEffect(() => {
        if(promptId) fetchPost()
    }, [promptId])

    const updatePrompt = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div>
            <Form 
            type="Update" 
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
            />
        </div>
    )
}

export default updatePost