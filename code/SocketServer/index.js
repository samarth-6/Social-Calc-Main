const { Server } = require('socket.io');
const io = new Server(8000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const rooms = new Map();
const id_to_tables = {};


io.on('connection', (socket) => {
  console.log('Socket Connected:', socket.id);


  socket.on('join', ({ table, roomId }) => {
    
    if (!rooms.has(roomId)) {
      id_to_tables[roomId]= table;
      console.log('working'); 
      
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id); 
    console.log(id_to_tables[roomId]);
    socket.emit('joinned', id_to_tables[roomId]); 
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

 
  socket.on('commit', (data) => {
    const { table, Id } = data;
    console.log('Server received commit event with data:', data);
    console.log(id_to_tables);
    
    if (rooms.has(Id)) {
      
      id_to_tables[Id] = table;

     
      const sockets = rooms.get(Id);
      sockets.forEach((socketId) => {
        if (socketId !== socket.id) {
          io.to(socketId).emit('commited', table);
        }
      });
    } else {
      console.log(`Room ${Id} does not exist`);
    }
  });

 
  socket.on('disconnect', () => {
    console.log('Socket Disconnected:', socket.id);

    
    rooms.forEach((sockets, roomId) => {
      sockets.delete(socket.id);

      if (sockets.size === 0) {
        
        console.log(`Room ${roomId} deleted as it is empty`);
      }
    });
  });
});
