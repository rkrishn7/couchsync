import io from 'socket.io-client';
import settings from '@root/lib/settings';
import { SocketEvents } from '@root/lib/constants/socket';

const socket = io(settings.apiUrl);

socket.on(SocketEvents.CONNECT, () => console.log('connected'));

export default socket;
