

let baseUrl :string= ''

switch(process.env.NODE_ENV){
    case 'development':
        baseUrl = 'localhost:'
}

export {baseUrl}