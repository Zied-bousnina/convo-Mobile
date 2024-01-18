/* eslint-disable prettier/prettier */
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'http://192.168.1.16:3600' : 'http://192.168.1.16:3600';

export const socket = io(URL,
    {
        transports: ['websocket'],
        // autoConnect: false,
    }
    );