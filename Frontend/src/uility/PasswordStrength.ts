
export const PasswordStrength = (password:string) =>{
    const error :string[] = [];

    if(password.length < 8){
        error.push("Password must be at least 8 characters");
    }
    if(!/[A-Z]/.test(password)){
        error.push("Password must be at least 1 uppercase letter");
    }
    if(!/[a-z]/.test(password)){
        error.push("Password must be at least 1 lowercase letter");
    }
    if(!/[0-9]/.test(password)){
        error.push("Password must be at least 1 number");
    }
    if(!/[!@#$%^&*]/.test(password)){
        error.push("Password must be at least 1 special character");
    }
    
    return error

}