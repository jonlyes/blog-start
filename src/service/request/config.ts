

let baseURL :string= ''

switch(process.env.NODE_ENV){
    case 'development':
        baseURL = 'localhost:8030'
        break;
    case '':

}

export {baseURL}