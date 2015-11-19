var utils = require('../../server/util');

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
  Tin.prototype.invite=function(){
    console.log("invite",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    return callback();
  };

  Tin.remoteMethod('join',{
    isStatic:false,
    description: 'Joins the Tin.',
    http: {verb: 'post'}
  });
  Tin.prototype.join=function(){
    console.log("join",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    return callback();
  };

  Tin.remoteMethod('leave',{
    isStatic:false,
    description:'Leaves the Tin.',
    http:{verb:'post'}
  });
  Tin.prototype.leave=function(){
    console.log("leave",this,arguments);
    callback = callback || utils.createCallback();
    // TODO implement me
    return callback();
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
