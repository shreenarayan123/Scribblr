export const SecureMail =(email:string) =>{
    const [username, domain] = email.split("@");
    const secretName = username.substring(0,2) + "*".repeat(username.length -2);

    return `${secretName}@${domain}`
}