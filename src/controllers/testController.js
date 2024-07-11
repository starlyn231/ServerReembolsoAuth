const getClientTest=(req, res)=>{
     const  clients = [
        { id: 1, name: 'Cliente 0' },
        { id: 2, name: 'Cliente 1' },
        { id: 3, name: 'Cliente 2' },
      ];
      res.json(clients);
}

module.exports={
    getClientTest
}
