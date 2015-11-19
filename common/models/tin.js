var utils = require('../../server/util');
var app = require('../../server/server'); 
var pubnub = require("pubnub").init({
            publish_key : "pub-c-08510f32-29e1-4fed-81ac-6a1bb40746f2",
            subscribe_key : "sub-c-7ee3bb6c-8ee1-11e5-8f62-0619f8945a4f"
     });
var Account = utils.getModel('Account');


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
/*    pubnub.subscribe({
      channel: accountId,
      message: function(m){console.log(m)}
    });*/
    pubnub.publish({
        channel: accountId,
        message: {"INVITE":"Has sido invitado al bote " + this.name},
        callback : function(m){console.log(m)}
    });
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
    pubnub.publish({
        channel: this.id,
        message: {"JOIN":"El usuario " + accountId + " se ha unido al bote "  + this.name},
        callback : function(m){console.log(m)}
    });

    this.balance = this.balance || 0;
    this.invitados.splice(index,1);
    this.balance = this.balance + this.amount.value;
    var self = this;
    Account.findById(accountId,function(err,account){
      console.log('account', account);
      return self.members.add(account,function(err){
        if (err){
          console.log('pete creacion de miembro',err);
          return callback(err);
        } else {
          console.log('ok creacion de miembro');
          return self.save(callback);        
        }
      });
    });
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
    pubnub.publish({
        channel: this.id,
        message: {"JOIN":"El usuario " + accountId + " ha dejado el bote "  + this.name},
        callback : function(m){console.log(m)}
    });

    var self = this;
    Account.findById(accountId,function(err,account){
      return self.members.remove(account,function(err){
        if (err){
          console.log('pete eliminacion de miembro',err);
          return callback(err);
        } else {
          console.log('ok eliminación de miembro');
          return self.save(callback);        
        }
      });
    });

  };



  Tin.remoteMethod('disolve',{
    isStatic:false,
    description:'Disolves the Tin.',
    http:{verb:'post'}
  });
  Tin.prototype.disolve=function(callback){
    //console.log("disolve",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    var bote = this;
    this.members('', function(err, miembros){
      var saldoARetornar = bote.balance / miembros.length;
      for (var i = miembros.length - 1; i >= 0; i--) {
        var miembro = miembros[i];
        bote.members.remove(miembros[i], function(err){
          if(err){
            console.log('pete en disolver bote', err);
            return callback(err);
          }
          else{
            app.models.Movement.create(
              {
                "amount": {
                  "value": saldoARetornar,
                  "currency": "EUR",
                },
                "description": "El usuario " + miembro.id + " ha recibido una devolución por la disolución del bote " + bote.id,
                "tinId": bote.id
              }
            ).then(function(movement){});
          }
        });
      };
      console.log('Se ha eliminado el bote ', bote.id);
      pubnub.publish({
          channel: bote.id,
          message: {"DISOLVE":"El bote " + bote.id + " ha sido disuelto"},
          callback : function(m){console.log(m)}
      });
      bote.balance = 0;
      bote.disolved = true;
      return bote.save(callback);
    });
  };

};
