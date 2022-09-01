export default class AppController {
    constructor(private request: any, private response: any) {}

    async index ():Promise<string> {
        return 'hello world';
    };
};
