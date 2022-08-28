import Cookie from 'js-cookie';

const setCookie = (cookiename, usrin) =>{
   Cookie.set(cookiename, usrin, {
    expires: 1/3,
    secure: true,
    sameSite: 'strict',
    path: '/'
   }) 
};

export default setCookie