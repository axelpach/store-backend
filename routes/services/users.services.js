class UsersServices{
  constructor(){
    this.users = [];
  }

  find(limit, offset){

    if(limit && offset){
      return {limit, offset};

    } else {
      return "No hay parámetros";
      // res.send('No hay parámetros');
    }
  }
}

module.exports = UsersServices;
