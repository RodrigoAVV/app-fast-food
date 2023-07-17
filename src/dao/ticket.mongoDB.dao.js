import { ticketModel } from './models/ticket.js'
export default class Ticket{
    constructor(){
        console.log('ticket DB')
    }
    
    getAll = async () => {
        const tickets = await ticketModel.find().lean()
        return tickets
    }
    
    createTicket = async (ticket) => {
        const res = await ticketModel.create(ticket)
        return res
    }
}