export default class UserDTO {
    constructor(user){
        this.name = user.name
        this.firstname = user.firstname
        this.lastname = user.lastname
        this.age = user.age
        this.email = user.email
    }
}