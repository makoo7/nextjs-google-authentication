import { DBconnect } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async(req, {params}) => {
    try {
        await DBconnect()
        const prompt = await Prompt.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Unable to Fetch prompt', { status : 500 })
    }
}