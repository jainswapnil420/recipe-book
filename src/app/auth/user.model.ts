export class User{
    constructor(
        public email: string,
        public userId: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ){}

    // tslint:disable-next-line:typedef
    get token(){
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}
