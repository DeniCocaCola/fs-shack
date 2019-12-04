export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            //this.authService.isManager = false; //Ensures admin is no longer authorized
            return null;
        }
        return this._token;
    }
}