/**
 * Created by jiang on 2017/7/3.
 */
import io from 'socket.io-client';

export default function initSocket() {
    const socket = io('', { path: '/ws' });
    socket.on('news', (data) => {
        console.log(data);
        socket.emit('my other event', { my: 'data from client' });
    });
    socket.on('msg', (data) => {
        console.log(data);
    });

    return socket;
}
