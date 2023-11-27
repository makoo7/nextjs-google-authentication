import { DBconnect } from "@utils/database"
import Prompt from "@models/prompt"

// GET PROMPT
export const GET = async(req, {params}) => {
    try {
        await DBconnect()
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Unable to Fetch prompt', { status : 500 })
    }
}

// UPDATE PROMPT
export const PUT = async(req, {params}) => {
    const {prompt, tag} = await req.json()

    try {
        await DBconnect()
        
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response('Unable to Update prompt', { status : 500 })
    }
}

// DELETE PROMPT
export const DELETE = async(req, {params}) => {
    try{
        await DBconnect()

        await Prompt.findByIdAndRemove(params.id)

        return new Response('Prompt Deleted Successfully', {status: 200})
    }catch(error){
        return new Response('Failed to Delete prompt', { status : 500 })
    }
}