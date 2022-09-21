const fs = require('fs')

export function verifyUser(currentUser: string, user: string): any {
    if (currentUser !== user) return { code: 401, message: 'You are not authorized.' } as any;
    return true;
}