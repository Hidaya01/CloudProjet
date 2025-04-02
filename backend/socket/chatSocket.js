module.exports = (socket, io) => {
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};
