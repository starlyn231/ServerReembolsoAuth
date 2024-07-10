const getClientTest=(req, res)=>{
     const  clients = [
        { id: 1, name: 'Cliente 1' },
        { id: 2, name: 'Cliente 2' },
        { id: 3, name: 'Cliente 3' },
      ];
      res.json(clients);
}

module.exports={
    getClientTest
}
