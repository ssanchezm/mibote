var utils = require('../../server/util');
var app = require('../../server/server'); 

module.exports = function(Tin) {

  Tin.disableRemoteMethod('create',true);
  Tin.disableRemoteMethod('upsert',true);
  Tin.disableRemoteMethod('find',true);
  Tin.disableRemoteMethod('findOne',true);
  Tin.disableRemoteMethod('count',true);
  Tin.disableRemoteMethod("updateAll", true);
  Tin.disableRemoteMethod("updateAttributes", false);
  Tin.disableRemoteMethod("exists", true);
  Tin.disableRemoteMethod("deleteById", true);
  Tin.disableRemoteMethod('__create__members', false);
  Tin.disableRemoteMethod('__delete__members', false);
  Tin.disableRemoteMethod('__destroyById__members', false);
  Tin.disableRemoteMethod('__findById__members', false);
  Tin.disableRemoteMethod('__updateById__members', false);
  Tin.disableRemoteMethod('__count__members', false);
  Tin.disableRemoteMethod('__exists__members', false);
  Tin.disableRemoteMethod('__link__members', false);
  Tin.disableRemoteMethod('__unlink__members', false);
  Tin.disableRemoteMethod('__delete__movements', false);
  Tin.disableRemoteMethod('__destroyById__movements', false);
  Tin.disableRemoteMethod('__updateById__movements', false);
  Tin.disableRemoteMethod('__exists__movements', false);
  Tin.disableRemoteMethod('__link__movements', false);
  Tin.disableRemoteMethod('__unlink__movements', false);
  Tin.disableRemoteMethod('createChangeStream', true);



  Tin.remoteMethod('invite',{
    isStatic:false,
    description:'Invites another user to the Tin.',
    accepts:[
      {arg: 'accountId', type: 'string', description: 'The account id of the  user to invite to the Tin.',http: {source: 'query' }}
    ],
    http:{verb:'post'}
  });
  Tin.prototype.invite=function(accountId, callback){
    //console.log("invite",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    this.invitados = this.invitados || [];
    if(this.invitados.indexOf(accountId) != -1){
      return callback('El usuario ya ha sido invitado anteriormente');
    }
    this.invitados.push(accountId);
    this.save(callback);
  };



  Tin.remoteMethod('join',{
    isStatic:false,
    description: 'Joins the Tin.',
    accepts:[
      {arg: 'accountId', type: 'string', description: 'The account id of the  user to join the Tin.',http: {source: 'query' }}
    ],
    http: {verb: 'post'}
  });
  Tin.prototype.join=function(accountId, callback){
    //console.log("join",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    app.models.Movement.create(
      {
        "amount": {
          "value": 20,
          "currency": "EUR",
        },
        "description": "El usuraio " + accountId + " se ha unido al bote " + this.id + " con una aportacion de " + this.amount.value + "EUR.",
        "tinId": this.id
      }
    ).then(function(movement){
    }
    );
    var index = this.invitados.indexOf(accountId);
    if( index == -1){
      return callback('El usuario no ha sido invitado a este bote');
    }
    this.participantes = this.participantes || [];
    this.balance = this.balance || 0;
    this.participantes.push(accountId);
    this.invitados.splice(index,1);
    this.balance = this.balance + this.amount.value;
    this.save(callback);
  };



  Tin.remoteMethod('leave',{
    isStatic:false,
    description:'Leaves the Tin.',
    accepts:[
      {arg: 'accountId', type: 'string', description: 'The account id of the  user to leave the Tin.',http: {source: 'query' }}
    ],
    http:{verb:'post'}
  });
  Tin.prototype.leave=function(accountId, callback){
    //console.log("leave",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    app.models.Movement.create(
      {
        "description": "El usuraio " + accountId + " ha dejado el bote " + this.id,
        "tinId": this.id
      }
    ).then(function(movement){
    }
    );
    this.participantes = this.participantes || [];
    var index = this.participantes.indexOf(accountId);
    this.participantes.splice(index,1);
    this.save(callback);
  };



  Tin.remoteMethod('disolve',{
    isStatic:false,
    description:'Disolves the Tin.',
    http:{verb:'post'}
  });
  Tin.prototype.disolve=function(callback){
    console.log("disolve",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    return callback();
  };

};
